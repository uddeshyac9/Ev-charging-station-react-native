import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <View style={{marginTop:5}}>
      <Text>Your Profile</Text>
      <View
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          // justifyContent: "center",
          alignItems:'center'
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 55, height: 55, borderRadius: 99 }}
        />
      </View>
    </View>
  );
}
