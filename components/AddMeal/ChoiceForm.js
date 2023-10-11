import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../UI/Button";
import { useEffect, useState } from "react";

function MealForm() {
  const [choice, setChoice] = useState("");

  function choiceTakeawayHandler() {
    setChoice("t");
  }

  function choiceHomeHandler() {
    setChoice("h");
  }

  useEffect(() => {
    console.log(choice);
  }, [choice]);

  return (
    <View style={styles.root}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={choiceTakeawayHandler}
        >
          Takeaway
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={choiceHomeHandler}
        >
          Make at home
        </Button>
      </View>
    </View>
  );
}

export default MealForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: "5%"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 28,
  },
});
