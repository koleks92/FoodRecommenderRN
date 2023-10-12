// Add new meal to the database

import { StyleSheet, View } from "react-native";
import ChoiceForm from "../components/AddMeal/ChoiceForm";
import Background from "../components/UI/Background";

function AddMeals() {
  return (
    <Background>
      <View style={styles.container}>
        <ChoiceForm />
      </View>
    </Background>
  );
}

export default AddMeals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})