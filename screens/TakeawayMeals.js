// Shows all takeaway meals

import { View, Text } from "react-native";
import Background from "../components/UI/Background";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchMeals } from "../util/database";
import MealList from "../components/Meals/MealList";

function TakeawayMeals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadTakeawayMeals() {
      const meals = await fetchMeals("takeaway");
      setLoadedMeals(meals);
    }

    if (isFocused) {
      loadTakeawayMeals();
    }
  }, [isFocused]);

  return (
    <Background>
      <MealList meals={loadedMeals} />
    </Background>
  );
}

export default TakeawayMeals;
