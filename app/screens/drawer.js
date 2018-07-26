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
                </View>
                <View style={styles.version}>
                    <Text style={styles.versionText}>Sexy Awakening 1.0 Alpha</Text>
                </View>
                <View style={styles.menu}>
                    <TouchableHighlight style={styles.menuItem} onPress={() => this.word('about')}>
                        <Text>About</Text>
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
        backgroundColor: 'lightgray',
    },
    menuItem:{
        height:100,
        alignItems: 'center',
    },
    version:{
        backgroundColor:'white',
    },
    versionText:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#e54560',
    }
})