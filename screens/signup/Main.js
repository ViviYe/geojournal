import React from "react";
import { View, Image, Text, StyleSheet,SafeAreaView, Dimensions, Modal, TouchableWithoutFeedback, TextInput, TouchableOpacity} from "react-native";
import MapView from 'react-native-maps';
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar, Icon } from 'react-native-elements';

//path to logo
//the shade of white we are using
const WHITE = "white";



export default function Main({navigation}) {

    const [writeJournal, setWriteJournal] = React.useState(false);
    const [readJournal, setReadJournal] = React.useState(false);
    const [journal, setJournal] = React.useState(false);
    const WriteJournalModel = () =>{
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={writeJournal}
            onRequestClose={() => {
              setWriteJournal(false);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setWriteJournal(false)}>
              <View style={styles.centeredView}>
                  <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={{ fontFamily: "Roboto", fontSize: 20, color:'#73715a' }}>
                    {" "}
                    add journal
                  </Text>
                  <View style={{width:'80%', marginTop:'10%'}}>
                  <TextInput 
                  placeholder='title'
                  style={{height:30, borderBottomColor:'#73715a', borderBottomWidth:2}}
                  />
                  </View>
                  <View style={{width:'90%', marginTop:'15%', height:'55%'}}>
                  <TextInput 
                multiline={true}
                  placeholder='write something...'
                  style={{height:'100%', borderColor:'#73715a50', borderWidth:1.5, backgroundColor:'#FFFFFF50'}}
                  />
                  </View>
                 <View style={{width:'60%', alignSelf:'center', justifyContent:'center', 
                 alignItems:'center', marginTop:'10%', backgroundColor:'#666344', borderRadius:5}}>
                     <TouchableOpacity style={{paddingVertical:5}}>
                        <Text style={{color: 'white'}}>submit</Text>
                     </TouchableOpacity>
                 </View>
                  
                  </View>   
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )
    
    }



    const ReadJournalModel = () =>{
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={writeJournal}
            onRequestClose={() => {
              setWriteJournal(false);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setWriteJournal(false)}>
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
        )
    
    }



  return (

    <View
      style={{
        backgroundColor: "#BCBFA750",
        height:'100%'
      }}
    >
    <WriteJournalModel/>
    <ReadJournalModel/>
    <View style={{position:'absolute', zIndex: 100, width:'80%', alignSelf:'center', bottom: 40, left: 290}}>
     <Icon
            raised
            name='edit'
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
      showsUserLocation
      showsBuildings/>
    </View>
  );
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
