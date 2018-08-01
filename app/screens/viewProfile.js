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
} from 'react-native'

import * as firebase from 'firebase'

import SquareImage from '../components/squareImage'
import { Feather } from '@expo/vector-icons'

export default class ViewProfile extends Component {

    state = {
        user: this.props.navigation.state.params.user,
    }
    
    render() {
        const {width, height} = Dimensions.get('window')
        const {first_name, bio, id} = this.props.navigation.state.params.profile
        return(
            <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={60}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text style={styles.navtext}>{first_name}</Text>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.profile}>
                        <SquareImage facebookID={id} size={width, width}/>
                        <Text style={{fontSize:20}}>{first_name}</Text>
                        <Text style={{fontSize:15, color: 'darkgray'}}>{bio}</Text>
                    </View>
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