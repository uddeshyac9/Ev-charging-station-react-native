import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import {API_KEY} from '@env'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PlaceItem ({ place }) {
  const PLACE_PHOTO_BASE_URL="https://places.googleapis.com/v1/";
  return (
    <View style={{
        backgroundColor: Colors.WHITE,
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get('screen').width * 0.9
      }}>
          <LinearGradient
          colors={['#FFFFFF','#90EE90', '#FFFFFF' ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
        <Image source={place?.photos?
       {uri:PLACE_PHOTO_BASE_URL+place?.photos[0]?.name+"/media?key="+API_KEY+"&maxHeightPx=800&maxWidthPx=1200"}
         : require('./../../../assets/Images/ev-charging.png')}
          style={{ height: 120, width: '100%',borderRadius:10 }} />
        <View style={{ padding: 5 }}>
          <Text style={{
            fontSize: 15,
            fontFamily: 'Raleway-SemiBold',
            color: Colors.BLACK,
          }}>{place.displayName.text}</Text>
          <Text style={{
            color: Colors.GRAY,
            fontFamily: 'Raleway-SemiBold'
          }}>{place?.shortFormattedAddress}</Text>
        </View>
      
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between',alignItems:'center',padding:10}}>
            <View>    
                 <Text style={{
              fontFamily: 'Raleway-Regular',
              color: Colors.GRAY,
              marginLeft:3
            }}>Connectors :</Text>
            <Text style={{
              // fontFamily: 'Raleway-SemiBold',
              fontSize: 12,
              marginTop:3,
              color: Colors.BLACK,
            //   marginLeft: 5
            }}> {place.evChargeOptions && place.evChargeOptions.connectorCount ? 
                place.evChargeOptions.connectorCount+" Counts" : "Not Known"}</Text></View>
               <View style={{padding: 8, backgroundColor: Colors. PRIMARY,
                borderRadius: 6, paddingHorizontal: 14, }}>
              <FontAwesome5 name="location-arrow" size={24} color="white" />
                     </View>
     
          </View>
          </LinearGradient>
        
      </View>
      
  )
}
