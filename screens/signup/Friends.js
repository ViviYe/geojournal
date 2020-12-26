import React from "react";
import { View, Image, Text, SafeAreaView, ScrollView, FlatList, StyleSheet, Modal, TouchableHighlight } from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar, Icon } from 'react-native-elements';

//path to logo
//the shade of white we are using
const WHITE = "white";


const Card = ({ name }) => (
    <View style={{backgroundColor: '#F6F5D4', width:'80%', alignSelf:'center', 
    borderRadius:10, marginVertical:10, padding: 10
    }}>
        <Text style={{ fontSize: 15, color: "black", fontFamily:'Roboto', alignItems:'center'}}> {name} </Text>
       
     </View>
  );

/**
 * Start screen component
 */
export default function StartScreen({ navigation }) {

    const [friends, setFriends] = React.useState(["yy453@cornell.edu", "asz33@cornell.edu", "yl2795@cornell.edu"]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const renderItem = ({ item }) => (
        <Card name={item} />
      );

  return (

    <SafeAreaView style={{backgroundColor: "#BCBFA7", flex: 1}}>



<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Friends here</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


    <View style={{padding:'10%', flexDirection:'row'}}>
    <Text style={{ fontSize: 20, color: "#F6F5D4", fontFamily:'Roboto', alignItems:'center', marginRight: 10}}> Friends </Text>
    <Icon
    name='user-plus'
    type='font-awesome-5'
    onPress={()=> setModalVisible(true)}
    ></Icon>
    </View>
      <FlatList
        style={{marginTop: 20}}
        data={friends}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });