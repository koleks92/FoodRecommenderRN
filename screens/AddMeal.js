// Add new meal to the database

import { StyleSheet, View } from "react-native";
import ChoiceForm from "../components/AddMeal/ChoiceForm";
import Background from "../components/UI/Background";
import { useState, useEffect } from "react";
import HomeForm from "../components/AddMeal/HomeForm";
import TakeawayForm from "../components/AddMeal/TakeawayForm";

function AddMeals() {
  const [choice, setChoice] = useState("");

  function saveMealHandler(data) {
    console.log(data);
  }

  function handleChoiceData(data) {
    setChoice(data);
  }

  let ScreenView;

  if (choice === "") {
    ScreenView = <ChoiceForm handleChoiceData={handleChoiceData} />;
  } else if (choice === "h") {
    ScreenView = <HomeForm onSaveMeal={saveMealHandler} />;
  } else if (choice === "t") {
    ScreenView = <TakeawayForm onSaveMeal={saveMealHandler} />;
  }

  return (
    <Background>
      <View style={styles.container}>{ScreenView}</View>
    </Background>
  );
}

export default AddMeals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
