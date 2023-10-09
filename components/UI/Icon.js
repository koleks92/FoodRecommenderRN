import { View, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({ icon, size, color, set }) {
  if (set === "i") {
    return (
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    );
  } else {
    return (
        <View style={styles.buttonContainer}>
          <MaterialCommunityIcons name={icon} size={size} color={color} />
        </View>
    );
  }
}

export default Icon;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
