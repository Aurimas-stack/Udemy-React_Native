import { useState, useLayoutEffect, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert } from "react-native";
import IconButton from "../components/UI/IconButton";

const Map = ({ navigation, route }) => {
  const initLocation = route.params && {lat: route.params.initialLat, lng: route.params.initialLng };
  const [location, setLocation] = useState(initLocation);

  const region = {
    latitude: initLocation ? initLocation.lat : 37.78,
    longitude: initLocation ? initLocation.lng : -112.48,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if(initLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setLocation({
      lat: lat,
      lng: lng,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!location) {
      Alert.alert("No location picked", "You have to pick a location");
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: location.lat,
      pickedLng: location.lng,
    });
  }, [navigation, location, initLocation]);

  useLayoutEffect(() => {
    if(initLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {location && (
        <Marker
          title="Picked Location"
          coordinate={{ latitude: location.lat, longitude: location.lng }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
