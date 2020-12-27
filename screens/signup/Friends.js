import React from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

//path to logo
//the shade of white we are using
const WHITE = "white";
const dummy_users = [
  {
    id: 1,
    email: "person@cornell.edu",
    friends: ["person1@cornell.edu", "person2@cornell.edu"],
  },
  {
    id: 2,
    email: "person1@cornell.edu",
    friends: ["person@cornell.edu"],
  },
];

const Card = ({ name }) => (
  <View
    style={{
      backgroundColor: "#F6F5D4",
      width: "90%",
      alignSelf: "center",
      borderRadius: 10,
      marginVertical: 10,
      padding: 10,
      paddingVertical: 20,
      shadowColor: "black",
      shadowRadius: 4,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
    }}
  >
    <Text
      style={{
        fontSize: 15,
        color: "black",
        fontFamily: "RobotoMono-Regular",
        alignItems: "center",
      }}
    >
      {" "}
      {name}{" "}
    </Text>
  </View>
);

const UserCard = ({ email }) => (
  <View
    style={{
      alignSelf: "flex-start",
      marginVertical: "5%",
    }}
  >
    <Text
      style={{
        marginHorizontal: "10%",
        alignSelf: "flex-start",
        fontSize: "12",
        fontFamily: "RobotoMono-Regular",
      }}
    >
      {email}
      {/* <Icon
        name="plus"
        type="font-awesome-5"
        style={{ alignSelf: "flex-end" }}
      /> */}
    </Text>
  </View>
);

/**
 * Start screen component
 */
export default function Friends({ navigation }) {
  const [friends, setFriends] = React.useState([
    "yy453@cornell.edu",
    "asz33@cornell.edu",
    "yl2795@cornell.edu",
  ]);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [friends_search, setFriends_search] = React.useState(dummy_users);
  const renderItem = ({ item }) => <Card name={item} />;
  const renderUser = ({ item }) => <UserCard email={item.email} />;

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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalView}>
                    <Text
                      style={{
                        fontFamily: "RobotoMono-Regular",
                        fontSize: 15,
                        color: "#73715a",
                      }}
                    >
                      search users by email
                    </Text>
                    <View
                      style={{
                        height: "10%",
                        width: "100%",
                        marginVertical: "3%",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        style={{
                          flex: 1,
                          justifyContent: "center",
                        }}
                        name="search"
                        type="font-awesome-5"
                        size={15}
                      />
                      <TextInput
                        style={{
                          height: "100%",
                          width: "50%",
                          borderColor: "gray",
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          borderBottomColor: Color.signUpBlue,
                          flex: 1,
                        }}
                      />
                    </View>
                    <FlatList
                      style={{
                        fontSize: 10,
                        color: "#92B6B1",
                        fontFamily: "RobotoMono-Regular",
                        marginVertical: "5%",
                        fontWeight: "200",
                        alignSelf: "flex-start",
                      }}
                      data={friends_search}
                      renderItem={renderUser}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <View
            style={{
              padding: "10%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "#92B6B1",
                fontFamily: "RobotoMono-Regular",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              {" "}
              Friends{" "}
            </Text>
            <Icon
              name="user-plus"
              type="font-awesome-5"
              onPress={() => setModalVisible(true)}
            ></Icon>
          </View>

          <FlatList
            style={{ marginTop: 20 }}
            data={friends}
            renderItem={renderItem}
            keyExtractor={(item) => item}
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
