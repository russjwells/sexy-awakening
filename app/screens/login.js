import Expo from 'expo'
import firebase from 'firebase'
import React, {Component} from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation';
import FacebookButton from '../components/facebookButton'


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
            ageRange: [18,24],
        }
        firebase.database().ref('users').child(uid).update({...userData, ...defaults})
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
                <Text style={styles.titleText}>Sexy Awakening</Text>
                <Text style={styles.introText}>Your clothes conceal much of your beauty, yet they hide not the un-beautiful. And though you seek in garments the freedom of privacy you may find in them a harness and a chain. Would that you could meet the sun and the wind with more of your skin and less of your raiment, For the breath of life is in the sunlight and the hand of life is in the wind.</Text>
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
        justifyContent: 'space-around',
        backgroundColor: '#e54560'
        
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 60
    },
    introText: {
        fontSize: 18,
        margin: 50,
        color: 'white',
        lineHeight: 40,
        textAlign: 'center'
    },
    loginArea: {
        marginBottom: 60,
    }
})