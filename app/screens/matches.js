import React, {Component} from 'react'
import {
    FlatList,
    ListView,
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
} from 'react-native'

import Image from 'react-native-remote-svg'

import CircleImage from '../components/circleImage'

import _ from 'lodash'

import * as firebase from 'firebase'

import sexSymbol from '../../assets/img/sex.svg'
import romanceSymbol from '../../assets/img/romance.svg'
import friendshipSymbol from '../../assets/img/friendship.svg'
import passSymbol from '../../assets/img/pass.svg'

export default class Matches extends Component {

    state = {
        dataSource: demoProfiles,
        matches: [],
        matchType: 'sex',
        sex: [],
        romance: [],
        friendship: [],
        pass: [],
    }

    componentWillMount() {
        //this.setState({dataSource:demoProfiles}) old
        this.getMatches(this.props.user.uid) //temp off
        //console.log('uid-cwm', this.props.user.uid) old
    }

    getUser = (uid) => {
        return firebase.database().ref('users').child(uid).once('value')
            .then(snap => snap.val())
    }
    getData = (matchType) => {
        let matchData
        if (matchType == "sex") {
            matchData = this.state.sex
        }
        if (matchType == "romance") {
            matchData = this.state.romance
        }
        if (matchType == "friendship") {
            matchData = this.state.friendship
        }
        if (matchType == "pass") {
            matchData = this.state.pass
        }
        return matchData
    }
    getOverlap = (liked, likedBack) => {
        const likedTrue = _.pickBy(liked, value => value)
        const likedBackTrue = _.pickBy(likedBack, value => value)
        //console.log(likedTrue, likedBackTrue)
        return _.intersection(_.keys(likedTrue), _.keys(likedBackTrue))
    }

    getMatches = (uid) => {
        firebase.database().ref('relationships').child(uid).on('value', snap => {
            const relations = snap.val()
            //const allMatches = this.getOverlap(relations.liked, relations.likedBack)
            const allSex = this.getOverlap(relations.sex, relations.sexBack)
            const allRomance = this.getOverlap(relations.romance, relations.romanceBack)
            const allFriendship = this.getOverlap(relations.friendship, relations.friendshipBack)

            //sex data
            const promisesSex = allSex.map(profileUid => {
                const foundProfile = _.find(this.state.matches, profile => profile.uid === profileUid)
                return foundProfile ? foundProfile : this.getUser(profileUid)
            })
            Promise.all(promisesSex).then(data => this.setState({
                sex: data,
            }))
            //romance data
            const promisesRomance = allRomance.map(profileUid => {
                const foundProfile = _.find(this.state.matches, profile => profile.uid === profileUid)
                return foundProfile ? foundProfile : this.getUser(profileUid)
            })
            Promise.all(promisesRomance).then(data => this.setState({
                romance: data,
            }))
            //friendship data
            const promisesFriendship = allFriendship.map(profileUid => {
                const foundProfile = _.find(this.state.matches, profile => profile.uid === profileUid)
                return foundProfile ? foundProfile : this.getUser(profileUid)
            })
            Promise.all(promisesFriendship).then(data => this.setState({
                friendship: data,
            }))

            const allMatches = allSex.concat(allRomance.concat(allFriendship))
            const promises = allMatches.map(profileUid => {
                const foundProfile = _.find(this.state.matches, profile => profile.uid === profileUid)
                return foundProfile ? foundProfile : this.getUser(profileUid)
            })
            Promise.all(promises).then(data => this.setState({
                dataSource: data,
                matches: data
            
            }))
        })
    }
    filterList = (type) => {
        this.setState({matchType: type})
    }
    renderItem = ({item}) => {
        const {id, first_name, work} = item
        //const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        const bio = item.bio ? item.bio : null
        const matchType = "unsure"

        return (
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Chat', {user: this.props.user, profile: item})}
            >
            <View style={{flexDirection:'row', backgroundColor:'white', padding:10}} >
                <CircleImage size={80} facebookID={id}/>
                <View style={{justifyContent:'center', marginLeft:10}}>
                    <Text style={{fontSize:18}}>{first_name}</Text>
                    <Text style={{fontSize:15, color:'darkgrey'}}>{bio}</Text>
                    <Text style={{fontSize:15, color:'darkgrey'}}>{matchType}</Text>
                </View>
            </View>
            </TouchableHighlight>
        )
    }

    renderSeparator = (sectionID, rowID) => {
        return(
            <View key={rowID} style={{height:1, backgroundColor:'whitesmoke', marginLeft:100}} />
        )
    }

    _keyExtractor = (item, index) => item.id;

    renderHeader = () => {
        return(
            <View style={styles.relationshipFilter}>
                <TouchableHighlight style={styles.filterButton} onPress={() => this.filterList('sex')}>
                    <View style={[styles.filterButton, styles.sexFilter]}>
                        <Image source={sexSymbol} style={{width:70, height:70}} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.filterButton} onPress={() => this.filterList('romance')}>
                    <View style={styles.filterButton}>
                        <Image source={romanceSymbol} style={{width:40, height:40}} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.filterButton} onPress={() => this.filterList('friendship')}>
                    <View style={styles.filterButton}>
                        <Image source={friendshipSymbol} style={{width:40, height:40}} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.filterButton} onPress={() => this.filterList('pass')}>
                    <View style={styles.filterButton}>
                        <Image source={passSymbol} style={{width:40, height:40}} />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
                <FlatList 
                    style={styles.list}
                    data={this.getData(this.state.matchType)}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={() => this.renderHeader()}
                />
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    relationtypefilter:{
        flex: 1,
        alignContent: 'space-between',
        flexDirection: 'row',
    },
    relationshipFilter:{
        flex:1,
        flexDirection:'row',
    },
    filterButton:{
        flex:1,
        height:60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    sexFilter:{
        flex:1,
    },
    selectedFilter:{
        backgroundColor: 'red',
    },
    menuOption: {
        flex: 1,
    },
    chats: {
        flex: 9,
    },
    list: {
        flex: 1,
        backgroundColor: 'white',
    },
})
const demoProfiles = [
    {
      id: '259389830744794',
      first_name: 'Candice',
      birthday: '10/18/1986',
      work: [{position:{name:'Supermodel'}}],
    },
    {
      id: '720115413',
      first_name: 'Alessandra',
      birthday: '1/10/1989',
      work: [{position:{name:'Dancer'}}],
    },
    {
      id: '912478262117011',
      first_name: 'Rosie',
      birthday: '9/4/1989',
      work: [{position:{name:'Artist'}}],
    },
    {
      id: '1476279359358140',
      first_name: 'Alissa',
      birthday: '2/11/1990',
      work: [{position:{name:'Comedian'}}],
    },
    {
      id: '173567062703796',
      first_name: 'Kendall',
      birthday: '8/17/1992',
      work: [{position:{name:'Truck Driver'}}],
    },
    {
      id: '169571172540',
      first_name: 'Miranda',
      birthday: '12/12/1983',
      work: [{position:{name:'Doctor'}}],
    },
    {
      id: '1492309647685574',
      first_name: 'Behati',
      birthday: '3/23/1991',
      work: [{position:{name:'Developer'}}],
    },
    {
      id: '662254353934918',
      first_name: 'Anna',
      birthday: '3/23/1989',
      work: [{position:{name:'Personal Trainer'}}],
    },
    {
      id: '424154277777372',
      first_name: 'Gabriella',
      birthday: '3/23/1988',
      work: [{position:{name:'Surfer'}}],
    },
    {
      id: '662720103796952',
      first_name: 'Mara',
      birthday: '3/23/1987',
      work: [{position:{name:'Lifeguard'}}],
    },
  ]