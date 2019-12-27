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
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Textarea } from 'native-base'

import * as firebase from 'firebase'
import SquareAvatar from '../components/squareAvatar'
import SquareImage from '../components/squareImage'
import { Feather } from '@expo/vector-icons'
import ModalDropdown from 'react-native-modal-dropdown'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import axios from 'axios'

export default class EditProfile extends Component {

    state = {
        user: this.props.navigation.state.params.user,
        bio: this.props.navigation.state.params.user.bio,
        gender: this.props.navigation.state.params.user.gender,
        age: this.props.navigation.state.params.user.age,
        birthday: this.props.navigation.state.params.user.birthday,
        picture: this.props.navigation.state.params.user.picture,
        newPic: null,
    }

    updateUser = (key, value) => {
        const {uid} = this.state.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    newpic = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let pic = await ImagePicker.launchImageLibraryAsync(
                {
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                }
            )
            console.log('picker image uri' + pic.uri)
            let picURI = pic.uri//`data:image/jpg;base64,${pic.base64}`
            const base64prepend = 'data:image/jpeg;base64,'
            const imgData = base64prepend + pic.base64
            //set pic locally
            this.setState({newPic: picURI})

            //compose thing to send
            const jsonData = `{"base64String":"${pic.base64}","uid":"${this.state.user.uid}"}`
            // Create the config object for the POST
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData
            };
            //const headers
            const url = 'https://qpfa7ske9k.execute-api.us-west-1.amazonaws.com/sexy-awakening-beta-2/upload-file';
            //send it with fetch
            /*
            fetch(url, config)
                .then(response => {
                    console.log("response data: ")
                    console.log(response)
                    return response.json()
                })
                .then(data => {

                    // Log the response from the server
                    //console.log("where did the file go? "+responseData._bodyBlob.data);
                    console.log("upload data: ")
                    console.log(data)
                    //console.log(JSON.parse(responseData._bodyBlob)
                    //alert('new pic: '+ responseData._bodyText);
                    //alert(responseData.file_url);
                    //const jsonPayload = responseData._bodyBlob;
                    //const obj = JSON.parse(jsonPayload)
                    //const fileurl = obj.url
                    //console.log('file url ' + fileurl)
                    //this.setState({picture: fileurl})
                    //this.updateUser('picture', this.state.picture)
                })
                .catch(err => {
                    console.log('image upload failed ')
                    console.log(err.message)
                    //this.setState({newPic: null})
                    alert('error: '+ err.message)
                });
            */
            //send it with axios
            axios.post(url, jsonData, { headers: {'Content-Type': 'application/json' }})
            .then((response) => {
                console.log('response: ')
                console.log(response.data);
                //set picture url locally and in db
                this.setState({picture: response.data.url})
                this.updateUser('picture', this.state.picture)
                console.log('pic updated')
              }, (error) => {
                console.log(error);
                console.log('pic error')
              });
        } else {
            alert('Enable your camera roll permissions to upload!')
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
        let picURI = this.state.newPic

        const profileBday = moment(birthday, 'MM/DD/YYYY')
        const profileAge = moment().diff(profileBday, 'years')
        
        return (
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
                    {
                        this.state.newPic ?
                        <Image
                            style={{flex: 0, height: width, width: width}}
                            //source={{uri: `data:image/jpg;base64,${this.state.newPic}`}}
                            source={{uri: picURI}}
                        /> :
                        <TouchableHighlight onPress={() => this.newpic()}>
                             <SquareAvatar 
                                uid={this.state.user.uid} 
                                pic={this.state.user.picture} 
                                size={(width, width)}
                             />
                        </TouchableHighlight>
                    }
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
                            <Text style={styles.saveText}>SAVE CHANGES</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
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