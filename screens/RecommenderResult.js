import { View, Text, StyleSheet } from "react-native";
import RecommendedItem from "../components/Recommender/RecommendedItem";
import Background from "../components/UI/Background";
import { Colors } from "../constants/colors";

function RecommenderResult({ route, navigation }) {
  const meal = route.params.meal;

  let text;
  let item;

  if (meal === "noMeal") {
    text = (
      <Text style={styles.text}>No recommendations match your criteria :(</Text>
    );
  } else {
    text = (
        <Text style={styles.text}>Your recommendation</Text>
      );
    item =  <RecommendedItem meal={meal} onPress={onPressHandler} />
  }

  function onPressHandler(id) {
    navigation.navigate("MealDetails", { id: id });
  }

  return (
    <Background>
      <View style={styles.root}>
        <View style={styles.textContainer}>{text}</View>
        {item}
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
});
