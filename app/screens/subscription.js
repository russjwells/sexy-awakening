import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
} from 'react-native'

import { Feather } from '@expo/vector-icons'

export default class Subscription extends Component {

    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text>Sexy Awakening Unlimited</Text>
                    </View>
                </View>
                <View style={styles.content}>
                        <View style={styles.content}>
                            <Text>Sexy Awakening Unlimited</Text>
                            <Text>Infinite Swiping</Text>
                            <Text>Unlocked Location</Text>
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