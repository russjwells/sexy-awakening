import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
} from 'react-native'

export default class EditProfile extends Component {

    
    render() {
        return(
            <View style={styles.container}>
            <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navback}>
                            <Text>Back</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text>Edit Profile</Text>
                    </View>
                </View>
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
        flex: 1,
        flexDirection: 'row',
        height: 20,
    },
    navback:{
        flex: 1,
    },
    navlocation:{
        flex: 3,
    },
    content: {
        flex: 10,
    },
})