import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Image } from 'react-native';
import phoenixSymbol from '../../assets/img/phoenix.png'
import phoenixSymbolRed from '../../assets/img/phoenix_red.png'

export default class Drawer extends Component {

    word = (log) => {
        console.log(log)
    }
    
    render(){
        const vis = this.props.isVisible
        return (
            <View style={styles.container}>
            {vis && (
                    <View style={styles.contents}>
                        <View style={styles.top}>
                            <Image source={phoenixSymbolRed} style={{width:100, height:100}} />
                        </View>
                        <View style={styles.version}>
                            <Text style={styles.versionText}>Sexy Awakening Beta</Text>
                        </View>
                        <View style={styles.menu}>
                            <TouchableHighlight style={styles.menuItem} onPress={() => this.props.navigation.navigate('About', {user: this.props.navigation.state.params.user})}>
                                <Text>About Sexy Awakening</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    )
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    contents:{
        flex:1,
        backgroundColor:'white',
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
        backgroundColor: 'white',
    },
    menuItem:{
        height:100,
        alignItems: 'center',
        justifyContent: 'space-around',
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