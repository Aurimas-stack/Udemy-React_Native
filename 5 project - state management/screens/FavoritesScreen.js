//import { useContext } from "react";

import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

//import { FavoritesContext } from "../store/context/favorites-context";

import MealsList from "../components/MealList/MealsList";
import { MEALS } from "../data/dummy-data";

function FavoritesScreen() {
  //const favCtx = useContext(FavoritesContext);
  const favMealIds = useSelector(state => state.favMeals.ids);

  const favMeals = MEALS.filter((meal) => favMealIds.includes(meal.id));

  if (favMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorites yet.</Text>
      </View>
    );
  }

  return <MealsList items={favMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
});
