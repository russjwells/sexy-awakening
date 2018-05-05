import React, {Component} from 'react'
import {
    FlatList,
    ListView,
    Text,
    View,
    TouchableHighlight,
} from 'react-native'

import CircleImage from '../components/circleImage'

import _ from 'lodash'

import * as firebase from 'firebase'

export default class Matches extends Component {

    state = {
        dataSource: demoProfiles,
        matches: [],
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

    getOverlap = (liked, likedBack) => {
        const likedTrue = _.pickBy(liked, value => value)
        const likedBackTrue = _.pickBy(likedBack, value => value)
        //console.log(likedTrue, likedBackTrue)
        return _.intersection(_.keys(likedTrue), _.keys(likedBackTrue))
    }

    getMatches = (uid) => {
        firebase.database().ref('relationships').child(uid).on('value', snap => {
            const relations = snap.val()
            const allMatches = this.getOverlap(relations.liked, relations.likedBack)
            console.log('allMatches:', allMatches)
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

    renderItem = ({item}) => {
        const {id, first_name, work} = item
        const bio = (work && work[0] && work[0].position) ? work[0].position.name : null

        return (
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Chat', {user: this.props.user, profile: item})}
            >
            <View style={{flexDirection:'row', backgroundColor:'white', padding:10}} >
                <CircleImage size={80} facebookID={id}/>
                <View style={{justifyContent:'center', marginLeft:10}}>
                    <Text style={{fontSize:18}}>{first_name}</Text>
                    <Text style={{fontSize:15, color:'darkgrey'}}>{bio}</Text>
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

    render() {
        return (
            <FlatList 
                style={{flex:1, backgroundColor: 'white'}}
                data={this.state.dataSource}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={this._keyExtractor}
            />
        )
    }
}

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