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
                <View style={styles.chatnav}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navBack}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navChatTitle}>
                        <Text>Chat with {this.state.profile.first_name}</Text>
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
    chatnav: {
        flexDirection: 'row',
        height: 80,
        paddingTop: 20,
    },
    navBack: {
        flex: 1,
    },
    navChatTitle: {
        flex: 4,
    }
})