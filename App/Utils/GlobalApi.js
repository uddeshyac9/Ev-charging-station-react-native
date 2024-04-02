// import {API_KEY} from '@env'
import axios from 'axios'
const BASE_URL="https://places.googleapis.com/v1/places:searchNearby";
const API_KEY="Your Google Place API Key";
const CLERK_API_KEY='Your Clerk APK Key';
const FIREBASE_API="Your Firebase API Key"
const config = {
    headers: {
        "Content-Type":"application/json",
        "X-Goog-Api-Key": API_KEY,
         "X-Goog-FieldMask":[
            "places.displayName",
         "places.formattedAddress",
         "places.location",
          "places.evChargeOptions",
          "places.shortFormattedAddress",
          "places.photos",'places.id'
           ] 
    }
}
 const NewNearByPlace=(data)=> axios.post(BASE_URL, data, config)
 export default{
    NewNearByPlace,
    CLERK_API_KEY,
    API_KEY,
    FIREBASE_API
 }



