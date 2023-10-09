import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function MealForm() {
    return (
        <View style={styles.root}>
            <Text> Meal Form</Text>
        </View>
    )
};

export default MealForm;

const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: Colors.background   
    }
  })