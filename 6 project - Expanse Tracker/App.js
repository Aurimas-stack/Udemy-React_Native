import { Fragment } from "react";

import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";

import {Ionicons} from "@expo/vector-icons";
import {GlobalStyles} from "./constants/styles";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: "#fff",
      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500
    }}>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title:"Recent Expenses",
        tabBarLabel: "Recent Expenses",
        tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color} />
      }}/>
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
        title:"All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color} />
      }}/>
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <Fragment>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ExpensesOverview">
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{
            headerShown: false
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}