import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Ionicons} from "@expo/vector-icons";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoriteScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{
      headerStyle: { backgroundColor: "#351401" },
      headerTintColor: "#fff",
      sceneContainerStyle: { backgroundColor: "#3f2f25" },
      drawerContentStyle: {backgroundColor: "#351401"},
      drawerInactiveTintColor: "#fff",
      drawerActiveTintColor: "#351401",
      drawerActiveBackgroundColor: "#e4baa1"
    }}>
      <Drawer.Screen name="Categories" component={CategoriesScreen} options={{
        title: "All Categories",
        drawerIcon: ({color, size}) => {
          return <Ionicons color={color} size={size} name="list" />
        }
      }}/>
      <Drawer.Screen name="Favorites" component={FavoritesScreen} options={{
        drawerIcon: ({color, size}) => {
          return <Ionicons color={color} size={size} name="star" />
        }
      }} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Drawer" component={DrawerNavigation} options={{
            headerShown: false
          }}/>
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverviewScreen}
            /*options={({ route, navigation }) => {
              const catId = route.params.categoryId;
              return {

              };
            }}*/
          />
          <Stack.Screen name="MealDetail" component={MealDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
