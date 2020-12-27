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
const JournalDummy = [
  {
    id: 1,
    title: "First journal entry",
    description: "today was a bad day, I did nothing, WAHHHH",
    created_at: "Dec 25, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "524 College Ave Cornell",
  },
  {
    id: 2,
    title: "Second journal entry",
    description: "mehhh",
    created_at: "Dec 25, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "120 Valentine Pl",
  },
  {
    id: 3,
    title: "Third journal entry",
    description: "HEHEHEHE",
    created_at: "Dec 25, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "120 Valentine Pl",
  },
  {
    id: 4,
    title: "Forth journal entry",
    description: "HEHEHEHE",
    created_at: "Dec 25, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "120 Valentine Pl",
  },
];

const Card = ({ title, message, location, date }) => (
  <View
    style={{
      backgroundColor: "#F4F1DE",
      width: "80%",
      alignSelf: "center",
      borderRadius: 20,
      marginVertical: 15,
      padding: 20,
      paddingTop: 30,
      shadowColor: "black",
      shadowRadius: 4,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
    }}
  >
    <View
      style={{
        height: 35,
        width: "45%",
        backgroundColor: "#2A9D8F",
        position: "absolute",
        marginTop: -15,
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
        {date}
      </Text>
    </View>
    <Text
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
        marginTop: 10,
      }}
    >
      {" "}
      {location}{" "}
    </Text>

    {/* <View style={{ alignItems: "flex-end" }}>
      <Text
        style={{
          fontSize: 10,
          color: "#575632",
          fontFamily: "Roboto",
          alignItems: "center",
        }}
      >
        {" "}
        Created at {location}{" "}
      </Text>
    </View> */}
  </View>
);

/**
 * Start screen component
 */
export default function Account({ navigation }) {
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
      <TouchableOpacity
        onPress={() => navigation.push("friends")}
        style={{
          backgroundColor: "#74C69D",
          height: 40,
          width: "30%",
          alignSelf: "flex-end",
          shadowColor: "black",
          shadowRadius: 4,
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 2 },
          marginRight: 30,
          marginVertical: 20,
          borderRadius: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 15,
            color: "#F4F1DE",
            fontFamily: "RobotoMono-Regular",
          }}
        >
          Friends
        </Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginTop: "3%" }}>
        <Text
          style={{
            fontSize: 30,
            color: "#92B6B1",
            fontFamily: "RobotoMono-Regular",
            marginVertical: "5%",
            fontWeight: "200",
          }}
        >
          Alanna Zhou
        </Text>
      </View>

      <FlatList
        style={{ paddingTop: 20 }}
        data={JournalDummy}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
