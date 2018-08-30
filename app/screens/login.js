import Expo from 'expo'
import firebase from 'firebase'
import React, {Component} from 'react'
import { Text, KeyboardAvoidingView, View, StyleSheet, ActivityIndicator, Image, StatusBar } from 'react-native'

import { NavigationActions } from 'react-navigation';
import FacebookButton from '../components/facebookButton'
import Button from '../components/button'

import logo from '../../assets/img/sa_logo.png'
import phoenix from '../../assets/img/sa_logo.png'
import phoenixSymbol from '../../assets/img/phoenix.png'
import phoenixSymbolRed from '../../assets/img/phoenix_red.png'

import { Container, Header, Content, DatePicker, Form, Item, Input } from 'native-base';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

const INITIAL_STATE = {
    showSpinner: false,
    email: '',
    password: '',
    error: null,
  };

export default class Login extends Component {

    state = {
        showSpinner: false,
        email: '',
        password: '',
        error: null,
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



    createUser = (uid, userData) => {
        const defaults = {
            uid,
            distance: 30,
            ageRange: [18,36],
            showMen: true,
            showWomen: true,
            subscription: 'guest',
            bio: '',
        }
        firebase.database().ref('users').child(uid).update({...userData, ...defaults})
        //firebase.database().ref('relationships').child(uid).update({...userData, ...defaults})
    }

    login = async (email, password) => {
        this.setState({showSpinner: true})
        auth.doSignInWithEmailAndPassword(email, password)
            .then(user => {
                this.state.setState({...INITIAL_STATE})
                this.goHome(user)
            })
            .catch(err => {
                this.setState({error: err});
                console.log(err)
            });
    }

    fblogin = async () => {
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
            const {uid} = await this.fbauthenticate(token)

            this.firebaseRef = firebase.database().ref('users')
            this.firebaseRef.child(uid).on('value', snap => {
                const user = snap.val()
                if (user != null) {
                    console.log('user exists')
                }else{
                    console.log('creating new account')
                    this.createUser(uid, userData)
                }
            })
        } else {
            if(type === 'cancel'){
                this.setState({showSpinner: false})
            }
        }
    }

    fbauthenticate = (token) => {
        const provider = firebase.auth.FacebookAuthProvider
        const credential = provider.credential(token)
        return firebase.auth().signInWithCredential(credential)
    }

    render(){
        const {
            email,
            password,
            error,
          } = this.state;

        return(
            <View
                style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <View style={styles.logoArea}>
                    
                </View>
                <View style={styles.titleArea}>
                    <Image source={phoenixSymbolRed} style={{width:100, height:100}} />
                    <Text style={styles.titleText}>Sexy Awakening</Text>
                    <Text style={styles.subtitleText}>SWIPE WITH INTENTION</Text>
                    <Text>username: {this.state.email}, password: {this.state.password}</Text>
                </View>
                <View style={styles.loginArea}>
                {this.state.showSpinner ? 
                    <ActivityIndicator animating={this.state.showSpinner} /> :
                    <View>
                        <Form onSubmit={this.onSubmit}>
                            <Item>
                                <Input 
                                    //value={email} 
                                    onChangeText={(text) => this.setState({email: text})}
                                    placeholder="Email" 
                                    type="text"
                                    defaultValue="sexyawakening@gmail.com"
                                />
                            </Item>
                            <Item>
                                <Input 
                                    //value={password} 
                                    onChangeText={(pass) => this.setState({password: pass})}
                                    placeholder="Password" 
                                    type="password"
                                    defaultValue="trees808"
                                />
                            </Item>
                            <Button prompt={'Login'} onPress={() => this.login(this.state.email, this.state.password)}/>
                        </Form>
                        
                        <Button prompt={'Create Account'} onPress={() => this.props.navigation.navigate('SignUp')}/>
                        <FacebookButton onPress={this.fblogin}/>
                    </View>
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