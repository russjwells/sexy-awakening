import React, {Component} from 'react'
import {Image, PixelRatio} from 'react-native'
import axios from 'axios'

export default class ProfilePicture extends Component {

    state = {
        uid : this.props.uid,
        picture: null
    }

    componentDidMount() {
        this.getPic()
        
    }

    getPic = async () => {
        // Create the config object for the GET
        const config = {
            method: 'GET',
            headers: {
                Accept : 'image/jpeg',
                'Content-Type': 'image/jpeg',
            },
            //body: {}
        };

        const url = 'https://qpfa7ske9k.execute-api.us-west-1.amazonaws.com/sexy-awakening-beta-2/getprofilepicture';
        const res = await axios.get(url)
        console.log(res)
        console.log(res.data)
        const img = `data:image/jpg;base64,${res.data}`
        this.setState({picture: img})
    }

    

    render() {
        const {size, uid, } = this.props
        const imageSize = PixelRatio.getPixelSizeForLayoutSize(size)
        const fbImage = `https://graph.facebook.com/${null}/picture?height=${imageSize}`
        console.log('uid '+uid)
        return(
            <Image 
            source={{uri: this.state.picture}}
            style={{width: size, height: size}}
            />
        )
    }
}