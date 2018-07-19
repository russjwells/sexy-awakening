import React, {Component} from 'react'
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native'

import {GiftedChat} from 'react-native-gifted-chat'

import * as firebase from 'firebase'

import { Feather } from '@expo/vector-icons'

import CircleImage from '../components/circleImage'

export default class Chat extends Component {

    state={
        messages:[],
        user: this.props.navigation.state.params.user,
        profile: this.props.navigation.state.params.profile,
    }

    componentWillMount() {
        const {user, profile} = this.state
        this.chatID = user.id > profile.uid ? user.uid + '-' + profile.uid : profile.uid + '-' + user.uid
        this.watchChat()
    }

    watchChat = () => {
      firebase.database().ref('messages').child(this.chatID).on('value', snap => {
        let messages = []
        snap.forEach(message => {
          messages.push(message.val())
        })
        messages.reverse()
        this.setState({messages})
      })
    }

    onSend = (message) => {
        firebase.database().ref('messages').child(this.chatID)
        .push({
          ...message[0],
          createdAt: new Date().getTime(),
        })
    }

    render () {
        const avatar = `https://graph.facebook.com/${this.state.profile.uid}/picture?height=80` 
        return(
            <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={80}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                            <Feather name="arrow-left" size={32} color="black" />
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('ViewProfile', {user: this.props.navigation.state.params.user, profile: this.props.navigation.state.params.profile})}>
                            <View style={styles.chatnavlink}>
                                <CircleImage style={styles.chatnavavatar} size={40} facebookID={this.state.profile.id}/>
                                <Text style={styles.navtext}> {this.state.profile.first_name}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.navinventory}>
                        </View>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    user={{_id:this.state.user.uid, avatar}}
                    onSend={this.onSend}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navbar: {
        flexDirection: 'row',
        height: 80,
        paddingTop: 20,
    },
    navback: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navlocation: {
        flex: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    chatnavlink:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatnavavatar:{
        paddingRight: 4,
    },
    navinventory: {
        flex:1,
    },
    navtext:{
        textAlign: 'center',
        fontWeight: 'bold',
    },
})