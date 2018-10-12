import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, PanResponder, Animated, Dimensions, TouchableHighlight } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import seedBlk from '../../assets/img/seedoflife_black.png'
import SquareAvatar from '../components/squareAvatar'
import { Feather } from '@expo/vector-icons'

const {width, height} = Dimensions.get('window')

export default class Card extends Component {

  state = {
    picture: null,
    profile: this.props.profile
  }
  componentWillMount() {
    this.pan = new Animated.ValueXY();
    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: Animated.event([
        null,
        {dx:this.pan.x, dy:this.pan.y},
      ]),
      onPanResponderRelease: (e, {dx, dy}) => {
        const absDx = Math.abs(dx)
        const absDy = Math.abs(dy)
        let saDirection = "undefined"
        let exitVelocity = [0,0]
        let limitPass = false
        const swipeLimiter = 120
        console.log('card moved: '+dx +', '+dy );
        
        if (absDx > absDy){
          if (dx > 0){
            saDirection="right"
            exitVelocity=[3,0]
          }
          if (dx < 0){
            saDirection="left"
            exitVelocity=[-3,0]
          }
          if (Math.abs(dx) > swipeLimiter){
            limitPass = true
          }
        }
        if (absDy > absDx){
          if (dy > 0){
            saDirection="down"
            exitVelocity=[0,3]
          }
          if (dy < 0){
            saDirection="up"
            exitVelocity=[0,-3]
          }
          if (Math.abs(dy) > swipeLimiter){
            limitPass = true
          }
        }
        console.log("swipe: " + saDirection)
        const swipedDirection = saDirection

        const xdirection = absDx / dx
        const ydirection = absDy / dy
        //const swipedRight = direction > 0
        if (limitPass) {
            Animated.decay(this.pan, {
                velocity: {x:5 * xdirection, y:5 * ydirection},
                deceleration: 0.0995,
            }).start(() => this.props.onSwipeOff(swipedDirection, this.props.profile.uid))
        } else {
            Animated.spring(this.pan, {
                toValue: {x:0, y:0},
                friction: 4.5,
                }).start()
        }
      },
    })
    //console.log('card pan responder created');
  }
  componentDidMount() {
    this.getPic()
  }

  getPic = async () => {
    console.log("getting card pic: "+ this.props.profile.picture + " for " + this.props.profile.first_name + ", card " + this.props.i)
    const url = `https://qpfa7ske9k.execute-api.us-west-1.amazonaws.com/sexy-awakening-beta-3/photo?uid=${this.props.profile.uid}&pic=${this.props.profile.picture}`;
    console.log(url)
    const res = await axios.get(url)
    //console.log(res)
    //console.log(res.data)
    const img = `data:image/jpg;base64,${res.data}`
    this.setState({picture: img})
}

  render() {
    const {birthday, first_name, work, id, uid, picture} = this.props.profile
    //console.log("pic and uid: "+picture + ", "+uid)
    const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
    const profileImage = this.state.picture
    const profileBday = moment(birthday, 'MM/DD/YYYY')
    const profileAge = moment().diff(profileBday, 'years')

    const rotateCard = this.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['10deg', '0deg', '-10deg'],
    })
    const animatedStyle = {
      transform: [
        {translateX: this.pan.x},
        {translateY: this.pan.y},
        {rotate: rotateCard},
      ],
    }
    return (
      <Animated.View 
      {...this.cardPanResponder.panHandlers}
      style={[styles.card, animatedStyle]}>
        {
          this.state.picture ? 
          <ImageBackground
            style={{flex: 1, height: undefined, width: undefined, justifyContent: 'flex-end'}}
            source={{uri: profileImage}}
            resizeMode="cover"
          >
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('ViewProfile', {user: this.props.user, profile: this.props.profile})}
            >
              <View style={{margin: 14, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{fontSize: 20, color:'white', fontWeight: 'bold'}}>{first_name}, {profileAge}</Text>
                  {bio ? <Text style={{fontSize: 15, color:'darkgrey'}}>{bio}</Text> : <View />}
                </View>
                <View>
                  <Feather name="eye" size={36} color="white" />
                </View>
              </View>
            </TouchableHighlight>
          </ImageBackground> :
          <ImageBackground
            style={{flex: 1, height: undefined, width: undefined, justifyContent: 'flex-end'}}
            source={seedBlk}
            resizeMode="cover"
          >
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('ViewProfile', {user: this.props.user, profile: this.props.profile})}
            >
              <View style={{margin: 14, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{fontSize: 20, color:'black', fontWeight: 'bold'}}>{first_name}, {profileAge}</Text>
                  {bio ? <Text style={{fontSize: 15, color:'darkgrey'}}>{bio}</Text> : <View />}
                </View>
                <View>
                  <Feather name="eye" size={36} color="black" />
                </View>
              </View>
            </TouchableHighlight>
          </ImageBackground>
        }
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: 'white',
    width: width-20,
    height: height * 0.8,
    top: (height * 0.1) / 2, 
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
})
