// Recommender for food

import Background from "../components/UI/Background";
import RecommenderForm from "../components/Recommender/RecommenderForm";
import { useEffect, useLayoutEffect, useState } from "react";
import { fetchAllMeals } from "../util/database";
import { getRecommendation } from "../util/recommenderFunctions";
import { useIsFocused } from "@react-navigation/native";

function Recommender({ navigation }) {
  const [allMeals, setAllMeals] = useState();
  const isFocused = useIsFocused();

  // Load meals using async fetchMeals
  useEffect(() => {
    async function loadAllMeals() {
      const meals = await fetchAllMeals();
      setAllMeals(meals);
    }

    if (isFocused) {
      loadAllMeals();
    }
  }, [isFocused]);

  function getRecommendationHandler(searchOptions) {
    const meal = getRecommendation(allMeals, searchOptions);

    // Load results screen
    navigation.navigate("RecommenderResult", {
      meal: meal,
      searchOptions: searchOptions,
      allMeals: allMeals,
    });
  }

  return (
    <Background>
      <RecommenderForm setSearchOptions={getRecommendationHandler} />
    </Background>
  );
}

export default Recommender;
