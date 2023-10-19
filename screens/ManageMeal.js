// Add new meal to the database

import { StyleSheet, View } from "react-native";
import ChoiceForm from "../components/AddMeal/ChoiceForm";
import Background from "../components/UI/Background";
import { useState, useEffect } from "react";
import HomeTakeawayForm from "../components/AddMeal/HomeTakeawayForm";
import { insertMeal } from "../util/database";

function ManageMeal({ navigation, route }) {
  const [choice, setChoice] = useState("");
  const [meal, setMeal] = useState(null);

  // Check if edit meal
  if (route.params?.type) {
    useEffect(() => {
      setChoice(route.params.type);
      setMeal(route.params.meal);
      console.log("Edit")
    }, [route.params.type]);
  }

  async function editMealHandler(data) {
    navigation.navigate("AllMeals");
  }

  async function saveMealHandler(data) {
    const promise = await insertMeal(data);
    navigation.navigate("AllMeals");
  }

  function handleChoiceData(data) {
    setChoice(data);
  }

  let ScreenView;

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
    ScreenView = (
      <HomeTakeawayForm
        onSaveMeal={editMealHandler}
        type={"edit"}
        meal={meal}
      />
    );
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
