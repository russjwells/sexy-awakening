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
        user: this.props.navigation.state.params.user,
        subscriptionType:this.props.navigation.state.params.user.subscription,
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
                                    <Text style={this.state.subscriptionType=='guest' ? styles.menuOptionTitleTextSelected : styles.menuOptionTitleText}>Sexy Awakening Guest</Text>
                                    <Text style={this.state.subscriptionType=='guest' ? styles.menuOptionPriceTextSelected : styles.menuOptionPriceText}>free </Text>
                                    <Text style={this.state.subscriptionType=='guest' ? styles.menuOptionDescriptionTextSelected : styles.menuOptionDescriptionText}>You're an honored guest. Please enjoy expressing and meeting yourself.</Text>
                                    <Text style={this.state.subscriptionType=='guest' ? styles.menuOptionDescriptionTextSelected : styles.menuOptionDescriptionText}>Everyone starts out with this option.</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.menuButton} onPress={() => this.setState({subscriptionType:'unlimited'})}>
                                <View style={this.state.subscriptionType=='unlimited' ? styles.menuOptionSelected : styles.menuOption}>
                                    <Text style={this.state.subscriptionType=='unlimited' ? styles.menuOptionTitleTextSelected : styles.menuOptionTitleText}>Sexy Awakening Unlimited</Text>
                                    <Text style={this.state.subscriptionType=='unlimited' ? styles.menuOptionPriceTextSelected : styles.menuOptionPriceText}>$11/month</Text>
                                    <Text style={this.state.subscriptionType=='unlimited' ? styles.menuOptionDescriptionTextSelected : styles.menuOptionDescriptionText}>Infinite Swiping</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.menuButton} onPress={() => this.setState({subscriptionType:'gold'})}>
                                <View style={this.state.subscriptionType=='gold' ? styles.menuOptionSelected : styles.menuOption}>
                                    <Text style={this.state.subscriptionType=='gold' ? styles.menuOptionTitleTextSelected : styles.menuOptionTitleText}>Sexy Awakening Gold</Text>
                                    <Text style={this.state.subscriptionType=='gold' ? styles.menuOptionPriceTextSelected : styles.menuOptionPriceText}>$33/month</Text>
                                    <Text style={this.state.subscriptionType=='gold' ? styles.menuOptionDescriptionTextSelected : styles.menuOptionDescriptionText}>All the benefits of unlimited.</Text>
                                    <Text style={this.state.subscriptionType=='gold' ? styles.menuOptionDescriptionTextSelected : styles.menuOptionDescriptionText}>A golden profile.</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.menuButton} onPress={() => this.setState({subscriptionType:'supporter'})}>
                                <View style={this.state.subscriptionType=='supporter' ? styles.menuOptionSelected : styles.menuOption}>
                                    <Text style={this.state.subscriptionType=='supporter' ? styles.menuOptionTitleTextSelected : styles.menuOptionTitleText}>Sexy Awakening Supporter</Text>
                                    <Text style={this.state.subscriptionType=='supporter' ? styles.menuOptionPriceTextSelected : styles.menuOptionPriceText}>$34+/month, pay what you want.</Text>
                                    <Text style={this.state.subscriptionType=='supporter' ? styles.menuOptionDescriptionTextSelected : styles.menuOptionDescriptionText}>Gold option</Text>
                                    <Text style={this.state.subscriptionType=='supporter' ? styles.menuOptionDescriptionTextSelected : styles.menuOptionDescriptionText}>Support the cause.</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.menuButton} onPress={() => this.props.navigation.navigate('Subscription2', {user: this.props.navigation.state.params.user, subscriptionType: this.state.subscriptionType})}>
                                <View style={styles.menuConfirmButton}>
                                    <Text style={styles.menuConfirmText}>CONTINUE</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menuOptionTitleText:{
        color:'black',
        fontWeight: 'bold',
    },
    menuOptionTitleTextSelected:{
        color:'white',
        fontWeight: 'bold',
    },
    menuOptionDescriptionText:{
        color:'black',
    },
    menuOptionDescriptionTextSelected:{
        color:'white',
    },
    menuOptionPriceText:{
        color:'black',
    },
    menuOptionPriceTextSelected:{
        color:'white',
    },
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
        padding: 20,
        flex:2,
    },
    menuOptionSelected: {
        padding: 20,
        flex:2,
        backgroundColor: '#e54560',
    },
    menuConfirmButton: {
        flex:1
    }
})