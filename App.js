import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddMeal from "./screens/AddMeal";
import AllMeals from "./screens/AllMeals";
import HomeMeals from "./screens/HomeMeals";
import Recommender from "./screens/Recommender";
import TakeawayMeals from "./screens/TakeawayMeals";
import MealDetails from "./screens/MealDetails";
import { Colors } from "./constants/colors";
import IconButton from "./components/UI/IconButton";
import Icon from "./components/UI/Icon";
import { useEffect, useState, useCallback } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MealsOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: {
          backgroundColor: Colors.primary100,
        },
        tabBarActiveBackgroundColor: Colors.primary200,
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: Colors.primary100 },
        cardStyle: { backgroundColor: "gray" },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={30}
            color={tintColor}
            onPress={() => {
              navigation.navigate("AddMeal");
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Recommender"
        component={Recommender}
        options={{
          tabBarIcon: () => (
            <Icon icon="dice-6" size={30} color={Colors.icons} set="m" />
          ),
          cardStyle: { backgroundColor: "#111111" },
        }}
      />
      <Tab.Screen
        name="AllMeals"
        component={AllMeals}
        cook
        options={{
          tabBarIcon: () => (
            <Icon icon="fast-food" size={30} color={Colors.icons} set="i" />
          ),
        }}
      />
      <Tab.Screen
        name="HomeMeals"
        component={HomeMeals}
        options={{
          tabBarIcon: () => (
            <Icon icon="knife" size={30} color={Colors.icons} />
          ),
        }}
      />
      <Tab.Screen
        name="TakeawayMeals"
        component={TakeawayMeals}
        options={{
          tabBarIcon: () => (
            <Icon icon="truck-delivery" size={30} color={Colors.icons} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Splash screen
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Pre-load database
        init();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary100 },
          }}
        >
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AddMeal" component={AddMeal} />
          <Stack.Screen name="MealDetails" component={MealDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
