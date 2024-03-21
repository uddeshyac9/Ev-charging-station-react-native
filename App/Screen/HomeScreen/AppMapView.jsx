
import { StyleSheet, View,Image } from 'react-native';
import React, { useContext, useEffect,useState } from 'react'

import MapViewStyle from './../../Utils/MapViewStyle.json'
import { UserLocationContext } from '../../Context/UserLocationContext';
import  MapView,{Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Markers from './Markers.jsx';

export default function AppMapView({placeList}) {
  
  const {location,setLocation} =useContext(UserLocationContext);
  const [currentLocation, setCurrentLocation] = useState(null);


  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      setCurrentLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [location]);

  return location?.latitude &&(
    <View>
       <MapView style={styles.map} provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle} 
        region={{
          latitude: location?.latitude,
          longitude: location?.longitude, // Use correct longitude
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
          }}> 
     {location?    
      <Marker 
  coordinate={{
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
  }}
  title="Current Location"
  description="You are here"
>
  <Image
    source={require('./../../../assets/Images/car-marker.jpg')}
    style={{ width: 50, height: 50,objectFit:'contain', borderRadius:50 }} // Adjust width and height as needed
  />
</Marker>: null}
{placeList&&placeList.map ( ((item, index)=>
<Markers key={index} place={item} index={index}/>
))
}
      </MapView>
    </View>
  )}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });