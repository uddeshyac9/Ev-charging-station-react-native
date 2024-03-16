import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import FavoriteScreen from '../Screen/FavoriteScreen/FavoriteScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
import { FontAwesome,AntDesign,MaterialIcons } from '@expo/vector-icons';
import Colors from '../Utils/Colors.js';
const Tab = createBottomTabNavigator();


export default function TabNaviagtion() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
    }}>
    <Tab.Screen name='Home' component={HomeScreen}
    options={{tabBarLabel:'Search', 
    tabBarActiveTintColor:Colors.Green,
            tabBarIcon:({color,size}) => (
                <FontAwesome name="search" size={size} color={color} />
            )}}/>
    <Tab.Screen name='Favorite' component={FavoriteScreen}
     options={{ tabBarLabel:'Favorite', 
     tabBarActiveTintColor:Colors.Green,
             tabBarIcon:({color,size}) => (
                <AntDesign name="heart" size={size} color={color} />
             )}}/>
    <Tab.Screen name='Profile' component={ProfileScreen}
     options={{ tabBarLabel:'Profile', 
     tabBarActiveTintColor:Colors.Green,
             tabBarIcon:({color,size}) => (
                <MaterialIcons name="account-circle" size={size} color={color} />
             )}}/>
    </Tab.Navigator>
  )
}


