import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppMapView from "./AppMapView";
import Header from "./Header.jsx";
import SearchBar from "./SearchBar.jsx";
import { UserLocationContext } from "../../Context/UserLocationContext";
import GlobalApi from "../../Utils/GlobalApi.js";
import PlaceListView from "./PlaceListView";

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  useEffect(() => {
   location&&GetNearByPlace();
  }, [location]);
  const [placeList,setPlaceList] = useState()

  const GetNearByPlace = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 10,
      "locationRestriction": {
      "circle": {
      "center": {
      "latitude": location?.latitude,
      "longitude": location?.longitude
      },
      "radius": 50000.0
      }
      }
    }
    GlobalApi.NewNearByPlace(data)
      .then((resp) => {
        if (resp) {
          setPlaceList(resp.data?.places);
        } else {
          console.error(
            "Error fetching nearby places: Response data is undefined"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching nearby places:", error);
      });
  };

  return (
    <View>
      {/* <StatusBar backgroundColor="#3b5998" /> */}
      <View style={styles.headerContainer}>
        <Header />
        <SearchBar
          searchedLocation={(location) => {
            // setLocation(location)
            console.log(location);
          }}
        />
      </View>
      <View>
        <AppMapView />
        <View style={styles.placeListContainer}>
       {placeList&& <PlaceListView placeList={placeList}/>}  
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 10,
    width: "100%",
    paddingHorizontal: 20,
  }, placeListContainer: {
    position:'absolute',
    zIndex:10,
    bottom:0,
    width:'100%'
  }
});
