import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
} from 'react-native'

import { Textarea } from 'native-base'

import * as firebase from 'firebase'

import SquareImage from '../components/squareImage'
import { Feather } from '@expo/vector-icons'
import ModalDropdown from 'react-native-modal-dropdown'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

export default class EditProfile extends Component {

    state = {
        user: this.props.navigation.state.params.user,
        bio: this.props.navigation.state.params.user.bio,
        gender: this.props.navigation.state.params.user.gender,
        age: this.props.navigation.state.params.user.age,
        birthday: this.props.navigation.state.params.user.birthday,
    }

    updateUser = (key, value) => {
        const {uid} = this.state.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    save = (bio, gender, birthday) => {
        //updateUser
        this.updateUser('bio', bio)
        this.updateUser('gender', gender)
        this.updateUser('birthday', birthday)
        //go home
        this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})
    }
    
    render() {
        const {width, height} = Dimensions.get('window')
        const {first_name, work, id} = this.state.user

        let bio = this.state.bio
        let gender = this.state.gender
        let birthday = this.state.birthday

        const profileBday = moment(birthday, 'MM/DD/YYYY')
        const profileAge = moment().diff(profileBday, 'years')
        
        return(
            <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={60}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text style={styles.navtext}>EDIT PROFILE</Text>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <ScrollView style={styles.content}>
                    <View style={styles.profile}>
                        <SquareImage facebookID={id} size={width, width}/>
                        <Text style={{fontSize:20}}>{first_name}, {profileAge}</Text>
                        <Text style={{fontSize:15, color: 'darkgray'}}>{bio}</Text>
                    </View>
                    <View style={styles.genderSelect}>
                        <Text>Gender</Text>
                        <ModalDropdown 
                        options={['male', 'female', 'nonbinary']} 
                        onSelect={(idx, value)=>this.setState({gender: value})}
                        defaultValue={this.state.gender}
                        />
                    </View>
                    <View style={styles.ageSelect}>
                        <View style={styles.label}>
                            <Text>Age</Text>
                            <Text style={{color: 'darkgrey'}}>{profileAge}</Text>
                        </View>
                    </View>
                    <View style={styles.birthdaySelect}>
                        <View style={styles.label}>
                            <Text>Birthday</Text>
                            <DatePicker
                            style={{width: 200}}
                            date={this.state.birthday}
                            mode="date"
                            placeholder={this.state.birthday != null ? this.state.birthday : "select date"}
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
                    </View>
                    <View style={styles.editBio}>
                        <Text>Bio</Text>
                        <Textarea 
                            rowSpan={5} 
                            bordered  
                            defaultValue={bio}
                            onChangeText={(value) => this.setState({bio: value})}
                        />
                    </View>
                    <View style={styles.save}>
                        <TouchableHighlight style={styles.saveButton} onPress={() => this.save(bio, gender, birthday) }>
                            <Text style={styles.saveText}>SAVE</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
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
        //flex:8,
        width: width,
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
        //justifyContent: 'flex-start',
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
        fontWeight: 'bold',
    },
    genderSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
        marginBottom:10,
        paddingLeft: 20,
        paddingRight: 20,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})