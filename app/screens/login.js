import Expo from 'expo'
import firebase from 'firebase'
import React, {Component} from 'react'
import { Text, View, StyleSheet, ActivityIndicator,} from 'react-native'
import Image from 'react-native-remote-svg'
import { NavigationActions } from 'react-navigation';
import FacebookButton from '../components/facebookButton'

import logo from '../../assets/img/sa_logo.png'
import phoenix from '../../assets/img/sa_logo.png'
import phoenixSymbol from '../../assets/img/phoenix.svg'
import phoenixSymbolRed from '../../assets/img/phoenix_red.svg'


export default class Login extends Component {

    state = {
        showSpinner: true,
    }

    componentDidMount() {
        firebase.auth().signOut()
        firebase.auth().onAuthStateChanged(auth => {
            if (auth) {
                this.firebaseRef = firebase.database().ref('users')
                this.firebaseRef.child(auth.uid).on('value', snap => {
                    const user = snap.val()
                    if (user != null) {
                        this.firebaseRef.child(auth.uid).off('value')
                        this.goHome(user)
                    }
                })
            } else {
                this.setState({showSpinner: false})
            }
        }) 
    }

    goHome(user) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home', params:{user}}),
            ],
          });
        this.props.navigation.dispatch(resetAction);
    }

    authenticate = (token) => {
        const provider = firebase.auth.FacebookAuthProvider
        const credential = provider.credential(token)
        return firebase.auth().signInWithCredential(credential)
    }

    createUser = (uid, userData) => {
        const defaults = {
            uid,
            distance: 5,
            ageRange: [18,36],
            showMen: true,
            showWomen: true,
            subscription: 'guest'
        }
        firebase.database().ref('users').child(uid).update({...userData, ...defaults})
        //firebase.database().ref('relationships').child(uid).update({...userData, ...defaults})
    }

    login = async () => {
        this.setState({showSpinner: true})
        const saAPP_ID = '224960994730731'
        const APP_ID = '1773849149576744'
        const options = {
            permissions: ['public_profile', 'email'],
        }
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(saAPP_ID, options)
        if (type === 'success') {
            const fields = ['id', 'first_name', 'last_name', 'gender', 'birthday', 'work']
            const response = await fetch(`https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`)
            const userData = await response.json()
            const {uid} = await this.authenticate(token)
            this.createUser(uid, userData)
        }
    }

    render(){
        return(
            <View
                style={styles.container}>
                <View style={styles.logoArea}>
                    
                </View>
                <View style={styles.titleArea}>
                    <Image source={phoenixSymbolRed} style={{width:100, height:100}} />
                    <Text style={styles.titleText}>Sexy Awakening</Text>
                    <Text style={styles.subtitleText}>SWIPE WITH INTENTION</Text>
                </View>
                <View style={styles.loginArea}>
                {this.state.showSpinner ? 
                    <ActivityIndicator animating={this.state.showSpinner} /> :
                    <FacebookButton onPress={this.login}/>
                }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    logoArea:{
        flex:1,
    },
    titleArea: {
        flex: 2,
        alignItems: 'center',
        //justifyContent: 'space-around',
        marginTop:10,
    },
    titleText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#e54560',
    },
    subtitleText: {
        fontSize: 16,
        color: '#e54560',
        //lineHeight: 36,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    introText: {
        fontSize: 16,
        margin: 50,
        color: 'black',
        lineHeight: 20,
        textAlign: 'center'
    },
    loginArea: {
        marginBottom: 60,
    }
})