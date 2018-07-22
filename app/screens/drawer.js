import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Image from 'react-native-remote-svg'
import phoenixSymbol from '../../assets/img/phoenix.svg'
import phoenixSymbolRed from '../../assets/img/phoenix_red.svg'

export default class Drawer extends Component {

    word = (log) => {
        console.log(log)
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image source={phoenixSymbolRed} style={{width:100, height:100}} />
                    <Text>Sexy Awakening Alpha</Text>
                </View>
                <View style={styles.menu}>
                    <TouchableHighlight onPress={this.word('about')}>
                        <Text>About</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.word('subscription')}>
                        <Text>Subscription</Text>
                    </TouchableHighlight>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'lightgrey',
        borderRightWidth:1,
    },
    top:{
        flex:1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    menu:{
        flex:3,
        backgroundColor: 'white'
    },
})