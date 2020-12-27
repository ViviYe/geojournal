import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

//path to logo
//the shade of white we are using
const WHITE = "white";
const JournalDummy = [
  {
    id: 1,
    author: "Olivia",
    title: "Unwrapping Presents",
    description: "YAY Christmas! I had so much good food.",
    created_at: "Dec 25, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "524 College Ave Cornell",
  },
  {
    id: 2,
    author: "Vivi",
    title: "it snowed today",
    description: "Nothing happened today.",
    created_at: "Dec 23, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "120 Valentine Pl",
  },
  {
    id: 3,
    author: "Shino",
    title: "Leaving Ithaca ;-;",
    description: "Going back home so I'm packing to leave here :(",
    created_at: "Dec 23, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "112 Valentine Pl",
  },
  {
    id: 4,
    author: "Penmy",
    title: "Slept through meeting...",
    description: "I got up at 4pm and missed a meeting",
    created_at: "Dec 20, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "316 Becker House",
  },
  {
    id: 5,
    author: "Olivia",
    title: "Deer outside my apartment!",
    description: "SO cute",
    created_at: "Dec 19, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "112 Valentine Pl",
  },
  {
    id: 6,
    author: "Alanna",
    title: "Gorges in the snow",
    description: "found this great trail today!!",
    created_at: "Dec 19, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "136 Hoy Rd",
  },
  {
    id: 7,
    author: "Jiunn",
    title: "mango mango mango!",
    description: "I love mango mango",
    created_at: "Dec 19, 2020",
    longitude: -76.4735,
    latitude: 42.4534,
    address: "159 Dryden Rd",
  }
];

const Card = ({ title, author, location, date }) => (
  <View
    style={{
      backgroundColor: "#F4F1DE",
      width: "90%",
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
        {date}
      </Text>
    </View>

    <View
      style={{
        height: 35,
        width: "65%",
        backgroundColor: "#F2CC8F",
        position: "absolute",
        bottom: -15,
        right: -10,
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
        {author}
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
        marginVertical: 10,
      }}
    >
      {" "}
      {location}{" "}
    </Text>
  </View>
);

/**
 * Start screen component
 */
export default function Journal({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.push("journal-detail", item)}>
      <Card
        title={item.title}
        message={item.description}
        location={item.address}
        date={item.created_at}
        author={item.author}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AnimatedLinearGradient
        colors={[
          Color.greenGradientOne,
          Color.greenGradientTwo,
          Color.greenGradientThree,
          Color.greenGradientFour,
        ]}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
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

          <View style={{ margin: "3%", marginLeft: "10%" }}>
            <Text
              style={{
                fontSize: 30,
                color: "#92B6B1",
                fontFamily: "RobotoMono-Regular",
                marginVertical: "5%",
                fontWeight: "200",
              }}
            >
              Nearby Journals
            </Text>
          </View>
          <FlatList
            style={{ paddingTop: 20 }}
            data={JournalDummy}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </AnimatedLinearGradient>
    </View>
  );
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
