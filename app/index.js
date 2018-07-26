import {StackNavigator} from 'react-navigation'
import * as firebase from 'firebase'
import Home from './screens/home'
import Login from './screens/login'
import Chat from './screens/chat'
import Settings from './screens/settings'
import EditProfile from './screens/editProfile'
import Subscription from './screens/subscription'
import Subscription2 from './screens/subscription2'
import DeepProfile from './screens/deepProfile'
import YourProfile from './screens/yourProfile'
import ViewProfile from './screens/viewProfile'
import About from './screens/about'

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
    Settings: {screen:Settings},
    EditProfile: {screen:EditProfile},
    Subscription: {screen:Subscription},
    Subscription2: {screen:Subscription2},
    ViewProfile: {screen:ViewProfile},
    YourProfile: {screen:YourProfile},
    About: {screen:About}

}
const StackNavigatorConfig = {
    headerMode: 'none'
}

export default StackNavigator(RouteConfigs, StackNavigatorConfig)