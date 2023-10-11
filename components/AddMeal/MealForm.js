import { View, Text, StyleSheet} from "react-native";
import { Colors } from "../../constants/colors";

function MealForm() {
    return (
        <View>
            <Text style={styles.titleText}> Meal Form</Text>
        </View>
    )
};

export default MealForm;

const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: Colors.background,
      opacity: 0.99,
      padding: 24
    },
    titleText: {
        color: Colors.text,
        fontSize: 16
    }
  })