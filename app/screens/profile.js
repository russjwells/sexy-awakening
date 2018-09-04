import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
    Dimensions,
    Image,
} from 'react-native'
import * as firebase from 'firebase'

import CircleImage from '../components/circleImage'
//import ProfilePicture from '../components/profilePicture'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Feather } from '@expo/vector-icons'

import chemistrySymbol from '../../assets/img/chemistry.png'
import CircleAvatar from '../components/circleAvatar';

export default class Profile extends Component {
    state = {
        ageRangeValues: this.props.user.ageRange,
        distanceValue: [this.props.user.distance],
        showMen: this.props.user.showMen,
        showWomen: this.props.user.showWomen,
        bio: this.props.user.bio,
    }

    updateUser = (key, value) => {
        const {uid} = this.props.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    render () {
        const {first_name, work, id, uid, picture} = this.props.user
        const {ageRangeValues, distanceValue, showMen, showWomen} = this.state
        //const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        const bio = this.state.bio
        return(
            <View style={styles.container}>
                <View style={styles.profile}>
                    <TouchableHighlight style={styles.viewMyProfileLink} onPress={() => this.props.navigation.navigate('YourProfile', {user: this.props.user})}>
                    <View>
                        <CircleAvatar uid={uid} pic={picture} size={120} />
                    </View>    
                    </TouchableHighlight>
                    <Text style={{fontSize:20}}>{first_name}</Text>
                </View>
                <View style={styles.menu} >
                    <View style={styles.menuItem}>
                        <TouchableHighlight style={styles.menuButton} onPress={() => this.props.navigation.navigate('EditProfile', {user: this.props.user})}>
                            <View style={styles.menuTextWrap}>
                                <Feather name="edit" size={32} color="black" />
                                <Text style={styles.menuText}>
                                    Edit Profile
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.menuItem}>
                        <TouchableHighlight style={styles.menuButton} onPress={() => this.props.navigation.navigate('Settings', {user: this.props.user, ageRangeValues: this.state.ageRangeValues, distanceValue: this.state.distanceValue, showMen: this.state.showMen, showWomen:this.state.showWomen})}>
                            <View style={styles.menuTextWrap}>
                                <Image source={chemistrySymbol} style={{width:40, height:40}} />
                                <Text style={styles.menuText}>
                                    Settings
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}

const subscriptionlinkcontainer = <View></View>
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //justifyContent: 'flex-start',
    },
    profile: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    subscription: {
        flex: 2,
        backgroundColor: '#e54560',
        alignItems: 'center',
        flexDirection: 'row',
    },
    subscriptionButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subsexpander: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subscriptionText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    menuItem: {
        alignItems: 'center',
        width: width/2,
        height: 100,  
    },
    menuText: {
        color: 'black',
        marginLeft: 20,
        marginRight: 20,
    },
    menuTextWrap: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
    },
    menuButton: {
        flex: 1,
        backgroundColor: 'white',
    },
})