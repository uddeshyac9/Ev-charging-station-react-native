import { View, Text, FlatList } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'

export default function PlaceListView({placeList}) {
    // console.log('NearBy Ev Station',placeList);
  return (
    <View>
      <FlatList
      data={placeList}
      renderItem={({item, index})=> (
        <View>
            <PlaceItem place={item}/>
        </View>
      )}/>
    </View>
  )
}