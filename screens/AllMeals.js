// Shows all avalilable meals

import Background from "../components/UI/Background";
import { useIsFocused } from "@react-navigation/native";
import { fetchAllMeals } from "../util/database";
import { useState, useEffect } from "react";
import MealList from "../components/Meals/MealList";

function AllMeals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  // Load meals using async fetchMeals
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadAllMeals() {
      const meals = await fetchAllMeals();
      setLoadedMeals(meals);
    }

    if (isFocused) {
      loadAllMeals();
    }
  }, [isFocused]);

  return (
    <Background>
      <MealList meals={loadedMeals} />
    </Background>
  );
}

export default AllMeals;
