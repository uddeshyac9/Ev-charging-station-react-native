import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import AppMapView from './AppMapView'


export default function HomeScreen() {
  return (
    <View>
   <StatusBar backgroundColor="#3b5998" />
  <AppMapView />
    </View>
  )
}