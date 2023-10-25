import { View, Text, StyleSheet } from "react-native";
import RecommendedItem from "../components/Recommender/RecommendedItem";
import Background from "../components/UI/Background";
import { Colors } from "../constants/colors";
import Button from "../components/UI/Button";
import { useRecommendation } from "../store/context";

function RecommenderResult({ route, navigation }) {
  const meal = route.params.meal;
  const recommendAnother = useRecommendation();

  let text;
  let item;
  let button;

  if (meal === "noMeal") {
    text = (
      <Text style={styles.text}>No recommendations match your criteria :(</Text>
    );
  } else {
    text = <Text style={styles.text}>Your recommendation</Text>;
    item = <RecommendedItem meal={meal} onPress={onPressHandler} />;
    button = (
      <Button
        onPress={recommendAnother}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      >
        Recommend another !
      </Button>
    );
  }

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
