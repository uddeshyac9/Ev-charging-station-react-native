import { StatusBar } from 'expo-status-bar';
import { useCallback,useEffect,useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen.jsx';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNaviagtion.jsx';
import * as Location from 'expo-location';
import { UserLocationContext } from './App/Context/UserLocationContext.js';
import GlobalApi from './App/Utils/GlobalApi.js';


// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Raleway-Regular': require('./assets/Fonts/Raleway-Regular.ttf'),
    'Raleway-SemiBold': require('./assets/Fonts/Raleway-SemiBold.ttf'),
    'Raleway-Bold': require('./assets/Fonts/Raleway-Bold.ttf'),
  });
  //Default Location
  const [location, setLocation] = useState({
    latitude:'29.6849979',
    longitude:'77.6800181',
  });
  const [errorMsg, setErrorMsg] = useState(null);
 
  useEffect(() => {
    
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log("DENINED")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
     setLocation(location.coords);
      if(!location?.coords)
      {
        setLocation({ 
          latitude:'29.6849979',
          longitude:'77.6800181',
        })
      }
     console.log("--m",location.coords)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }
  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey={GlobalApi.CLERK_API_KEY}>
    <UserLocationContext.Provider 
    value={{location,setLocation}}>
    <View style={styles.container}>
      <SignedIn>
       
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <LoginScreen/>
      </SignedOut>
      
      <StatusBar style="auto" />
    </View>
    </UserLocationContext.Provider>
    </ClerkProvider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:25
  },
});







