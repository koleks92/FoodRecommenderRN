// Add new meal to the database

import { ImageBackground, StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";
import MealForm from "../components/AddMeal/MealForm";
import Background from "../components/UI/Background";

function AddMeals() {
  return (
    <Background>
      <MealForm />
    </Background>

  );
}

export default AddMeals;


