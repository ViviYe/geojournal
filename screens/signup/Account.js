import React from "react";
import { View, Image, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar } from 'react-native-elements';

//path to logo
//the shade of white we are using
const WHITE = "white";
const JournalDummy = [

    {  
        id: 1,
        title: "First journal entry",
        description: "today was a bad day, I did nothing, WAHHHH",
        created_at: "2020-12-25",
        longitude: -76.4735,
        latitude: 42.4534,
        address: "524 College Ave Cornell"
    },
    {  
        id: 2,
        title: "Second journal entry",
        description: "mehhh",
        created_at: "2020-12-25",
        longitude: -76.4735,
        latitude: 42.4534,
        address: "120 Valentine Pl"
    },
    {
        id: 3,
        title: "Third journal entry",
        description: "HEHEHEHE",
        created_at: "2020-12-25",
        longitude: -76.4735,
        latitude: 42.4534,
        address: "120 Valentine Pl"
    },
    {
        id: 4,
        title: "Forth journal entry",
        description: "HEHEHEHE",
        created_at: "2020-12-25",
        longitude: -76.4735,
        latitude: 42.4534,
        address: "120 Valentine Pl"
    }

]

const Card = ({ title, message, location, date }) => (
    <View style={{backgroundColor: '#F6F5D4', width:'80%', alignSelf:'center', 
    borderRadius:10, marginVertical:10, padding: 10
    }}>
        <Text style={{ fontSize: 15, color: "#575632", fontFamily:'Roboto', alignItems:'center'}}> {title} </Text>
        <View style={{padding: 5}}>
        <Text style={{ fontSize: 10, color: "#575632", fontFamily:'Roboto', alignItems:'center'}}>{message} </Text>
        </View>
        <View style={{alignItems:'flex-end'}}>
        <Text style={{ fontSize: 10, color: "#575632", fontFamily:'Roboto', alignItems:'center'}}> Created at {location} </Text>
        </View>
        <View style={{alignItems:'flex-end'}}>
        <Text style={{ fontSize: 10, color: "#575632", fontFamily:'Roboto', alignItems:'center'}}> on {date} </Text>
        </View>
     </View>
  );

/**
 * Start screen component
 */
export default function StartScreen({ navigation }) {

    const [friends, setFriends] = React.useState(0);
    const renderItem = ({ item }) => (
        <Card title={item.title} message={item.description} location={item.address} date={item.created_at} />
      );

  return (

    <SafeAreaView style={{backgroundColor: "#BCBFA7", flex: 1}}>
      <View style={{alignItems:"center", marginTop:'3%'}}>
      <Avatar
            size="large"
            rounded
            source={{
              uri: "https://placekitten.com/200/300",
            }}
          />
        <Text style={{ fontSize: 20, color: "#F6F5D4", fontFamily: "Roboto", marginVertical:'5%' }}>Alanna Zhou</Text>
      </View>
      <TouchableOpacity 
      onPress={()=>navigation.push('friends')}
      style={{backgroundColor: '#F6F5D4', height:90, width:'80%', 
      alignSelf:'center', borderRadius:10, 
      justifyContent:'center',
   
      }}>
        <Text style={{alignSelf:"center", fontSize: 20, color: "#575632", fontFamily:'Roboto'}}> {friends} · Friends </Text>
      </TouchableOpacity>
      <FlatList
        style={{marginTop: 20}}
        data={JournalDummy}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  
  );
}
