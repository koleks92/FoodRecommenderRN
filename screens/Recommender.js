// Recommender for food

import { View, Text, StyleSheet } from "react-native";
import Background from "../components/UI/Background";
import RecommenderForm from "../components/Recommender/RecommenderForm";
import { useLayoutEffect, useState } from "react";
import { fetchAllMeals } from "../util/database";
import RecommenderResult from "./RecommenderResult";

function Recommender({ navigation }) {
  const [allMeals, SetAllMeals] = useState();

  // Search options saved for future recommendations
  let researchOptions;

  // Load meals using async fetchMeals
  useLayoutEffect(() => {
    async function loadMeals() {
      const meals = await fetchAllMeals();
      SetAllMeals(meals);
    }
    loadMeals();
  }, []);

  // Calculate random meal from array
  function oneMealRandom(meals) {
    return meals[Math.floor(Math.random() * meals.length)];
  }

  // Get recommended meal according to search criteria
  function mealRecommender(meals, cusine, price) {
    let filteredMeals;
    // If no cusine or price chosne
    if (!cusine && !price) {
      filteredMeals = meals;
    }
    // If only price chosen
    if (!cusine && price) {
      filteredMeals = meals.filter((meal) => meal.price === price);
    }
    // If only cusine chosen
    if (!price && cusine) {
      filteredMeals = meals.filter((meal) => meal.cusine === cusine);
    }
    // If both chosen
    if (price && cusine) {
      filteredMeals = meals.filter(
        (meal) => meal.cusine === cusine && meal.price === price
      );
    }

    // Return on random meal or error
    if (filteredMeals.length > 0) {
      return oneMealRandom(filteredMeals);
    } else {
      return "noMeal";
    }
  }

  function getRecommendationHandler(searchOptions) {
    // Set researchOptions for future recommendations
    researchOptions = searchOptions

    // Set type of meal (home or takeaway)
    let filteredMeals;
    if (searchOptions[0].home) {
      filteredMeals = allMeals.filter((meal) => meal.type === "home");
    } else {
      filteredMeals = allMeals.filter((meal) => meal.type === "takeaway");
    }

    // Get recommended meal
    const meal = mealRecommender(
      filteredMeals,
      searchOptions[0].cusineChosen,
      searchOptions[0].priceChosen
    );

    // Load results screen
    navigation.navigate("RecommenderResult", {
      meal: meal,
      recommendAnother: recommendAnotherHandler,
    });
  }

  function recommendAnotherHandler() {
    getRecommendationHandler(researchOptions);
  }

  return (
    <Background>
      <RecommenderForm setSearchOptions={getRecommendationHandler} />
    </Background>
  );
}

export default Recommender;
