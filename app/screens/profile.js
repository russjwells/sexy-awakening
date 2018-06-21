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

export default class Profile extends Component {
    state = {
        ageRangeValues: this.props.user.ageRange,
        distanceValue: [this.props.user.distance],
        showMen: this.props.user.showMen,
        showWomen: this.props.user.showWomen,
    }

    updateUser = (key, value) => {
        const {uid} = this.props.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    render () {
        const {first_name, work, id} = this.props.user
        const {ageRangeValues, distanceValue, showMen, showWomen} = this.state
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
                                <Text style={styles.menuText}>
                                    Edit Profile
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.menuItem}>
                        <TouchableHighlight style={styles.menuButton} onPress={() => this.props.navigation.navigate('Settings', {user: this.props.user, ageRangeValues: this.state.ageRangeValues, distanceValue: this.state.distanceValue, showMen: this.state.showMen, showWomen:this.state.showWomen})}>
                            <View style={styles.menuTextWrap}>
                                <Text style={styles.menuText}>
                                    Settings
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.subscription}>
                    <TouchableHighlight style={styles.menuButton} onPress={() => this.props.navigation.navigate('Subscription', {user: this.props.user})}>
                        <Text style={styles.subscriptionText}>GET SEXY AWAKENING UNLIMITED</Text>
                    </TouchableHighlight>
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
        backgroundColor: 'black',
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
    menuIcon: {
        width: 20,
        height: 20,
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
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
    },
    menuButton: {
        flex: 1,
    },

})