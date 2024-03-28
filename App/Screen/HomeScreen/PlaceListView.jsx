import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PlaceItem from "./PlaceItem";
import { getFirestore } from "firebase/firestore";
import { app } from "../../Utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceListView({ placeList }) {
  // console.log('NearBy Ev Station',placeList);


  const [favlist, setFavlist] = useState([])

  useEffect(()=> {
    user&&getFav()
    // console.log(favlist);
  },[user])
  const db = getFirestore(app);
  //get user details
  const {user} = useUser()
  //Get data from firestore
  const getFav = async () => {
    setFavlist([])
    const q = query(collection(db, "ev-fav-place"), where("email", "==", user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    //  console.log(doc.id, " => ", doc.data());
      setFavlist(favlist=> [...favlist,doc.data()]);
      
    });
  };

const isfav = (place) => {
 const result= favlist.find(item=> item.place.id == place.id);
//  console.log(result);
   return result?true:false;
}



  useEffect(() => {
    scrollToIndex(4);
  }, []);
  const flatListRef = useRef(null);
  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });
  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };



  return (
    placeList && (
      <View>
        <FlatList
          getItemLayout={getItemLayout}
          horizontal={true}
          ref={flatListRef}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={placeList}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.container}>
              <PlaceItem place={item}  isfav={isfav(item)} markedFav={()=> getFav()}/>
            </View>
          )}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center", // Center content horizontally
    justifyContent: "center",
    borderRadius: 10, // Make the item take 100% width
    // Add other styles as needed
  },
});
