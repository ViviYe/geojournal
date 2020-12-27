import React from "react";
import MapView, {Marker} from 'react-native-maps';
import { View, Image, Text, StyleSheet,SafeAreaView, Dimensions, Modal, TouchableWithoutFeedback, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, InputAccessoryView, Button} from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar, Icon } from 'react-native-elements';
import { addJournalEntry, viewEntriesAtCoord } from '../../api/API';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

export default function Main({navigation}) {
  const inputAccessoryViewID = 'submit';
  const [latitude, setLatitude] = React.useState(0.);
  const [longitude, setLongitude] = React.useState(0.);
  const [doneLoading, setDoneLoading] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);
  const [mapView, setMapView] = React.useState(MapView.ref);
  const [writeJournal, setWriteJournal] = React.useState(false);
  const [readJournal, setReadJournal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  
  const onRegionChange = (region) => {
    setLatitude (region.latitude)
    setLongitude (region.longitude)
  }

  const round = (num) => {
    return Number.parseFloat(num).toFixed(3)
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

  const addEntry = async () => {
    setWriteJournal(false)
    const roundedlat = Number(round(latitude))
    const roundedlong = Number(round(longitude))
    await addJournalEntry(roundedlat, roundedlong, title, description);
    let latlng = {latitude: roundedlat, longitude: roundedlong}
    setMarkers(markers => 
      [...(markers.filter((e) => e.latitude != roundedlat && e.longitude!=roundedlong)), latlng])

  }

  const viewEntries = async (marker) => {
    setReadJournal(true)
    viewEntriesAtCoord(marker.latitude, marker.longitude).then(data => console.log(data))

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
    <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={{alignItems:'flex-end', paddingHorizontal:'10%'}}>
        <Button
          onPress={addEntry}
          title="submit"   
          
        />
        </View>
      </InputAccessoryView>
    <Modal
            animationType="slide"
            transparent={true}
            visible={writeJournal}
            onRequestClose={() => setWriteJournal(false)}
          >
            
            <TouchableWithoutFeedback onPress={() => setWriteJournal(false)}>
              <View style={styles.centeredView}>
        
                <TouchableWithoutFeedback>
                <View style={styles.modalView}>
        
                  <Text style={{ fontFamily: "Roboto", fontSize: 20, color:'#73715a' }}>
                    {" "}
                    Add journal
                  </Text>
                  <View style={{width:'80%', marginTop:'8%'}}>
                  <TextInput 
                  placeholder='title'
                  style={{height:30, borderBottomColor:'#73715a', borderBottomWidth:2}}
                  onChangeText = {text => setTitle(text)}
                  />
                  </View>
                  <View style={{width:'90%', marginTop:'15%', height:'40%'}}>
                  <TextInput 
                multiline={true}
                inputAccessoryViewID={inputAccessoryViewID}
                  placeholder='write something...'
                  style={{height:'100%', borderColor:'#73715a50', borderWidth:1.5, backgroundColor:'#FFFFFF50'}}
                  onChangeText = {text => setDescription(text)}
                  />
                  </View>
     
                 <View style={{width:'60%', alignSelf:'center', justifyContent:'center', 
                 alignItems:'center', marginTop:'10%', backgroundColor:'#666344', borderRadius:5}}>
                     <TouchableOpacity 
                        onPress={addEntry}
                        style={{paddingVertical:10}}>
                        <Text style={{color: 'white'}}>Submit</Text>
                     </TouchableOpacity>
                 </View>
                  
                  </View>   
              
                </TouchableWithoutFeedback>
      
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
              animationType="slide"
              transparent={true}
              visible={readJournal}
              onRequestClose={() => {
                setReadJournal(false);
              }}
              >
            <TouchableWithoutFeedback onPress={() => setReadJournal(false)}>
              <View style={styles.centeredView}>
                  <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={{ fontFamily: "Roboto", fontSize: 20, color:'#73715a' }}>
                    Here renders the journal information
                  </Text>
                  </View>   
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
    <View style={{position:'absolute', zIndex: 100, width:'80%', alignSelf:'center', bottom: 40, left: 290}}>
     <Icon
            raised
            type = "font-awesome"
            name='pencil'
            color="grey"
            onPress={()=> setWriteJournal(true)}  
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
            icon={{name: 'book', color: "grey", type: 'font-awesome-5'}}
            onPress={()=> navigation.push("friends")}
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
          onPress={()=>viewEntries(marker)}
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
    height: Dimensions.get('screen').height,
  },
  centeredView: {
    flex: 1,
    
    alignItems: "center",
    marginTop: '30%',
  },
  modalView: {
    height: "60%",
    width: "80%",
    backgroundColor: "#f0efe1",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
 