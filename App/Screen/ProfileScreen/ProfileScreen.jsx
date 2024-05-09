import { View, Text, Image, Button, StyleSheet,TouchableOpacity } from "react-native";
import React from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { useNavigation } from '@react-navigation/native'


export default function ProfileScreen() {
  const { user  } = useUser();
  const navigation = useNavigation();
  const { isLoaded, signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
    
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.fullName}>{user?.fullName}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <View style={styles.btnContainer}>
     
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>Go to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>Go to Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>

      </View>
     
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background color
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 14,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
    color: "#FFFFFF", // White text color
  },
  email: {
    fontSize: 18,
    marginTop: 5,
    color: "#CCCCCC", // Light gray text color
  },
  signOutButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 30,
    width:'50%',
    alignItems:'center'
   

  },
  signOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnContainer : {
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },   navigationButton: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  navigationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
