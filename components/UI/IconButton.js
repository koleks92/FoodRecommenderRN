import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress, style}) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => (pressed ? styles.pressed : null)}
      >
        <View style={[styles.buttonContainer, style ? style : null]}>
          <Ionicons name={icon} size={size} color={color} />
        </View>
      </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    marginHorizontal: 12,
    marginVertical: 6,
  },
  pressed: {
    opacity: 0.75,
  },
});
