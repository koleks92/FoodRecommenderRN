// Recommender for food

import Background from "../components/UI/Background";
import RecommenderForm from "../components/Recommender/RecommenderForm";
import { useEffect, useLayoutEffect, useState } from "react";
import { fetchAllMeals } from "../util/database";
import {
  getRecommendation,
  mealRecommender,
  oneMealRandom,
} from "../util/recommenderFunctions";

function Recommender({ navigation }) {
  const [allMeals, SetAllMeals] = useState();

  // Load meals using async fetchMeals
  useLayoutEffect(() => {
    async function loadMeals() {
      const meals = await fetchAllMeals();
      SetAllMeals(meals);
    }
    loadMeals();
  }, []);

  function getRecommendationHandler(searchOptions) {
    const meal = getRecommendation(allMeals, searchOptions);

    // Load results screen
    navigation.navigate("RecommenderResult", {
      meal: meal,
      searchOptions: searchOptions,
      allMeals: allMeals
    });
  }

  return (
    <Background>
      <RecommenderForm setSearchOptions={getRecommendationHandler} />
    </Background>
  );
}

export default Recommender;
