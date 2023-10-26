// Add new meal to the database

import { StyleSheet, View } from "react-native";
import ChoiceForm from "../components/AddMeal/ChoiceForm";
import Background from "../components/UI/Background";
import { useState, useEffect } from "react";
import HomeTakeawayForm from "../components/AddMeal/HomeTakeawayForm";
import EditForm from "../components/EditMeal/EditForm";
import { insertMeal, updateMeal } from "../util/database";

function ManageMeal({ navigation, route }) {
  const [choice, setChoice] = useState("");
  const [meal, setMeal] = useState(null);

  // Check if "edit"
  useEffect(() => {
    if (route.params?.type === "e") {
      setChoice(route.params.type);
      setMeal(route.params.loadedMeal)
    }
  }, [route.params]);

  // Edit function handler
  async function editMealHandler(data) {
    const promise = await updateMeal(data);
    navigation.navigate("AllMeals");
  }

  // Add new meal handler
  async function saveMealHandler(data) {
    const promise = await insertMeal(data);
    navigation.navigate("AllMeals");
  }

  // Set type "h" = home, "t" = takeaway, "e" = edit
  function handleChoiceData(data) {
    setChoice(data);
  }

  let ScreenView = null;

  if (choice === "") {
    ScreenView = <ChoiceForm handleChoiceData={handleChoiceData} />;
  } else if (choice === "h") {
    // Home Meal
    ScreenView = (
      <HomeTakeawayForm onSaveMeal={saveMealHandler} type={"home"} />
    );
  } else if (choice === "t") {
    // TakeawayMeal
    ScreenView = (
      <HomeTakeawayForm onSaveMeal={saveMealHandler} type={"takeaway"} />
    );
  } else if (choice === "e") {
    // Edit existing meal
    ScreenView = <EditForm onSaveMeal={editMealHandler} meal={meal} />;
  }

  return (
    <Background>
      <View style={styles.container}>{ScreenView}</View>
    </Background>
  );
}

export default ManageMeal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
