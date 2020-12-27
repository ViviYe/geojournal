import React from "react";
import MapView, {Marker} from 'react-native-maps';
import { View, Image, Text, StyleSheet,SafeAreaView, Dimensions, Modal, TouchableWithoutFeedback, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, InputAccessoryView, Button, FlatList} from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar, Icon } from 'react-native-elements';
import { addJournalEntry, viewEntriesAtCoord, viewAllEntries } from '../../api/API';

const JournalCard = ({ title, author, location, date }) => (
  <View
    style={{
      backgroundColor: "#F4F1DE",
      width: "98%",
      alignSelf: "center",
      borderRadius: 5,
      marginVertical: 10,
      padding: 5,
      paddingHorizontal: 20,
      shadowColor: "black",
      shadowRadius: 4,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
    }}
  >
    
    
    <Text
      numberOfLines={1}
      style={{
        
        fontSize: 15,
        color: "#575632",
        fontFamily: "RobotoMono-Regular",
        fontWeight: "600",
        alignItems: "center",
      }}
    >
      {" "}
      {title}{" "}
    </Text>

    <Text
      style={{
        fontSize: 12,
        color: "#575632",
        fontFamily: "RobotoMono-Regular",
        alignItems: "center",
        margin: 2,
        marginVertical: 5,
      }}
    >
      {" "}
      {date}{" "}
    </Text>
  </View>
);

const JournalDummy = [
  {
    id: 1,
    author: "person@cornell.edu",
    title: "First journal entry",
    description: "today was a bad day, I did nothing, WAHHHH",
    created_at: "Dec 25, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "524 College Ave Cornell",
  },
  {
    id: 2,
    author: "person@cornell.edu",
    title: "Second journal entry",
    description: "mehhh",
    created_at: "Dec 25, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "120 Valentine Pl",
  },
  {
    id: 3,
    author: "person@cornell.edu",
    title: "Third journal entry",
    description: "HEHEHEHE",
    created_at: "Dec 25, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "120 Valentine Pl",
  },
  {
    id: 4,
    author: "person@cornell.edu",
    title: "Forth journal entry",
    description: "HEHEHEHE",
    created_at: "Dec 25, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "120 Valentine Pl",
  },
];

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
  const [entries, setEntries] = React.useState([]);
  const [description, setDescription] = React.useState("");
  
  const onRegionChange = (region) => {
    setLatitude (region.latitude)
    setLongitude (region.longitude)
  }

  const round = (num) => {
    return Number(Number.parseFloat(num).toFixed(3))
  }

  React.useEffect(() => {
    getCurrentLocation().then(position => {
      if (position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setDoneLoading(true)
      }
  
      viewAllEntries().then(data =>
        {const initialMarkers = data.data.map((entry, index) => ({latitude: entry.latitude, longitude: entry.longitude}))
        setMarkers(initialMarkers)
      })
  }, []);
});

const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => {setReadJournal(false);  navigation.push("journal-detail", item)}}>
    <JournalCard
      title={item.title}
      message={item.description}
      location={item.address}
      date={item.created_at}
      author={item.author}
    />
  </TouchableOpacity>
);

  const addEntry = async () => {
    setWriteJournal(false)
    const roundedlat = round(latitude)
    const roundedlong = round(longitude)
    await addJournalEntry(roundedlat, roundedlong, title, description);
    let latlng = {latitude: roundedlat, longitude: roundedlong}
    setMarkers(markers => 
      [...(markers.filter((e) => e.latitude != roundedlat && e.longitude!=roundedlong)), latlng])

  }

  const viewEntries = async (marker) => {
    setReadJournal(true)
    viewEntriesAtCoord(marker.latitude, marker.longitude).then(data => setEntries(data.data))

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
    <View style={{position:'absolute', zIndex: 100, width:'80%', alignSelf:'center', bottom: 110, left: 300}}>
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
     
                  <TouchableOpacity
                      onPress={() => addEntry()}
                      style={{width: "60%",
                      
                    
                      marginTop: "10%"}}
                    >
                  <View
                    style={{    
                      backgroundColor: "#666344",
                      borderRadius: 5,
                      width:'80%',
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf:'center',
                      padding: 5

                    }}
                  >
                    
                      <Text style={{ color: "white" }}>Submit</Text>
                    
                  </View>
                  </TouchableOpacity>
                  
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
                 
                  <FlatList
              style={{ paddingTop: 20, flex: 1}}
            data={entries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        
    <View style={{position:'absolute', zIndex: 100, width:'80%', alignSelf:'center', bottom: 40, left: 300}}>
     <Icon
            raised
            type = "font-awesome"
            name='pencil'
            color="grey"
            onPress={()=> setWriteJournal(true)}  
          />
    </View>


    <View
          style={{
            position: "absolute",
            width: '100%',
            justifyContent: "space-between",
            paddingHorizontal: "10%",
            flexDirection: "row",
            zIndex: 100,
            paddingVertical: "15%",
            
            
          }}
        >
          <TouchableOpacity onPress={() => navigation.push("account")}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/user.png")}
            />
          </TouchableOpacity>
         
          <TouchableOpacity onPress={() => navigation.push("journal")}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/users.png")}
            />
          </TouchableOpacity>
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
    backgroundColor: "white",
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
 