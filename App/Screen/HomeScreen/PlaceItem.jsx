import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  StyleSheet,
  Platform,
  Linking,
} from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { API_KEY } from "@env";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore } from "firebase/firestore";
import { app } from "../../Utils/FirebaseConfig";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceItem({ place, isfav, markedFav }) {
  const { user } = useUser();
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

  // Initialize Cloud Firestore and get a reference to the service
  const onDirectionClick = () => {
    const latitude = place?.location?.latitude;
    const longitude = place?.location?.longitude;
    const displayName = encodeURIComponent(place?.displayName?.text);
  
    let url;
    if (Platform.OS === 'ios') {
      // Apple Maps URL
      url = `maps://maps.apple.com/?q=${latitude},${longitude}&name=${displayName}`;
    } else {
      // Google Maps URL
      url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${place.id}`;
    }
  
    Linking.openURL(url);
  }
  
  const db = getFirestore(app);
  const onSetFav = async (place) => {
    // Add a new document in collection "ev-fav-place"
    await setDoc(doc(db, "ev-fav-place", place.id.toString()), {
      place: place,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    markedFav();
    ToastAndroid.show("Fav Ev Station Added!", ToastAndroid.TOP);
  };

  const onDeleteFav = async (placeId) => {
    await deleteDoc(doc(db, "ev-fav-place", place.id.toString()));
    markedFav();
    ToastAndroid.show("Fav Ev Station Removed!", ToastAndroid.TOP);
  };
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        margin: 5,
        width: Dimensions.get("screen").width * 0.95,
      }}
    >
      <LinearGradient
        colors={["#FFFFFF", "#90EE90", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        {!isfav ? (
          <Pressable style={styles.favbutton} onPress={() => onSetFav(place)}>
            <Ionicons name="heart-outline" size={30} color="white" />
          </Pressable>
        ) : (
          <Pressable
            style={styles.favbutton}
            onPress={() => onDeleteFav(place.id)}
          >
            <AntDesign name="heart" size={30} color="red" />
          </Pressable>
        )}

        <Image
          source={
            place?.photos
              ? {
                  uri:
                    PLACE_PHOTO_BASE_URL +
                    place?.photos[0]?.name +
                    "/media?key=" +
                    API_KEY +
                    "&maxHeightPx=800&maxWidthPx=1200",
                }
              : require("./../../../assets/Images/ev-charging.png")
          }
          style={{ height: 130, width: "100%", borderRadius: 10 }}
        />

        <View style={{ padding: 5 }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Raleway-SemiBold",
              color: Colors.BLACK,
            }}
          >
            {place.displayName.text}
          </Text>

          <Text
            style={{
              color: Colors.GRAY,
              fontFamily: "Raleway-SemiBold",
            }}
          >
            {place?.shortFormattedAddress}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Raleway-Regular",
                color: Colors.GRAY,
                marginLeft: 3,
              }}
            >
              Connectors :
            </Text>
            <Text
              style={{
                // fontFamily: 'Raleway-SemiBold',
                fontSize: 12,
                marginTop: 3,
                color: Colors.BLACK,
                //   marginLeft: 5
              }}
            >
              {" "}
              {place.evChargeOptions && place.evChargeOptions.connectorCount
                ? place.evChargeOptions.connectorCount + " Counts"
                : "Not Known"}
            </Text>
          </View>
          <Pressable
            style={styles.dirButton}
            onPress={() => onDirectionClick()}
          >
            <FontAwesome5 name="location-arrow" size={24} color="white" />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  favbutton: {
    position: "absolute",
    right: 0,
    margin: 5,
    zIndex: 10,
  },
  dirButton: {
    padding: 8,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 6,
    paddingHorizontal: 14,
  },
});
