import React, {Component} from 'react'
import {Image} from 'react-native'
import axios from 'axios'
import seedBlk from '../../assets/img/seedoflife_black.png'

export default class SquareAvatar extends Component {
    state = {
        uid : this.props.uid,
        picName : this.props.pic,
        picture: null
    }

    componentDidMount() {
        this.getPic() 
    }

    getPic = async () => {
        const url = `https://qpfa7ske9k.execute-api.us-west-1.amazonaws.com/sexy-awakening-beta-3/photo?uid=${this.props.uid}&pic=${this.props.pic}`;
        const res = await axios.get(url)
        //console.log(res)
        //console.log(res.data)
        const img = `data:image/jpg;base64,${res.data}`
        this.setState({picture: img})
    }


    render() {
        const {size, uid} = this.props
        //console.log('uid '+uid)
        if (this.state.picture!=null){
            return(
                <Image 
                source={{uri: this.state.picture}}
                style={{width: size, height: size}}
                />
            )
        }else{
            return(
                <Image 
                    source={seedBlk}
                    style={{width: size, height: size}}
                />
            )
        }
    }
}