import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Switch,
    TouchableHighlight,
} from 'react-native'

import * as firebase from 'firebase'

import CircleImage from '../components/circleImage'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Feather } from '@expo/vector-icons'

export default class Account extends Component {

    state = {
        user: this.props.navigation.state.params.user,
        ageRangeValues: this.props.navigation.state.params.ageRangeValues,
        distanceValue: this.props.navigation.state.params.distanceValue,
        showMen: this.props.navigation.state.params.showMen,
        showWomen: this.props.navigation.state.params.showWomen,
        showNonbinary: false,
        showTransexual: false,
        showGroups: false,
    }

    updateUser = (key, value) => {
        const {uid} = this.state.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }
    logout = () => {
        firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        const {first_name, work, id} = this.state.user
        const {ageRangeValues, distanceValue, showMen, showWomen, showNonbinary, showTransexual, showGroups} = this.state
        const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        return(
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text style={styles.navtext}>Account</Text>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <ScrollView style={styles.content}>
                    <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Account</Text>
                        </View>
                    <View style={styles.subscription}>
                        <TouchableHighlight style={styles.subscriptionButton} onPress={() => this.logout()}>
                            <View style={styles.subsexpander}>
                                <Text style={styles.subscriptionText}>Log Out</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navbar:{
        flex: 0,
        flexDirection: 'row',
        height: 80,
        paddingTop: 20,
    },
    navback:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navlocation:{
        flex: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navright:{
        flex:1
    },
    navtext:{
        textAlign: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 10,
    },
    filters:{
        flex: 1,
    },
    interests:{
        flex: 1,
    },
    sectionTitle: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    sectionTitleText: {
        color: '#e54560',
        padding: 20,
        fontWeight:'bold'
    },
    profile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    slider: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    switch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    subscription: {
        flex: 0,
        height:100,
        backgroundColor: '#e54560',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:1,
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
})