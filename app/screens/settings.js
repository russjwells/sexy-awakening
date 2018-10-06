import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Switch,
    TouchableHighlight,
} from 'react-native'

import * as firebase from 'firebase'

import CircleImage from '../components/circleImage'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Feather } from '@expo/vector-icons'

export default class Settings extends Component {

    state = {
        user: this.props.navigation.state.params.user,
        ageRangeValues: this.props.navigation.state.params.ageRangeValues,
        distanceValue: this.props.navigation.state.params.user.distanceValue,
        immediacyValue: this.props.navigation.state.params.user.immediacyValue,
        sexuality: this.props.navigation.state.params.user.sexuality,
        romance: this.props.navigation.state.params.user.romance,
        friendship: this.props.navigation.state.params.user.friendship,
        approachable: this.props.navigation.state.params.user.approachable,
        visible: this.props.navigation.state.params.user.visible,
        showMen: this.props.navigation.state.params.user.showMen,
        showWomen: this.props.navigation.state.params.user.showWomen,
        showNonbinary: this.props.navigation.state.params.user.showNonbinary,
        showTransmen: this.props.navigation.state.params.user.showTransmen,
        showTranswomen: this.props.navigation.state.params.user.showTranswomen,
        showGroups: this.props.navigation.state.params.user.showGroups,
    }

    updateUser = (key, value) => {
        const {uid} = this.state.user
        firebase.database().ref('users').child(uid)
        .update({[key]:value})
    }
    logout = () => {
        firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        const {first_name, work, id} = this.state.user
        const {ageRangeValues, distanceValue, showMen, showWomen, showNonbinary, showTransmen, showTranswomen, showGroups, approachable, visible, sexuality, romance, friendship} = this.state
        const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
        return(
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableHighlight style={styles.navback} onPress={() => this.props.navigation.navigate('Home', {user: this.props.navigation.state.params.user})}>
                        <View style={styles.navback}>
                            <Text><Feather name="arrow-left" size={32} color="black" /></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.navlocation}>
                        <Text style={styles.navtext}>SETTINGS</Text>
                    </View>
                    <View style={styles.navright}>
                        
                    </View>
                </View>
                <ScrollView style={styles.content}>
                    <View style={styles.filters}>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Where</Text>
                        </View>
                        <View style={styles.label}>
                            <Text>Distance</Text>
                            <Text style={{color: 'darkgrey'}}>{this.state.distanceValue} km</Text>
                        </View>
                        <View style={styles.slider}>
                            <MultiSlider 
                                min={1}
                                max={200}
                                values={[this.state.distanceValue]}
                                onValuesChange={val => this.setState({distanceValue: val})}
                                onValuesChangeFinish={val => this.updateUser('distance', val[0])}
                            />
                        </View>
                        <View style={styles.label}>
                            <Text>Location</Text>
                            <Text style={{color: 'darkgrey'}}>{this.state.distanceValue} km from here.</Text>
                        </View>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>Who</Text>
                        </View>
                        <View style={styles.label}>
                            <Text>Age Range</Text>
                            <Text style={{color: 'darkgrey'}}>{this.state.ageRangeValues.join('-')}</Text>
                        </View>
                        <View style={styles.slider}>
                            <MultiSlider 
                                min={18}
                                max={144}
                                values={this.state.ageRangeValues}
                                onValuesChange={val => this.setState({ageRangeValues: val})}
                                onValuesChangeFinish={val => this.updateUser('ageRange', val)}
                            />
                        </View>
                        <View style={styles.switch}>
                            <Text style={styles.label}>Men</Text>
                            <Switch 
                                value={showMen}
                                onValueChange={val => {
                                    this.setState({showMen:val})
                                    this.updateUser('showMen', val)
                                }}
                            />
                        </View>
                        <View style={styles.switch}>
                            <Text style={styles.label}>Women</Text>
                            <Switch 
                                value={showWomen}
                                onValueChange={val => {
                                    this.setState({showWomen:val})
                                    this.updateUser('showWomen', val)
                                }}
                            />
                        </View>
                        <View style={styles.switch}>
                            <Text style={styles.label}>Nonbinary</Text>
                            <Switch 
                                value={showNonbinary}
                                onValueChange={val => {
                                    this.setState({showNonbinary:val})
                                    this.updateUser('showNonbinary', val)
                                }}
                            />
                        </View>
                        <View style={styles.switch}>
                            <Text style={styles.label}>Transmen</Text>
                            <Switch 
                                value={showTransmen}
                                onValueChange={val => {
                                    this.setState({showTransmen:val})
                                    this.updateUser('showTransmen', val)
                                }}
                            />
                        </View>
                        <View style={styles.switch}>
                            <Text style={styles.label}>Transwomen</Text>
                            <Switch 
                                value={showTranswomen}
                                onValueChange={val => {
                                    this.setState({showTranswomen:val})
                                    this.updateUser('showTranswomen', val)
                                }}
                            />
                        </View>
                        <View style={styles.switch}>
                            <Text style={styles.label}>Groups</Text>
                            <Switch 
                                value={showGroups}
                                onValueChange={val => {
                                    this.setState({showGroups:val})
                                    this.updateUser('showGroups', val)
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>What</Text>
                    </View>
                    <View style={styles.label}>
                        <Text>Immediacy</Text>
                        <Text style={{color: 'darkgrey'}}>{this.state.immediacyValue} %</Text>
                    </View>
                    <View style={styles.slider}>
                        <MultiSlider 
                            min={0}
                            max={100}
                            values={[this.state.immediacyValue]}
                            onValuesChange={val => this.setState({immediacyValue: val})}
                            onValuesChangeFinish={val => this.updateUser('immediacy', val[0])}
                        />
                    </View>
                    <View style={styles.label}>
                        <Text>Sexuality</Text>
                        <Text style={{color: 'darkgrey'}}>{this.state.sexuality} %</Text>
                    </View>
                    <View style={styles.slider}>
                        <MultiSlider 
                            min={0}
                            max={100}
                            values={[this.state.sexuality]}
                            onValuesChange={val => this.setState({sexuality: val})}
                            onValuesChangeFinish={val => this.updateUser('sexuality', val[0])}
                        />
                    </View>
                    <View style={styles.label}>
                        <Text>Romance</Text>
                        <Text style={{color: 'darkgrey'}}>{this.state.romance} %</Text>
                    </View>
                    <View style={styles.slider}>
                        <MultiSlider 
                            min={0}
                            max={100}
                            values={[this.state.romance]}
                            onValuesChange={val => this.setState({romance: val})}
                            onValuesChangeFinish={val => this.updateUser('romance', val[0])}
                        />
                    </View>
                    <View style={styles.label}>
                        <Text>Friendship</Text>
                        <Text style={{color: 'darkgrey'}}>{this.state.friendship} %</Text>
                    </View>
                    <View style={styles.slider}>
                        <MultiSlider 
                            min={0}
                            max={100}
                            values={[this.state.friendship]}
                            onValuesChange={val => this.setState({friendship: val})}
                            onValuesChangeFinish={val => this.updateUser('friendship', val[0])}
                        />
                    </View>
                    <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>You</Text>
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Approachable</Text>
                        <Switch 
                            value={approachable}
                            onValueChange={val => {
                                this.setState({approachable:val})
                                this.updateUser('approachable', val)
                            }}
                        />
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.label}>Visible</Text>
                        <Switch 
                            value={visible}
                            onValueChange={val => {
                                this.setState({visible:val})
                                this.updateUser('visible', val)
                            }}
                        />
                    </View>
                </ScrollView>
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
        flex: 0,
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
        flex:1
    },
    navtext:{
        textAlign: 'center',
        fontWeight: 'bold',
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
        backgroundColor: 'white',
        marginBottom: 10,
    },
    sectionTitleText: {
        color: '#e54560',
        padding: 20,
        fontWeight:'bold'
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
        marginLeft: 10,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    subscription: {
        flex: 0,
        height:100,
        backgroundColor: '#e54560',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:1,
    },
    subscriptionButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subsexpander: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subscriptionText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})