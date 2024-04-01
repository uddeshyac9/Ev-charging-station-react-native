// import {API_KEY} from '@env'
import axios from 'axios'
const BASE_URL="https://places.googleapis.com/v1/places:searchNearby";
const CLERK_API_KEY = "pk_test_ZmFtb3VzLWdhcmZpc2gtMzkuY2xlcmsuYWNjb3VudHMuZGV2JA";
const API_KEY = "AIzaSyC4P5JuLt114zpMbpTn0yoezIQXrGYxKJs";

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
    API_KEY
 }



