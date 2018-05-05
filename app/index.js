import {StackNavigator} from 'react-navigation'
import * as firebase from 'firebase'
import Home from './screens/home'
import Login from './screens/login'
import Chat from './screens/chat'

const firebaseConfig = {
  apiKey: "AIzaSyDg4fI6UyL6hYvDHwELQ75pjwspQW8_kDA",
  databaseURL: "https://clone-tinder-137.firebaseio.com",
}

const sexyawakeningFirebaseConfig = {
  apiKey: "AIzaSyAdxY6JsatQhYxlegoI-7Of6isVs6Fk1Vk",
  databaseURL: "https://sexy-awakening.firebaseio.com",
}

firebase.initializeApp(sexyawakeningFirebaseConfig)

const RouteConfigs = {
    Login: {screen:Login},
    Home: {screen:Home},
    Chat: {screen:Chat},
}
const StackNavigatorConfig = {
    headerMode: 'none'
}

export default StackNavigator(RouteConfigs, StackNavigatorConfig)