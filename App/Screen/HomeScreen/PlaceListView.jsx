import { View, Text, FlatList, Dimensions,StyleSheet } from 'react-native'
import React,{useEffect, useRef} from 'react'
import PlaceItem from './PlaceItem'

export default function PlaceListView ({placeList}) {
    // console.log('NearBy Ev Station',placeList);
    useEffect(()=> {
      scrollToIndex(4)
    },[])
    const flatListRef = useRef(null);
    const getItemLayout=(_,index)=>({
      length:Dimensions.get('window').width,
      offset:Dimensions.get('window').width*index,
      index
    }) 
    const scrollToIndex = (index)=> {
     flatListRef.current?.scrollToIndex({animated:true,index})
    }
  return placeList&&(
    <View >
      <FlatList
      getItemLayout={getItemLayout}
      horizontal={true}
      ref={flatListRef}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={placeList}
      renderItem={({item, index})=> (
        <View key={index} style={ styles.container}>
            <PlaceItem place={item}/>
        </View>
      )}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width, 
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', 
    borderRadius: 10,// Make the item take 100% width
    // Add other styles as needed
  },
});
