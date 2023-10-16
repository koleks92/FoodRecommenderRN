// Shows all make-at-home meals

import { View, Text } from "react-native";
import Background from "../components/UI/Background";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchMeals } from "../util/database";


function HomeMeals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

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
      <View>
        <Text>Make at home meals</Text>
      </View>
    </Background>
  );
}

export default HomeMeals;
