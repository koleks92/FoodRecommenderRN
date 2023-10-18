// Meal Details page

import { View, Text } from "react-native";
import Background from "../components/UI/Background";

function MealDetails({ route }) {
  const mealId = route.params.id;
  return (
    <Background>
      <View>
        <Text>MealDetails {route.params.id}</Text>
      </View>
    </Background>
  );
}

export default MealDetails;
