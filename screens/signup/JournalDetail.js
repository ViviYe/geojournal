import React from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar } from "react-native-elements";

//path to logo
//the shade of white we are using
const WHITE = "white";

export default function JournalDetail({ navigation, route}) {
  const item = route.params
  const [friends, setFriends] = React.useState(0);
  const renderItem = ({ item }) => (
    <Card
      title={item.title}
      message={item.description}
      location={item.address}
      date={item.created_at}
    />
  );

  return (
    <SafeAreaView
      style={{ backgroundColor: Color.paleGreenBackground, flex: 1 }}
    >
      <View style={{ margin: "3%", marginLeft: "10%" }}>
        <Text
          style={{
            fontSize: 25,
            color: "#92B6B1",
            fontFamily: "RobotoMono-Regular",
            marginVertical: "5%",
            fontWeight: "200",
          }}
        >
         {item.title}
        </Text>
        <Text style={{fontSize: 15,
          fontFamily: "RobotoMono-Regular", fontWeight: "600", marginVertical:'5%'}}>author: {item.author}</Text>
        <Text style={{fontSize: 15,
          fontFamily: "RobotoMono-Regular"}}>location: {item.address}</Text>
        
      </View>
      <View style={{height:'60%', backgroundColor:'white', width:'85%', alignSelf:'center', borderRadius: 20, marginTop:'10%', padding: 30, paddingTop: 50}}>
      <View
      style={{
        height: 35,
        width: "45%",
        backgroundColor: "#2A9D8F",
        position: "absolute",
        top: -15,
        borderRadius: 10,
        shadowColor: "grey",
        shadowRadius: 2,
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 2 },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 12,
          fontFamily: "RobotoMono-Regular",
        }}
      >
        {item.created_at}
      </Text>
    </View>
    <Text>{item.description}</Text>
    </View>
    </SafeAreaView>
  );
}
