// Shows all avalilable meals

import { View, Text } from "react-native";
import Background from "../components/UI/Background";
import { useIsFocused } from "@react-navigation/native";
import { fetchAllMeals } from "../util/database";
import { useState, useEffect } from "react";

function AllMeals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadAllMeals() {
      const meals = await fetchAllMeals();
      setLoadedMeals(meals);
    }

    if (isFocused) {
      loadAllMeals();
      console.log(loadedMeals);
    }
  }, [isFocused]);

  return (
    <Background>
      <View>
        <Text>All Meals !</Text>
      </View>
    </Background>
  );
}

export default AllMeals;
