import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
    Dimensions,
} from 'react-native'
import * as firebase from 'firebase'

import CircleImage from '../components/circleImage'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Feather } from '@expo/vector-icons'

export default class DeepProfile extends Component {
    state={
        user: this.props.navigation.state.params.user,
        profile: this.props.navigation.state.params.profile,
    }

    updateUser = (key, value) => {
        const {uid} = this.props.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    render () {
        const {first_name, work, id} = this.state.profile
        const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        return(
            <View style={styles.container} >
                <View style={styles.profile}>
                    <CircleImage facebookID={id} size={120}/>
                    <Text style={{fontSize:20}}>{first_name}</Text>
                    <Text style={{fontSize:15, color: 'darkgray'}}>{bio}</Text>
                </View>
                <View style={styles.menu} >
                    <View style={styles.menuItem}>
                        <TouchableHighlight style={styles.menuButton} onPress={() => this.props.navigation.navigate('EditProfile', {user: this.props.user})}>
                            <View style={styles.menuTextWrap}>
                                <Feather name="edit" size={32} color="black" />
                                <Text style={styles.menuText}>
                                    Deep Profile
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.menuItem}>
                        <TouchableHighlight style={styles.menuButton} onPress={() => this.props.navigation.navigate('Settings', {user: this.props.user, ageRangeValues: this.state.ageRangeValues, distanceValue: this.state.distanceValue, showMen: this.state.showMen, showWomen:this.state.showWomen})}>
                            <View style={styles.menuTextWrap}>
                                <Feather name="crosshair" size={32} color="black" />
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

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    },
    profile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        flex: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    subscription: {
        flex: 1,
        backgroundColor: '#e54560',
        alignItems: 'center',
        flexDirection: 'row',
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
    unlimitedButton: {
        flex: 1,
    }

})