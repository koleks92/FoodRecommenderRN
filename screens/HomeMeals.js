// Shows all make-at-home meals

import Background from "../components/UI/Background";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchMeals } from "../util/database";
import MealList from "../components/Meals/MealList";

function HomeMeals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  // Load meals using async fetchMeals
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadHomeMeals() {
      const meals = await fetchMeals("home");
      setLoadedMeals(meals);
    }

    if (isFocused) {
      loadHomeMeals();
    }
  }, [isFocused]);

  return (
    <Background>
      <MealList meals={loadedMeals} />
    </Background>
  );
}

export default HomeMeals;
