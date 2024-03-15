import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect } from 'react'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewStyle from './../../Utils/MapViewStyle.json'
import { UserLocationContext } from '../../Context/UserLocationContext';

export default function AppMapView() {
  const {location,setLocation} =useContext(UserLocationContext);
  useEffect(()=> {
    console.log(location);
  },[])
  return location?.latitude &&(
    <View>
       <MapView style={styles.map} provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle} 
        region={{
          latitude: location.latitude,
          longitude: location.longitude, // Use correct longitude
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421
          }}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });