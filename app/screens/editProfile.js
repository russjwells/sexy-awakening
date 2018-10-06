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
    Image
} from 'react-native'
import { ImagePicker, Permissions } from 'expo'
import { Textarea } from 'native-base'

import * as firebase from 'firebase'
import SquareAvatar from '../components/squareAvatar'
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
        picture: this.props.navigation.state.params.user.picture,
        //newPic: null,
    }

    updateUser = (key, value) => {
        const {uid} = this.state.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    newpic = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let pic = await Expo.ImagePicker.launchImageLibraryAsync(
                {
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                }
            )
            console.log('le picker'+pic.uri)
            
            var picURI = `data:image/jpg;base64,${pic.base64}`
            this.setState({newPic: picURI})
    
            const base64prepend = 'data:image/jpeg;base64,'
            const data = base64prepend + pic.base64
            const jsonData = `{"base64String":"${pic.base64}","uid":"${this.state.user.uid}"}`

            // Create the config object for the POST
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData
            };

            const url = 'https://qpfa7ske9k.execute-api.us-west-1.amazonaws.com/sexy-awakening-beta-2/upload-file';
    
            fetch(url, config)
                .then(responseData => {
                    // Log the response form the server
                    console.log("where did the file go? "+responseData._bodyText);
                    console.log(responseData)
                    //alert('new pic: '+ responseData._bodyText);
                    //alert(responseData.file_url);
                    const jsonPayload = responseData._bodyText;
                    const obj = JSON.parse(jsonPayload)
                    const fileurl = obj.url
                    console.log('file url ' +fileurl)
                    this.setState({picture: fileurl})
                    this.updateUser('picture', this.state.picture)
                })
                .catch(err => {
                    console.log('ohh '+err);
                    alert('error: '+err.message)
                });
        }


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
                        <TouchableHighlight onPress={() => this.newpic()}>
                             <SquareAvatar 
                                uid={this.state.user.uid} 
                                pic={this.state.user.picture} 
                                size={width, width}
                             />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.nameagephotoSelect}>
                            <Text style={{fontSize:20}}>{first_name}, {profileAge} </Text>
                            <TouchableHighlight onPress={() => this.newpic()}>
                                <Feather name="camera" size={28} color="black" />
                            </TouchableHighlight>
                    </View>
                    <View style={styles.genderSelect}>
                        <Text>Gender</Text>
                        <ModalDropdown 
                        options={['male', 'female', 'nonbinary', 'transmale', 'transfemale']} 
                        onSelect={(idx, value)=>this.setState({gender: value})}
                        defaultValue={this.state.gender}
                        />
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
                            onDateChange={(date) => {
                                this.setState({birthday: date})
                                //alert(date)
                            }}
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
    nameagephotoSelect: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
        marginBottom:10,
        paddingLeft: 20,
        paddingRight: 20,
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