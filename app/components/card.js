import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, PanResponder, Animated, Dimensions } from 'react-native';
import moment from 'moment'

const {width, height} = Dimensions.get('window')

export default class Card extends Component {
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
        let limitPass = false
        const swipeLimiter = 120
        console.log('card moved: '+dx +', '+dy );
        
        if (absDx > absDy){
          if (dx > 0){
            saDirection="right"
          }
          if (dx < 0){
            saDirection="left"
          }
          if (Math.abs(dx) > swipeLimiter){
            limitPass = true
          }
        }
        if (absDy > absDx){
          if (dy > 0){
            saDirection="down"
          }
          if (dy < 0){
            saDirection="up"
          }
          if (Math.abs(dy) > swipeLimiter){
            limitPass = true
          }
        }
        console.log("swipe: " + saDirection)
        const swipedDirection = saDirection

        const direction = absDx / dx
        const swipedRight = direction > 0
        if (limitPass) {
            Animated.decay(this.pan, {
                velocity: {x:3 * direction, y:0},
                deceleration: 0.995,
            }).start(() => this.props.onSwipeOff(swipedDirection, this.props.profile.uid))
        } else {
            Animated.spring(this.pan, {
                toValue: {x:0, y:0},
                friction: 4.5,
                }).start()
        }
      },
    }),
    console.log('card pan responder created');
  }

  render() {
    const {birthday, first_name, work, id} = this.props.profile
    const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
    const fbImage = `https://graph.facebook.com/${id}/picture?height=500`
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
        <Image
          style={{flex: 1}}
          source={{uri: fbImage}}
        />
        <View style={{margin: 20}}>
          <Text style={{fontSize: 20}}>{first_name}, {profileAge}</Text>
          {bio ? <Text style={{fontSize: 15, color:'darkgrey'}}>{bio}</Text> : <View />}
        </View>
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
    height: height * 0.7,
    top: (height * 0.3) / 2, 
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
})
