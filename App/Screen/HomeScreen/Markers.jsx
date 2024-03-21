import { View, Text, Image} from 'react-native'
import React, { useEffect } from 'react'
import  MapView,{Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import PlaceItem from './PlaceItem';

export default function Markers({place,index}) {
   
  return place&&(
    <View>
          <Marker 
  coordinate={{
    latitude: place.location?.latitude,
    longitude: place.location?.longitude,
  }} 
  onPress={()=>{console.log("Marker Index",index);}}
  title="EV Charging Station"
  description="You are here" >
  <Image
    source={require('./../../../assets/Images/ev-marker.png')}
    style={{ width: 35, height: 35,borderRadius:99,objectFit:'contain' }}
  /> 
  
</Marker>
  
    </View>
  )
}

