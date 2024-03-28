import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../Utils/Colors";
import { app } from "../../Utils/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import PlaceItem from "../HomeScreen/PlaceItem";

export default function FavoriteScreen() {
  const [favlist, setFavlist] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    user && getFav();
    // console.log(favlist);
  }, [user]);
  const db = getFirestore(app);
  //get user details
  const { user } = useUser();
  //Get data from firestore
  const getFav = async () => {
    setLoading(true)
    setFavlist([]);
    const q = query(
      collection(db, "ev-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //  console.log(doc.id, " => ", doc.data());
      setFavlist((favlist) => [...favlist, doc.data()]);
    });
    setLoading(false)
  };

  return (
    <View>
      <Text
        style={{ padding: 10, fontFamily: "Raleway-SemiBold", fontSize: 30 }}
      >
        My Favorite <Text style={{ color: Colors.PRIMARY }}>Place </Text>
      </Text>
      {!favlist ? (
        <View
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          <Text style={{ fontFamily: "Raleway-SemiBold", marginTop: 5 }}>
            Loading...
          </Text>
        </View>
      ) : null}
      <View>
        {favlist && (
          <FlatList
          onRefresh={()=> getFav()}
          refreshing={loading}
            data={favlist}
            renderItem={({ item, index }) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <PlaceItem
                  place={item.place}
                  isfav={true}
                  markedFav={() => getFav()}
                />
              </View>
            )}
            keyExtractor={(item) => item.place.id.toString()}// Provide a unique key extractor
            contentContainerStyle={{ paddingBottom: 150 }} // Add padding to the bottom to make space for the empty view
          />
        )}
      </View>
     
     
    </View>
  );
}
