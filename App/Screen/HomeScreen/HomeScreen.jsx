import { View, Text, StatusBar,StyleSheet} from 'react-native'
import React from 'react'
import AppMapView from './AppMapView'
import Header from './Header.jsx'
import SearchBar from './SearchBar.jsx'


export default function HomeScreen() {
  return (
    <View>
   {/* <StatusBar backgroundColor="#3b5998" /> */}
   <View style={styles.headerContainer}>
   <Header/>
   <SearchBar/>
   </View>
   <View>
   <AppMapView />
   </View>
  
  
    </View>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    position:'absolute',
    zIndex:10,
    padding:10,
    width:'100%',
    paddingHorizontal:20,
    

  }
})