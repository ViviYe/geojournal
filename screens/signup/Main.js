import React from "react";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  InputAccessoryView,
  Button,
} from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar, Icon } from "react-native-elements";

//path to logo
//the shade of white we are using
const WHITE = "white";

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (e) => reject(e)
    );
  });
};

export default function Main({ navigation }) {
  const inputAccessoryViewID = "submit";
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [doneLoading, setDoneLoading] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);
  const [mapView, setMapView] = React.useState(MapView.ref);

  const onRegionChange = (region) => {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
  };
  React.useEffect(() => {
    getCurrentLocation().then((position) => {
      if (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setDoneLoading(true);
      }
    }, []);
  });

  const addEntry = () => {
    setWriteJournal(false);
    let latlng = { latitude: latitude, longitude: longitude };
    const eps = 0.007;
    setMarkers((markers) => [
      ...markers.filter(
        (e) =>
          Math.abs(e.latitude - latitude) > eps &&
          Math.abs(e.longitude - longitude) > eps
      ),
      latlng,
    ]);
  };
  const [writeJournal, setWriteJournal] = React.useState(false);
  const [readJournal, setReadJournal] = React.useState(false);
  const [journal, setJournal] = React.useState(false);

  if (!doneLoading) {
    return null;
  } else {
    return (
      <View
        style={{
          backgroundColor: "#BCBFA750",
          height: "100%",
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 100,
            width: "90%",
            alignSelf: "center",
            bottom: 110,
            left: 300,
          }}
        >
          <Icon
            raised
            type="font-awesome"
            name="location-arrow"
            color="grey"
            onPress={() =>
              mapView.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              })
            }
          />
        </View>
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={{ alignItems: "flex-end", paddingHorizontal: "10%" }}>
            <Button onPress={() => setWriteJournal(false)} title="submit" />
          </View>
        </InputAccessoryView>
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
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 20,
                      color: "#73715a",
                    }}
                  >
                    {" "}
                    add journal
                  </Text>
                  <View style={{ width: "80%", marginTop: "8%" }}>
                    <TextInput
                      placeholder="title"
                      style={{
                        height: 30,
                        borderBottomColor: "#73715a",
                        borderBottomWidth: 2,
                      }}
                    />
                  </View>
                  <View
                    style={{ width: "90%", marginTop: "15%", height: "40%" }}
                  >
                    <TextInput
                      multiline={true}
                      inputAccessoryViewID={inputAccessoryViewID}
                      placeholder="write something..."
                      style={{
                        height: "100%",
                        borderColor: "#73715a50",
                        borderWidth: 1.5,
                        backgroundColor: "#FFFFFF50",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      width: "60%",
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10%",
                      backgroundColor: "#666344",
                      borderRadius: 5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => addEntry()}
                      style={{ paddingVertical: 10 }}
                    >
                      <Text style={{ color: "white" }}>Submit</Text>
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
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 20,
                      color: "#73715a",
                    }}
                  >
                    Here renders the journal information
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        
        <View
          style={{
            position: "absolute",
            zIndex: 100,
            width: "80%",
            alignSelf: "center",
            bottom: 40,
            left: 300,
          }}
        >
          <Icon
            raised
            type="font-awesome"
            name="pencil"
            color="grey"
            onPress={() => setWriteJournal(true)}
          />
        </View>

        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            paddingHorizontal: "5%",
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
          <View style={{ width: "78%" }} />
          <TouchableOpacity onPress={() => navigation.push("journal")}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/users.png")}
            />
          </TouchableOpacity>
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={(ref) => setMapView(ref)}
          onRegionChangeComplete={onRegionChange}
          showsUserLocation
          showsBuildings
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              onPress={() => setReadJournal(true)}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  centeredView: {
    flex: 1,

    alignItems: "center",
    marginTop: "30%",
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
