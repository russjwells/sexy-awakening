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

    state = {
        subscriptionType:'guest',
    }
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
                        <Text style={styles.navtext}>YOUR SUBSCRIPTION</Text>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <View style={styles.content}>
                        <View style={styles.content}>
                            <TouchableHighlight style={styles.menuButton} onPress={() => this.setState({subscriptionType:'guest'})}>
                                <View style={this.state.subscriptionType=='guest' ? styles.menuOptionSelected : styles.menuOption}>
                                    <Text>Sexy Awakening Guest</Text>
                                    <Text>f r e e </Text>
                                    <Text>You're an honored guest here.</Text>
                                    <Text>Everyone starts out with this option.</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.menuButton} onPress={() => this.setState({subscriptionType:'unlimited'})}>
                                <View style={this.state.subscriptionType=='unlimited' ? styles.menuOptionSelected : styles.menuOption}>
                                    <Text>Sexy Awakening Unlimited</Text>
                                    <Text>$11/month</Text>
                                    <Text>Infinite Swiping</Text>
                                    <Text>Unlocked Location</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.menuButton} onPress={() => this.setState({subscriptionType:'gold'})}>
                                <View style={this.state.subscriptionType=='gold' ? styles.menuOptionSelected : styles.menuOption}>
                                    <Text>Sexy Awakening Gold</Text>
                                    <Text>$33/month</Text>
                                    <Text>All the benefits of unlimited.</Text>
                                    <Text>Show off with a golden profile. You rare pokemon.</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.menuButton} onPress={() => this.setState({subscriptionType:'supporter'})}>
                                <View style={this.state.subscriptionType=='supporter' ? styles.menuOptionSelected : styles.menuOption}>
                                    <Text>Sexy Awakening Supporter</Text>
                                    <Text>$34+/month, pay what you want.</Text>
                                    <Text>All the benefits of gold + be the first to try new features.</Text>
                                    <Text>Support the cause.</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.menuButton} onPress={() => this.props.navigation.navigate('Subscription2', {user: this.props.navigation.state.params.user, subscriptionType: this.state.subscriptionType})}>
                                <View style={styles.menuConfirmButton}>
                                    <Text>CONTINUE</Text>
                                </View>
                            </TouchableHighlight>
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
        flex:1,
    },
    navtext:{
        textAlign: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
    },
    menuButton: {
        flex:2,
    },
    menuOption: {
        flex:2,
    },
    menuOptionSelected: {
        flex:2,
        backgroundColor: 'green',
    },
    menuConfirmButton: {
        flex:1
    }
})