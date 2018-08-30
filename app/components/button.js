import React, {Component} from 'react'
import {
    View, TouchableHighlight, Text, StyleSheet,
} from 'react-native'

import Icon from '@expo/vector-icons/FontAwesome'

export default class FacebookButton extends Component {
    render(){
        return(
            <TouchableHighlight
                style={styles.button}
                onPress={this.props.onPress}
            >
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{this.props.prompt}</Text>
            </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 220,
        backgroundColor: '#e54560',
        borderRadius: 50,
        margin: 5,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        marginLeft: 15,
    }
})