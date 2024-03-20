import { View, Text, FlatList } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'

export default function PlaceListView ({placeList}) {
    // console.log('NearBy Ev Station',placeList);
  return (
    <View style={{borderRadius:10}}>
      <FlatList
      horizontal={true}
      // pagingEnabled
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