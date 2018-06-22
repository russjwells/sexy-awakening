import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native'

import CircleImage from '../components/circleImage'
import { Feather } from '@expo/vector-icons'

export default class EditProfile extends Component {

    state = {
        user: this.props.navigation.state.params.user,
        ageRangeValues: this.props.navigation.state.params.ageRangeValues,
        distanceValue: this.props.navigation.state.params.distanceValue,
        showMen: this.props.navigation.state.params.showMen,
        showWomen: this.props.navigation.state.params.showWomen,
    }

    render() {
        const {first_name, work, id} = this.state.user
        const {ageRangeValues, distanceValue, showMen, showWomen} = this.state
        const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        return(
            <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={60}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text>Edit Profile</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.profile}>
                        <CircleImage facebookID={id} size={120}/>
                        <Text style={{fontSize:20}}>{first_name}</Text>
                        <Text style={{fontSize:15, color: 'darkgray'}}>{bio}</Text>
                    </View>
                    <View style={styles.bio}>
                        <TextInput
                            editable={true}
                            maxLength={255}
                            multline={true}
                            numberOfLines = {20}
                            defaultValue={"What are you?"}
                        />
                    </View>
                    <View style={styles.save}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                            <Text>SAVE</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profile: {
        flex: 1,
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
    },
    navlocation:{
        flex: 3,
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
    },
})