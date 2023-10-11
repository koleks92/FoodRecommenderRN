// Meal Details page

import { View, Text } from "react-native";
import Background from "../components/UI/Background";

function MealDetails(id) {
  return (
    <Background>
      <View>
        <Text>MealDetails {id}</Text>
      </View>
    </Background>
  );
}

export default MealDetails;
