import Expo from 'expo'
import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase'
import GeoFire from 'geofire'

import Card from '../components/card'
import SimpleScroller from '../components/simpleScroller'
import Profile from './profile'
import Matches from './matches'

import filter from '../modules/filter'

import _ from 'lodash'

export default class Home extends Component {
  state = {
    profileIndex: 0,
    profiles: [],
    user: this.props.navigation.state.params.user
  }

  componentWillMount() {
    const {uid} = this.state.user
    this.updateUserLocation(uid)
    firebase.database().ref('users').child(uid).on('value', snap => {
      const user = snap.val()
      this.setState({
        user,
        profiles:[],
        profileIndex:0,
      })
      this.getProfiles(user.uid, user.distance)
    })
    
  }

  getUser = (uid) => {
    return firebase.database().ref('users').child(uid).once('value')
  }

  getSwiped = (uid) => {
    
    const swipedSex = firebase.database().ref('relationships').child(uid).child('sex').once('value').then(snap => snap.val())
    const swipedRomance = firebase.database().ref('relationships').child(uid).child('romance').once('value').then(snap => snap.val())
    const swipedFriendship = firebase.database().ref('relationships').child(uid).child('friendship').once('value').then(snap => snap.val())
    const swipedPass = firebase.database().ref('relationships').child(uid).child('pass').once('value').then(snap => snap.val())
    console.log('swiped sex', {swipedSex})
    const allSwiped = [...swipedSex, ...swipedRomance, ...swipedFriendship, ...swipedPass]
    console.log('all swiped', allSwiped)
    return allSwiped || {}
  }

  getSwipedSex = (uid) => {
    return firebase.database().ref('relationships').child(uid).child('sex')
      .once('value')
      .then(snap => snap.val() || {})
  }
  getSwipedRomance = (uid) => {
    return firebase.database().ref('relationships').child(uid).child('romance')
      .once('value')
      .then(snap => snap.val() || {})
  }
  getSwipedFriendship = (uid) => {
    return firebase.database().ref('relationships').child(uid).child('friendship')
      .once('value')
      .then(snap => snap.val() || {})
  }
  getSwipedPass = (uid) => {
    return firebase.database().ref('relationships').child(uid).child('pass')
      .once('value')
      .then(snap => snap.val() || {})
  }

  getProfiles = async (uid, distance) => {
    const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
    const userLocation = await geoFireRef.get(uid)
    //console.log('userLocation', userLocation)
    const swipedSex = await this.getSwipedSex(uid)
    const swipedRomance = await this.getSwipedRomance(uid)
    const swipedFriendship = await this.getSwipedFriendship(uid)
    const swipedPass = await this.getSwipedPass(uid)
    console.log('swipedSex', swipedSex)
    console.log('swipedRomance', swipedRomance)
    console.log('swipedFriendship', swipedFriendship)
    console.log('swipedPass', swipedPass)
    //const allllofem = Array.concat(swipedSex, swipedRomance, swipedFriendship, swipedPass)
    const swipedProfiles = _.merge(swipedSex, swipedRomance, swipedFriendship, swipedPass)
    //const swipedProfiles = [{...swipedSex}, {...swipedRomance}, {...swipedFriendship}, {...swipedPass}]
    console.log('swipedProfiles', swipedProfiles)
    //console.log('allofem', allllofem)
    
    const geoQuery = geoFireRef.query({
      center: userLocation,
      radius: distance, //km
    })
    geoQuery.on('key_entered', async (uid, location, distance) => {
      console.log(uid + ' at ' + location + ' is ' + distance + 'km from the center')
      const user = await this.getUser(uid)
      console.log('querying for ' + user.val().first_name)
      const profiles = [...this.state.profiles, user.val()]
      //console.log('profiles', profiles)
      const filtered = filter(profiles, this.state.user, swipedProfiles)
      this.setState({profiles: filtered})
      //this.setState({profiles: profiles})
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

  relate = (userUid, profileUid, swipedDirection) => {
    let relationUpdate = {}
    let relation = ""
    if (swipedDirection === 'right'){
      relation = 'sex'
    }
    if (swipedDirection === 'up'){
      relation = 'romance'
    }
    if (swipedDirection === 'left'){
      relation = 'friendship'
    }
    if (swipedDirection === 'down'){
      relation = 'pass'
    }
    relationUpdate[`${userUid}/${relation}/${profileUid}`] = true
    relationUpdate[`${profileUid}/${relation}Back/${userUid}`] = true

    firebase.database().ref('relationships').update(relationUpdate)
  }

  nextCard = (swipedDirection, profileUid) => {
    const userUid = this.state.user.uid
    this.setState({profileIndex: this.state.profileIndex + 1})
    if (swipedDirection === 'right'){
      console.log("hooray sex")
    }
    if (swipedDirection === 'up'){
      console.log("hooray romance")
    }
    if (swipedDirection === 'left'){
      console.log("hooray friendship")
    }
    if (swipedDirection === 'down'){
      console.log("passsssss")
    }
    this.relate(userUid, profileUid, swipedDirection)
    //if (swipedDirection) {
    //  this.relate(userUid, profileUid, true)
    //} else {
    //  this.relate(userUid, profileUid, false)
    //}
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
        <Profile navigation={this.props.navigation} user={this.state.user}/>,
        this.cardStack(),
        <Matches navigation={this.props.navigation} user={this.state.user}/>
        ]} />
      //this.cardStack()
    )
  }
}
