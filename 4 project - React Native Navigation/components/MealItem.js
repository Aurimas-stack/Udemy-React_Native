import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import MealDetails from "./MealDetails";

const MealItem = (props) => {
  const navigation = useNavigation();

  const selectMealHandler = () => {
    navigation.navigate("MealDetail", {
      mealId: props.id,
    });
  };
  return (
    <View style={styles.mealItem}>
      <Pressable android_ripple={{ color: "#ccc" }} onPress={selectMealHandler}>
        <View>
          <Image source={{ uri: props.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <MealDetails
          duration={props.duration}
          complexity={props.complexity}
          affordability={props.affordability}
        />
      </Pressable>
    </View>
  );
};
export default MealItem;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "#fff",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});
