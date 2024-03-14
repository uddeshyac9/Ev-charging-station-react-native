import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen.jsx';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNaviagtion from './App/Navigations/TabNaviagtion.jsx';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


export default function App() {
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
  const [fontsLoaded, fontError] = useFonts({
    'Raleway-Regular': require('./assets/Fonts/Raleway-Regular.ttf'),
    'Raleway-SemiBold': require('./assets/Fonts/Raleway-SemiBold.ttf'),
    'Raleway-Bold': require('./assets/Fonts/Raleway-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={"pk_test_ZmFtb3VzLWdhcmZpc2gtMzkuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
    <View style={styles.container} onLayout={onLayoutRootView}>
    <SignedIn>
          <NavigationContainer>
            <TabNaviagtion/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <LoginScreen/>
        </SignedOut>
      
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:30
 
     
  },
});