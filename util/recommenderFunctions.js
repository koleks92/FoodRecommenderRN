export function getRecommendation(allMeals, searchOptions) {
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

  return meal;
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

// Calculate random meal from array
function oneMealRandom(meals) {
  return meals[Math.floor(Math.random() * meals.length)];
}

// Remove current meal from allMeals
export function removeMealFromAllMeals(allMeals, removeMeal) {
  return allMeals.filter((meal) => meal !== removeMeal);
}
