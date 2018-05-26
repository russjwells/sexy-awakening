import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    TouchableHighlight,
} from 'react-native'

import * as firebase from 'firebase'

import CircleImage from '../components/circleImage'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

export default class Settings extends Component {

    state = {
        user: this.props.navigation.state.params.user,
        ageRangeValues: this.props.navigation.state.params.ageRangeValues,
        distanceValue: this.props.navigation.state.params.distanceValue,
        showMen: this.props.navigation.state.params.showMen,
        showWomen: this.props.navigation.state.params.showWomen,
    }

    updateUser = (key, value) => {
        const {uid} = this.state.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }

    render() {
        const {first_name, work, id} = this.state.user
        const {ageRangeValues, distanceValue, showMen, showWomen} = this.state
        const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        return(
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navback}>
                            <Text>Back</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text>Settings</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.filters}>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Filters</Text>
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
                    <View style={styles.interests}>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Interests</Text>
                        </View>
                        <View style={styles.switch}>
                        <Text style={styles.label}>Cannabis</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Alcohol</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Meditation</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Yoga</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Breathwork</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Ritual</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Poly</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Energy Sensitive</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Vegan</Text>
                        <Switch 
                            value={showWomen}
                            onValueChange={val => {
                                this.setState({showWomen:val})
                                this.updateUser('showWomen', val)
                            }}
                        />
                    </View>
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
        flex: 1,
        flexDirection: 'row',
        height: 20,
    },
    navback:{
        flex: 1,
    },
    navlocation:{
        flex: 3,
    },
    content: {
        flex: 10,
    },
    filters:{
        flex: 1,
    },
    interests:{
        flex: 1,
    },
    sectionTitle: {
        backgroundColor: 'black',
    },
    sectionTitleText: {
        color: 'white',
    },
    profile: {
        flex: 1,
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
        marginTop: 10,
    },
    switch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    }
})