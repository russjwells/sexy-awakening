import Expo from 'expo'
import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase'
import GeoFire from 'geofire'

import Card from '../components/card'
import SimpleScroller from '../components/simpleScroller'

export default class Home extends Component {
  state = {
    profileIndex: 0,
    profiles: [],
    user: this.props.navigation.state.user
  }

  componentWillMount() {
    const {uid} = this.props.navigation.state.params.user
    this.updateUserLocation(uid)
    this.getProfiles(uid)
  }

  getUser = (uid) => {
    return firebase.database().ref('users').child(uid).once('value')
  }

  getProfiles = async (uid) => {
    const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
    const userLocation = await geoFireRef.get(uid)
    console.log('userLocation', userLocation)
    const geoQuery = geoFireRef.query({
      center: userLocation,
      radius: 10 //km
    })
    geoQuery.on('key_entered', async (uid, location, distance) => {
      console.log(uid + ' at ' + location + ' is ' + distance + 'km from the center')
      const user = await this.getUser(uid)
      console.log(user.val().first_name)
      const profiles = [...this.state.profiles, user.val()]
      this.setState({profiles})
    })
  }

  updateUserLocation = async (uid) => {
    const {Permissions, Location} = Expo
    const {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({enableHighAccuracy: false})
      //const {latitude, longitude} = location.coords
      //demo coords
      const latitude = 37.39239
      const longitude = -122.09072
      const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
      geoFireRef.set(uid, [latitude, longitude])
      console.log('Permission Granted', location)
    } else {
      console.log('Permission Denied')
    }
  }

  nextCard = () => {
    this.setState({profileIndex: this.state.profileIndex + 1})
  }

  cardStack = () => {
    const {profileIndex} = this.state
    return(
      <View style={{flex: 1}}>
        {this.state.profiles.slice(profileIndex, profileIndex + 3).reverse().map((profile, i) => {
          return (
            <Card 
              key = {profile.id}
              profile = {profile}
              onSwipeOff ={this.nextCard}
            />
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <SimpleScroller 
      screens={[
        <View style={{flex: 1, backgroundColor:'red'}} />,
        this.cardStack(),
        ]} />
      //this.cardStack()
    )
  }
}
