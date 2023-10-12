import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../UI/Button";
import { useEffect, useState } from "react";

function MealForm({ handleChoiceData }) {
  function choiceTakeawayHandler() {
    handleChoiceData('t')
  }

  function choiceHomeHandler() {
    handleChoiceData('h')
  }

  return (
    <View style={styles.root}>
      <Button
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        onPress={choiceTakeawayHandler}

      >
        Takeaway
      </Button>
      <Button
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        onPress={choiceHomeHandler}
      >
        Make at home
      </Button>
    </View>
  );
}

export default MealForm;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    minHeight: "25%",
  },
  button: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
