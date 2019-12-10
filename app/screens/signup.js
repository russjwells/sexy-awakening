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
import { auth, db } from '../firebase';
import { StackActions, NavigationActions } from 'react-navigation';

import CircleImage from '../components/circleImage'
import { Feather } from '@expo/vector-icons'
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    first_name: '',
    last_name: '',
    birthday: '',
    gender: 'female',
    error: null,
    message: null,
  };

export default class SignUp extends Component {

    state = {
        user: null,
        email: '',
        passwordOne: '',
        passwordTwo: '',
        first_name: '',
        last_name: '',
        birthday: '',
        gender: 'female',
        error: null,
        message: null,
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState({user: authUser})
            } else {
                this.setState({user: null})
            }
        })
    }

    createAccount = async () => {
        const profileBday = moment(this.state.birthday, 'MM/DD/YYYY')
        const profileAge = moment().diff(profileBday, 'years')
        console.log('profile age: '+ profileAge)
        if (profileAge >= 18){
            console.log('Age Passed')
            const {
                email,
                passwordOne,
                first_name,
                last_name,
                birthday,
                gender,
            } = this.state;
            var sanitizedEmail = email.replace(/(^\s+|\s+$)/g,'');
            auth.doCreateUserWithEmailAndPassword(sanitizedEmail, passwordOne)
            .then(authUser => {
                console.log("user auth created: " + authUser.uid.toString() + " " + authUser.name.toString())
                //alert("authUser: "+ authUser.toString())
                db.doCreateUser(authUser.uid, email, first_name, last_name, birthday, gender)
                .then(authUser => {
                    //console.log('authhy '+authUser)
                    console.log("user data created")
                    //this.setState({ ...INITIAL_STATE });
                    //this.setState(byPropKey('message', null))
                    //console.log('state set')
                    this.goHome(authUser)
                    //history.push(routes.HOME);

                })
                .catch(error => {
                    this.setState(byPropKey('error', error));
                    console.log("!!!! creating user failed"+error.message)
                });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        }else{
            console.log('Age Restriction')
            this.setState(byPropKey('message', 'You must be 18 to create an account.'))
        }

    }

    goHome(user) {
        console.log('signup gohome' + user)
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home', params:{user}}),
            ],
          });
        this.props.navigation.dispatch(resetAction);
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
        const {
            email,
            passwordOne,
            first_name,
            last_name,
            gender,
            error,
          } = this.state;

          let birthday = this.state.birthday

        const profileBday = moment(birthday, 'MM/DD/YYYY')
        const profileAge = moment().diff(profileBday, 'years')

        return(
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text style={styles.navtext}>Sign Up</Text>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.content}>
                <Form>
                    <Item>
                        <Input 
                        placeholder="Email" 
                        onChangeText={(text) => this.setState({email: text})}
                        />
                    </Item>
                    <Item>
                        <Input placeholder="Password"
                        onChangeText={(pass) => this.setState({passwordOne: pass})}
                        secureTextEntry={true}
                         />
                    </Item>
                    <Item>
                        <Input placeholder="First Name" 
                        onChangeText={(name) => this.setState({first_name: name})}
                        />
                    </Item>
                    <Item>
                        <Input placeholder="Last Name" 
                        onChangeText={(name) => this.setState({last_name: name})}/>
                    </Item>
                    <Item>
                        <View style={styles.rowSelect}>
                            <Text>Birthday: </Text>
                            <DatePicker
                            style={{width: 200}}
                            date={this.state.birthday}
                            mode="date"
                            placeholder={this.state.birthday != null ? this.state.birthday : "select birthday"}
                            format="MM/DD/YYYY"
                            minimumDate="1800-05-01"
                            maximumDate="2216-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                this.setState({birthday: date})
                                //alert(date)
                            }}
                            />
                        </View>
                    </Item>
                    <Item>
                        <View style={styles.rowSelect}>
                            <Text>Gender:</Text>
                            <ModalDropdown 
                            options={['male', 'female', 'nonbinary']} 
                            onSelect={(idx, value)=>this.setState({gender: value})}
                            defaultValue={this.state.gender}
                            />
                        </View> 
                    </Item>
                    <Item>
                    { !!this.state.message && <Item><Text>{this.state.message}</Text></Item> }
                    </Item>
                    
                </Form>
                <View style={styles.actionButtonArea}>
                        <TouchableHighlight style={styles.actionButton} onPress={() => this.createAccount()}>
                            <View style={styles.subsexpander}>
                                <Text style={styles.subscriptionText}>Create Account</Text>
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
        flex: 1,
        justifyContent: 'space-between',
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
    actionButtonArea: {
        flex: 0,
        height:100,
        backgroundColor: '#e54560',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:1,
    },
    actionButton: {
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
    rowSelect: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft:5,
    }
})