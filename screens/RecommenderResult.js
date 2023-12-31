import { View, Text, StyleSheet } from "react-native";
import RecommendedItem from "../components/Recommender/RecommendedItem";
import Background from "../components/UI/Background";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
import { getRecommendation, removeMealFromAllMeals } from "../util/recommenderFunctions";
import { useEffect, useState } from "react";

function RecommenderResult({ route, navigation }) {
  const searchOptions = route.params.searchOptions;

  // Use useState to manage the meal and allMeals state
  const [allMeals, setAllMeals] = useState(route.params.allMeals);
  const [meal, setMeal] = useState(route.params.meal);

  // Variables for text, meal, and recommend another button
  let text = <Text style={styles.text}>Your recommendation</Text>;
  let item = <RecommendedItem meal={meal} onPress={onPressHandler} />;
  let button = (
    <Button
      onPress={recommendAnotherHandler}
      buttonStyle={styles.button}
      textStyle={styles.buttonText}
    >
      Recommend another !
    </Button>
  );

  // Recommend another function
  function recommendAnotherHandler() {
    // Remove current meal from allMeals array
    const newAllMeals = removeMealFromAllMeals(allMeals, meal);
    setAllMeals(newAllMeals);
    // Recommend new meal
    const newMeal = getRecommendation(allMeals, searchOptions);
    setMeal(newMeal);
  }

  // If no meals in array
  if (meal === "noMeal") {
    text = (
      <Text style={styles.text}>No recommendations match your criteria :(</Text>
    );
    item = "";
    button = "";
  }

  // Navigate to mealDetails
  function onPressHandler(id) {
    navigation.navigate("MealDetails", { id: id });
  }

  return (
    <Background>
      <View style={styles.root}>
        <View style={styles.textContainer}>{text}</View>
        {item}
        <View style={styles.buttonContainer}>{button}</View>
      </View>
    </Background>
  );
}

export default RecommenderResult;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    margin: 12,
  },
  text: {
    color: Colors.text,
    fontSize: 26,
    textAlign: "center",
  },
  buttonContainer: {
    width: "75%",
    height: 48,
    marginVertical: 24,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    elevation: 4,
    backgroundColor: Colors.primary300,
    width: "100%",
  },
  buttonText: {
    marginHorizontal: 14,
    fontSize: 20,
    fontWeight: "bold",
  },
});
