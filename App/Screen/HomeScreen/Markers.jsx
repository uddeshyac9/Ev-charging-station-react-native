import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import Colors from '../../Utils/Colors'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function Markers({index, place }) {
   
  const {selectedMarker,setSelectedMarker}=useContext(SelectMarkerContext);
  return place && (

    <Marker
      coordinate={{
        latitude: place.location?.latitude,
        longitude: place.location?.longitude
      }}

      onPress={()=>setSelectedMarker(index)}
    >
           
           {selectedMarker === index ? (
  <Image
    source={require('./../../../assets/Images/marker-selected.png')}
    style={{
      width: 50, height: 50,objectFit:'contain', borderRadius:50 ,
      zIndex: 5,
    }}
  />
) : (
  <Image
    source={require('./../../../assets/Images/ev-marker.png')}
    style={{
      width: 50, height: 50,objectFit:'contain', borderRadius:50 ,
      zIndex: -1,
    }}
  />
)}

     

    </Marker>
   
   
  )
}

