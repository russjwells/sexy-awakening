import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

export default class Profile extends Component {
    render () {
        const {first_name, work} = this.props.user
        return(
            <View style={styles.container} >
                <View style={styles.profile}>
                    <Text>{first_name}</Text>
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
    profile: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})