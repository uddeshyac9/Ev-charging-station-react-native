import { View, Text,StyleSheet,TouchableOpacity} from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Colors from "../../Utils/Colors";
import { FontAwesome } from '@expo/vector-icons';
import GlobalApi from "../../Utils/GlobalApi";

// import {API_KEY} from '@env'


export default function SearchBar({searchedLocation}) {
  

 
 
  return (
    <View style={styles.container}>
        <FontAwesome name="map-marker" size={24} color={Colors.GRAY} style={{paddingTop:10}} />
       
      <GooglePlacesAutocomplete
        placeholder="Search Ev Charging Station"
        enablePoweredByContainer={false}
        fetchDetails={true}
        
        
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(data, details);
          searchedLocation(details?.geometry?.location)
         
          
        }}
        query={{
          key: GlobalApi.API_KEY,
          language: "en",
        }}
       

        
        />   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    
  },
});
