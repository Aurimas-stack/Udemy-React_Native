import { useLayoutEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import IconButton from "../components/IconButton";

import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";

import { MEALS } from "../data/DummyData";

const MealDetailScreen = (props) => {
  const mealId = props.route.params.mealId;

  const meal = MEALS.find((meal) => meal.id === mealId);

  const headerButtonPressHandler = () => {};

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={headerButtonPressHandler}
            icon="star"
            color="#fff"
          />
        );
      },
    });
  }, [props.navigation, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.rootCont}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{meal.title}</Text>
      <MealDetails
        duration={meal.duration}
        complexity={meal.complexity}
        affordability={meal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle subtitle="Ingredients" />
          <List list={meal.ingredients} />
          <Subtitle subtitle="Steps" />
          <List list={meal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootCont: {
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "#fff",
  },
  detailText: {
    color: "#fff",
  },
  listContainer: {
    width: "85%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
});
