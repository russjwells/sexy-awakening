import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
} from 'react-native'
import * as firebase from 'firebase'

import CircleImage from '../components/circleImage'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

export default class Profile extends Component {
    state = {
        ageRangeValues: this.props.user.ageRange,
        distanceValue: [this.props.user.distance],
        showMen: this.props.user.showMen,
        showWomen: this.props.user.showWomen,
    }

    updateUser = (key, value) => {
        const {uid} = this.props.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    render () {
        const {first_name, work, id} = this.props.user
        const {ageRangeValues, distanceValue, showMen, showWomen} = this.state
        const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        return(
            <View style={styles.container} >
                <View style={styles.profile}>
                    <CircleImage facebookID={id} size={120}/>
                    <Text style={{fontSize:20}}>{first_name}</Text>
                    <Text style={{fontSize:15, color: 'darkgray'}}>{bio}</Text>
                </View>
                <View style={styles.label}>
                    <Text>Distance</Text>
                    <Text style={{color: 'darkgrey'}}>{this.state.distanceValue} km</Text>
                </View>
                <View style={styles.slider}>
                    <MultiSlider 
                        min={1}
                        max={30}
                        values={this.state.distanceValue}
                        onValuesChange={val => this.setState({distanceValue: val})}
                        onValuesChangeFinish={val => this.updateUser('distance', val[0])}
                    />
                </View>
                <View style={styles.label}>
                    <Text>Age Range</Text>
                    <Text style={{color: 'darkgrey'}}>{this.state.ageRangeValues.join('-')}</Text>
                </View>
                <View style={styles.slider}>
                    <MultiSlider 
                        min={1}
                        max={100}
                        values={this.state.ageRangeValues}
                        onValuesChange={val => this.setState({ageRangeValues: val})}
                        onValuesChangeFinish={val => this.updateUser('ageRange', val)}
                    />
                </View>
                <View style={styles.switch}>
                    <Text style={styles.label}>Show Men</Text>
                    <Switch 
                        value={showMen}
                        onValueChange={val => {
                            this.setState({showMen:val})
                            this.updateUser('showMen', val)
                        }}
                    />
                </View>
                <View style={styles.switch}>
                    <Text style={styles.label}>Show Women</Text>
                    <Switch 
                        value={showWomen}
                        onValueChange={val => {
                            this.setState({showWomen:val})
                            this.updateUser('showWomen', val)
                        }}
                    />
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
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    slider: {
        marginLeft: 20,
        marginRight: 20,
    },
    switch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    }
})