import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
    TextInput,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native'

import * as firebase from 'firebase'

import SquareAvatar from '../components/squareAvatar'
import { Feather } from '@expo/vector-icons'

export default class YourProfile extends Component {

    state = {
        user: this.props.navigation.state.params.user,
        ageRangeValues: this.props.navigation.state.params.ageRangeValues,
        distanceValue: this.props.navigation.state.params.distanceValue,
        showMen: this.props.navigation.state.params.showMen,
        showWomen: this.props.navigation.state.params.showWomen,
        bio: this.props.navigation.state.params.user.bio,
    }

    updateUser = (key, value) => {
        const {uid} = this.state.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    save = (bio) => {
        //updateUser
        this.updateUser('bio', bio)
        //go home
        this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})
    }
    
    render() {
        const {width, height} = Dimensions.get('window')
        const {first_name, picture, uid} = this.state.user
        const {ageRangeValues, distanceValue, showMen, showWomen} = this.state
        //const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        let bio = this.state.bio
        return (
            <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={60}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text style={styles.navtext}>{first_name}</Text>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.profile}>
                        <SquareAvatar 
                            uid={uid} 
                            pic={picture} 
                            size={(width, width)}
                        />
                        <Text style={{fontSize:20}}>{first_name}</Text>
                        <Text style={{fontSize:15, color: 'darkgray'}}>{bio}</Text>
                    </View>
                </View>
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
        flex:8,
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
})