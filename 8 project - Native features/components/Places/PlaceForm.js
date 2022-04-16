import { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";

import Button from "../UI/Button";
import TitlePicker from "./TitlePicker";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Place } from "../../models/place";

const PlaceForm = ({onCreatePlace}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState();
  const [image, setImage] = useState();

  const changeTitleHandler = (enteredText) => {
    setTitle(enteredText);
  };

  const imageTakenHandler = (imageUri) => {
    setImage(imageUri);
  };

  const locationPickHandler = useCallback((pickedLocation) => {
    setLocation(pickedLocation);
  }, []);

  const savePlaceHandler = () => {
    const placeData = new Place(title, image, location);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <TitlePicker onChangeTitle={changeTitleHandler} title={title} />
      <ImagePicker onImageTaken={imageTakenHandler} />
      <LocationPicker onLocationPick={locationPickHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};
export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
});
