import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import AddMeal from "./screens/AddMeal";
import AllMeals from "./screens/AllMeals";
import HomeMeals from "./screens/HomeMeals";
import Recommender from "./screens/Recommender";
import TakeawayMeals from "./screens/TakeawayMeals";
import MealDetails from "./screens/MealDetails";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MealsOverview() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllMeals" component={AllMeals} />
      <Tab.Screen name="HomeMeals" component={HomeMeals} />
      <Tab.Screen name="TakeawayMeals" component={TakeawayMeals} />
      <Tab.Screen name="Recommender" component={Recommender} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MealsOverview" component={MealsOverview} />
          <Stack.Screen name="AddMeal" component={AddMeal} />
          <Stack.Screen name="MealDetails" component={MealDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
