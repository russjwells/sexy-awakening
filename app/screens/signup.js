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
import { Container, Header, Content, DatePicker, Form, Item, Input } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown'

export default class SignUp extends Component {

    state = {
        //user: this.props.navigation.state.params.user,
        birthday: null,
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
                <ScrollView style={styles.content}>
                <Form>
                    <Item>
                        <Input placeholder="Email" />
                    </Item>
                    <Item>
                        <Input placeholder="Password" />
                    </Item>
                    <Item>
                        <Input placeholder="Password Again" />
                    </Item>
                    <Item>
                        <Input placeholder="First Name" />
                    </Item>
                    <Item>
                        <Input placeholder="Last Name" />
                    </Item>
                    <Item>
                        <View>
                            <Text>Birthday: </Text>
                            <DatePicker
                            style={{width: 200}}
                            date={this.state.birthday}
                            mode="date"
                            placeholder={this.state.birthday != null ? this.state.birthday : "select birthday"}
                            format="MM/DD/YYYY"
                            minDate="1800-05-01"
                            maxDate="2216-06-01"
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
                            onDateChange={(date) => {this.setState({birthday: date})}}
                            />
                        </View>
                    </Item>
                    <Item>
                    <Text>Gender</Text>
                        <ModalDropdown 
                        options={['male', 'female', 'nonbinary']} 
                        onSelect={(idx, value)=>this.setState({gender: value})}
                        defaultValue={this.state.gender}
                        />
                    </Item>
                </Form>
                <View style={styles.subscription}>
                        <TouchableHighlight style={styles.subscriptionButton} onPress={() => this.logout()}>
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