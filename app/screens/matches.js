import React, {Component} from 'react'
import {
    FlatList,
    ListView,
    Text,
    View,
} from 'react-native'

import CircleImage from '../components/circleImage'

export default class Matches extends Component {

    state = {
        dataSource: {}
    }

    componentWillMount() {
        this.setState({dataSource:demoProfiles})
    }

    renderItem = ({item}) => {
        const {id, first_name, work} = item
        const bio = (work && work[0] && work[0].position) ? work[0].position.name : null

        return (
            <View style={{flexDirection:'row', backgroundColor:'white', padding:10}} >
                <CircleImage size={80} facebookID={id}/>
                <View style={{justifyContent:'center', marginLeft:10}}>
                    <Text style={{fontSize:18}}>{first_name}</Text>
                    <Text style={{fontSize:15, color:'darkgrey'}}>{bio}</Text>
                </View>
            </View>
        )
    }

    renderSeparator = (sectionID, rowID) => {
        return(
            <View key={rowID} style={{height:1, backgroundColor:'whitesmoke', marginLeft:100}} />
        )
    }
    
    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <FlatList 
                style={{flex:1, backgroundColor: 'white'}}
                data={this.state.dataSource}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={this._keyExtractor}
            />
        )
    }
}

const demoProfiles = [
    {
      id: '259389830744794',
      first_name: 'Candice',
      birthday: '10/18/1986',
      work: [{position:{name:'Supermodel'}}],
    },
    {
      id: '720115413',
      first_name: 'Alessandra',
      birthday: '1/10/1989',
      work: [{position:{name:'Dancer'}}],
    },
    {
      id: '912478262117011',
      first_name: 'Rosie',
      birthday: '9/4/1989',
      work: [{position:{name:'Artist'}}],
    },
    {
      id: '1476279359358140',
      first_name: 'Alissa',
      birthday: '2/11/1990',
      work: [{position:{name:'Comedian'}}],
    },
    {
      id: '173567062703796',
      first_name: 'Kendall',
      birthday: '8/17/1992',
      work: [{position:{name:'Truck Driver'}}],
    },
    {
      id: '169571172540',
      first_name: 'Miranda',
      birthday: '12/12/1983',
      work: [{position:{name:'Doctor'}}],
    },
    {
      id: '1492309647685574',
      first_name: 'Behati',
      birthday: '3/23/1991',
      work: [{position:{name:'Developer'}}],
    },
    {
      id: '662254353934918',
      first_name: 'Anna',
      birthday: '3/23/1989',
      work: [{position:{name:'Personal Trainer'}}],
    },
    {
      id: '424154277777372',
      first_name: 'Gabriella',
      birthday: '3/23/1988',
      work: [{position:{name:'Surfer'}}],
    },
    {
      id: '662720103796952',
      first_name: 'Mara',
      birthday: '3/23/1987',
      work: [{position:{name:'Lifeguard'}}],
    },
  ]