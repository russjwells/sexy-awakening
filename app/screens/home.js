import Expo from 'expo'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Image, StatusBar } from 'react-native';
import * as firebase from 'firebase'
import GeoFire from 'geofire'
import NavigationBar from 'react-native-navbar'
import SideMenu from 'react-native-side-menu'

import Card from '../components/card'
import SimpleScroller from '../components/simpleScroller'
import Profile from './profile'
import Matches from './matches'
import Drawer from './drawer'

import filter from '../modules/filter'

import _ from 'lodash'

import phoenixSymbol from '../../assets/img/phoenix.png'
import phoenixSymbolRed from '../../assets/img/phoenix_red.png'

import { Feather, FontAwesome } from '@expo/vector-icons'

export default class Home extends Component {

  constructor(props){
    super(props)
    //this.child = React.createRef();
  }
  state = {
    profileIndex: 0,
    profiles: [],
    user: this.props.navigation.state.params.user,
    drawer: false,
    activeScreen:0,
  }

  componentWillMount() {
    //alert(this.state.user.toString())
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
    //console.log('drawer state b4 mount:', this.state.drawer)
    
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
    const swipedProfiles = _.merge(swipedSex, swipedRomance, swipedFriendship, swipedPass)
    
    const geoQuery = geoFireRef.query({
      center: userLocation,
      radius: distance, //km
    })
    geoQuery.on('key_entered', async (uid, location, distance) => {
      //console.log(uid + ' at ' + location + ' is ' + distance + 'km from the center')
      const user = await this.getUser(uid)
      //console.log('querying for ' + user.val().first_name)
      const profiles = [...this.state.profiles, user.val()]
      //console.log('profiles', profiles)
      const filtered = filter(profiles, this.state.user, swipedProfiles)
      this.setState({profiles: filtered})
      //this.setState({profiles: profiles})
    })
  }

  updateUserLocation = async (uid) => {
    
    /*
    //demo coords
      const latitude = 37.39239
      const longitude = -122.09072
      const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
      geoFireRef.set(uid, [latitude, longitude])
      console.log('temp coordinates')
    */
    
    
    const {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({enableHighAccuracy: false})
      const {latitude, longitude} = location.coords
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
    //stack hack
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
    //end stack hack
  }

  handleScroll = (currentView) => {
    
    if (currentView==1){
      currentView=0
    }
    if (currentView==-3){
      currentView=-2
    }
    if (currentView != this.state.activeScreen){
      this.setState({activeScreen:currentView})
      //console.log('current view: ' + currentView)
    }
  }
  scrollTo = (view) => {
    //console.log('goto', view)
    this.child.toScreen(view)
    this.setState({activeScreen:view})
    return view
  }

  cardStack = () => {
    const {profileIndex} = this.state
    return(
      <View style={{flex: 1}}>
        {this.state.profiles.slice(profileIndex, profileIndex + 1).reverse().map((profile, i) => {
          //profile index is usually 3 #stackhack
          return (
            <Card 
              key = {profile.id}
              profile = {profile}
              onSwipeOff ={this.nextCard}
              navigation={this.props.navigation}
              user={this.state.user}
              i = {i}
            />
          )
          //alert("card drawn: " + profile.first_name)
        })}
        {this.state.profiles==null && (
          <Text>Out of matches right now! Invite your friends!</Text>
        )}
      </View>
    )
  }

  toggleDrawer = () => {
    const bool = this.state.drawer ? false : true
    this.setState({drawer:bool})
    console.log('drawer toggle:', this.state.drawer)
  }
  drawerChange = (isOpen) => {
    
    //if (isOpen==false) {
    this.setState({drawer:isOpen})
    //}
    //console.log('drawer changed, now:', this.state.drawer)
    //alert(isOpen)
    //console.log('drawer change', isOpen)
  }

  drawerAnimationChange = () => {
    //if (this.state.drawer == true){
    //  this.setState({drawer:false})
    //}
  }
  
  render() {
    return (
      <SideMenu 
        menu={<Drawer isVisible={this.state.drawer} navigation={this.props.navigation}/>} 
        isOpen={this.state.drawer} 
        disableGestures={true} 
        onChange={isOpen => this.drawerChange(isOpen)}
        onAnimaitonComplete={() => this.drawerAnimationChange()}
        autoClosing={false}
      >
        <View style={styles.container}>
          <StatusBar barStyle='dark-content' />
          <View style={styles.navbar}>
            <View style={styles.navleft}>
              {
                this.state.activeScreen==0 && (
                  <TouchableHighlight onPress={() => this.toggleDrawer()}>
                     <Text><Feather name="menu" size={32} color="black" /></Text>
                  </TouchableHighlight>
                )
              }
              {
                this.state.activeScreen!=0 && (
                  <TouchableHighlight onPress={() => this.scrollTo(0)}>
                     <Text><FontAwesome name="user-circle-o" size={32} color="black" /></Text>
                  </TouchableHighlight>
                )
              }
            </View>
            <View style={styles.navcenter}>
              {
                this.state.activeScreen==-1 && (
                  <TouchableHighlight onPress={() => this.scrollTo(-1)}>
                    <View style={styles.navcentertouchable}>
                      <Image source={phoenixSymbolRed} style={{width:40, height:40}} />
                    </View>
                  </TouchableHighlight>
                )
              }
              {
                this.state.activeScreen!=-1 && (
                  <TouchableHighlight onPress={() => this.scrollTo(-1)}>
                  <View style={styles.navcentertouchable}>
                      <Image source={phoenixSymbol} style={{width:34, height:34}} />
                    </View>
                  </TouchableHighlight>
                )
              }
            </View>
            <View style={styles.navright}>
              {
                this.state.activeScreen==-2 && (
                  <TouchableHighlight onPress={() => this.scrollTo(-2)}>
                    <Text><Feather name="users" size={32} color="#e54560" /></Text>
                  </TouchableHighlight>
                )
              }
              {
                this.state.activeScreen!=-2 && (
                  <TouchableHighlight onPress={() => this.scrollTo(-2)}>
                    <Text><Feather name="users" size={32} color="black" /></Text>
                  </TouchableHighlight>
                )
              }
            </View>
          </View>
          <SimpleScroller 
            screens={[
              <Profile navigation={this.props.navigation} user={this.state.user}/>,
              this.cardStack(),
              <Matches navigation={this.props.navigation} user={this.state.user}/>
            ]}
            onScroll={this.handleScroll} 
            bounce={false}
            toScreen={this.scrollTo}
            ref={instance => { this.child = instance; }}
          />
        </View>
      </SideMenu>
      //this.cardStack()
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar:{
    flexDirection: 'row',
    height: 80,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  navleft:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  navcenter:{
    flex: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navcentertouchable:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navright:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  navcenterRight:{
    textAlign: 'center',
    fontWeight: 'bold',
  },
  navcenterText:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black'
  },
  navcenterTextHighlighted:{
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#e54560'
  },
})