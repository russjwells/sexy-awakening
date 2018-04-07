import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

import CircleImage from '../components/circleImage'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

export default class Profile extends Component {
    state = {
        ageRangeValues: [18, 36],
        distanceValue: [4]
    }

    render () {
        const {first_name, work, id} = this.props.user
        const {ageRangeValues, distanceValue} = this.state
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
})