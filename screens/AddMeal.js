// Add new meal to the database

import { StyleSheet, View } from "react-native";
import ChoiceForm from "../components/AddMeal/ChoiceForm";
import Background from "../components/UI/Background";
import { useState, useEffect } from "react";
import HomeTakeawayForm from "../components/AddMeal/HomeTakeawayForm";
import { insertMeal } from "../util/database";

function AddMeals({ navigation }) {
  const [choice, setChoice] = useState("");

  async function saveMealHandler(data) {
    await insertMeal(data);
    navigation.navigate('AllMeals')
  }

  function handleChoiceData(data) {
    setChoice(data);
  }

  let ScreenView;

  if (choice === "") {
    ScreenView = <ChoiceForm handleChoiceData={handleChoiceData} />;
  } else if (choice === "h") {
    ScreenView = <HomeTakeawayForm onSaveMeal={saveMealHandler} type={'home'}/>;
  } else if (choice === "t") {
    ScreenView = <HomeTakeawayForm onSaveMeal={saveMealHandler} type={"takeaway"}/>;
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
