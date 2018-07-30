import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
    WebView,
} from 'react-native'

import * as firebase from 'firebase'

import { Feather } from '@expo/vector-icons'

export default class Subscription2 extends Component {

    state = {
        user: this.props.navigation.state.params.user,
        subscriptionType: this.props.navigation.state.params.subscriptionType,
    }

    purchase = (user, subscription) => {
        //write to database
        this.updateUser('subscription', subscription)
        //go home
        this.props.navigation.navigate('Home', {user: user})
    }
    updateUser = (key, value) => {
        const {uid} = this.state.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }
    render() {
        const {first_name, last_name, email, uid} = this.state.user
        const subscription = this.state.subscriptionType
        return(
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text style={styles.navtext}>Payment</Text>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <View style={styles.content}>
                        <View style={styles.content}>
                            <View>
                                <Text>Confirm your new {subscription} subscription, {first_name}.</Text>
                            </View>
                            <WebView
                                source={{uri: 'https://sexyawakening.recurly.com/subscribe/'+subscription+'/'+uid+'?first_name='+first_name+'&last_name='+last_name}}
                                style={{marginTop: 2}}
                            />
                        </View>
                        <TouchableHighlight style={styles.menuButton} onPress={() => this.purchase(this.props.navigation.state.params.user, this.props.navigation.state.params.subscriptionType)}>
                            <View style={styles.menuConfirmButton}>
                                <Text>PURCHASE</Text>
                            </View>
                        </TouchableHighlight>
                </View>
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
        flex:1,
    },
    navtext:{
        textAlign: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
    },
    menuButton: {
        flex:0,
        height:10
    },
    menuOption: {
        flex:2,
    },
    menuOptionSelected: {
        flex:2,
        backgroundColor: 'green',
    },
    menuConfirmButton: {
        flex:1
    }
})