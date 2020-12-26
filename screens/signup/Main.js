import React from "react";
import { View, Image, Text, StyleSheet,SafeAreaView, Dimensions } from "react-native";
import MapView, {Marker} from 'react-native-maps';
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar, Icon } from 'react-native-elements';

//path to logo
//the shade of white we are using
const WHITE = "white";

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

export default function Main({navigation}) {

  const [latitude, setLatitude] = React.useState(0.);
  const [longitude, setLongitude] = React.useState(0.);
  const [doneLoading, setDoneLoading] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);
  const [mapView, setMapView] = React.useState(MapView.ref);

  const onRegionChange = (region) => {
    setLatitude (region.latitude)
    setLongitude (region.longitude)
  }
  React.useEffect(() => {
    getCurrentLocation().then(position => {
      if (position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setDoneLoading(true)
      }
  }, []);
});

  const addEntry = () => {
    let latlng = {latitude: latitude, longitude: longitude}
    const eps = 0.007
    setMarkers(markers => 
      [...(markers.filter((e) => (Math.abs(e.latitude - latitude) > eps && Math.abs(e.longitude-longitude) >eps))), latlng])
  }

  if (!doneLoading){
    return null
  } else{
  return (

    <View
      style={{
        backgroundColor: "#BCBFA750",
        height:'100%'
      }}
    >
    <View style={{position:'absolute', zIndex: 100, width:'80%', alignSelf:'center', bottom: 110, left: 290}}>
     <Icon
            raised
            type = "font-awesome"
            name='location-arrow'
            color="grey"
            onPress={()=>mapView.animateToRegion({
              latitude: latitude, 
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,})  }
          />
    </View>

    <View style={{position:'absolute', zIndex: 100, width:'80%', alignSelf:'center', bottom: 40, left: 290}}>
     <Icon
            raised
            type = "font-awesome"
            name='pencil'
            color="grey"
            onPress={()=> addEntry()}  
          />
    </View>


    <View style={{position: 'absolute', justifyContent:'center', paddingHorizontal:'5%', flexDirection:"row", zIndex: 100, paddingVertical: 30}}>
    <Avatar
            size="large"
            rounded
            icon={{name: 'user', color: "grey", type: 'font-awesome'}}
            onPress={()=> navigation.push("account")}
          />
    <View style={{width: '60%'}}/>
    <Avatar
            size="large"
            rounded
            icon={{name: 'book', color: "grey", type: 'font-awesome'}}
            onPress={()=> console.log("modal")}
          />
     </View>
     
     <MapView style={styles.map} 
      initialRegion = {{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      ref = {ref => setMapView(ref)}
      onRegionChangeComplete = {onRegionChange}
      showsUserLocation
      showsBuildings>
       {markers.map((marker, index) => (
        <Marker
      key={index}
      coordinate={marker}
        />
       ))
        }
      </MapView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('screen').width,
    height: 1000,//Dimensions.get('screen').height,
  },
});
