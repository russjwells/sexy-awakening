import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
    TextInput,
    KeyboardAvoidingView,
    Dimensions,
    ScrollView,
} from 'react-native'

import * as firebase from 'firebase'

import SquareImage from '../components/squareImage'
import { Feather } from '@expo/vector-icons'

export default class About extends Component {

    state = {
        user: this.props.navigation.state.params.user,
    }
    
    render() {
        const {width, height} = Dimensions.get('window')
        const {first_name, bio, id} = this.props.navigation.state.params.user
        return(
            <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={60}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user, profile: this.props.navigation.state.params.profile})}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text style={styles.navtext}>ABOUT</Text>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <View style={styles.content}>
                    <ScrollView style={styles.about}>
                        <Text style={{fontSize:20, margin:20}}>We're so glad you're here, {first_name}.</Text>
                        <Text style={{fontSize:20, margin:20, fontWeight:'bold'}}>Welcome to Sexy Awakening</Text>
                        <Text style={{fontSize:15, color: 'darkgray', margin:20}}>This is a transformational space. </Text>
                        <Text style={{fontSize:15, color: 'darkgray', margin:20}}>We agree to honor each other with reverence and compassion in order to become more authentic, present, alive, awake, and evolved.</Text>
                        <Text style={{fontSize:15, color: 'darkgray', margin:20}}>We're here to guide your adventure into self knowledge. To open up your world, your heart, and your soul.</Text>
                        <Text style={{fontSize:15, color: 'darkgray', margin:20}}>Sexy Awakening is creating a culture of consent, sex positivity, and healthy boundaries in which all beings feel may safe to explore, express, and be received.</Text>
                        <Text style={{fontSize:15, color: 'darkgray', margin:20}}>Thank you for coming. Enjoy your self!</Text>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profile: {
        flex:8,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navbar:{
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
        flex: 1,
    },
    navtext:{
        textAlign: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
    },
    editBio:{
        flex:1,
        backgroundColor:'#fff',
        padding: 20,
    },
    save: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#e54560',
    },
    saveButton: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    saveText: {
        color: 'white',
    },
})