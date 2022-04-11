import { useLayoutEffect } from "react";

import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealItem";

import { MEALS, CATEGORIES } from "../data/DummyData";

const MealsOverviewScreen = (props) => {
  const catId = props.route.params.categoryId;

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;

    props.navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, props.navigation]);

  const renderMealItem = (itemData) => {
    return (
      <MealItem
        id={itemData.item.id}
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
