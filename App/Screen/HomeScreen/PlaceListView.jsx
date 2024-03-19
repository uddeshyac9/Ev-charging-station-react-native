import { View, Text, FlatList } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'

export default function PlaceListView ({placeList}) {
    // console.log('NearBy Ev Station',placeList);
  return (
    <View>
      <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={placeList}
      renderItem={({item, index})=> (
        <View key={index}>
            <PlaceItem place={item}/>
        </View>
      )}/>
    </View>
  )
}