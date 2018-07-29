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

import * as firebase from 'firebase'

import SquareImage from '../components/squareImage'
import { Feather } from '@expo/vector-icons'
import ModalDropdown from 'react-native-modal-dropdown'

export default class EditProfile extends Component {

    state = {
        user: this.props.navigation.state.params.user,
        ageRangeValues: this.props.navigation.state.params.ageRangeValues,
        distanceValue: this.props.navigation.state.params.distanceValue,
        showMen: this.props.navigation.state.params.showMen,
        showWomen: this.props.navigation.state.params.showWomen,
        bio: this.props.navigation.state.params.user.bio,
        gender: this.props.navigation.state.params.user.gender,
    }

    updateUser = (key, value) => {
        const {uid} = this.state.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    save = (bio, gender) => {
        //updateUser
        this.updateUser('bio', bio)
        this.updateUser('gender', gender)
        //go home
        this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})
    }
    
    render() {
        const {width, height} = Dimensions.get('window')
        const {first_name, work, id} = this.state.user
        const {ageRangeValues, distanceValue, showMen, showWomen} = this.state
        //const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        let bio = this.state.bio
        let gender = this.state.gender
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
                        <Text style={{fontSize:20}}>{first_name}</Text>
                        <Text style={{fontSize:15, color: 'darkgray'}}>{bio}</Text>
                    </View>
                    <View style={styles.genderSelect}>
                        <Text>Gender</Text>
                        <ModalDropdown options={['male', 'female', 'nonbinary']} onSelect={(idx, value)=>this.setState({gender: value})}/>
                    </View>
                    <View style={styles.editBio}>
                        <Text>Bio</Text>
                        <TextInput
                            editable={true}
                            maxLength={255}
                            multline={true}
                            numberOfLines = {20}
                            defaultValue={bio}
                            onChangeText={(value) => this.setState({bio: value})}
                            width={width}
                        />
                    </View>
                    <View style={styles.save}>
                        <TouchableHighlight style={styles.saveButton} onPress={() => this.save(bio, gender) }>
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
    },
    genderSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})