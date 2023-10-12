import { Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ children, onPress, buttonStyle, textStyle }) {
  return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.button, buttonStyle, pressed ? styles.pressed : null]}
      >
          <Text style={textStyle}>{children}</Text>
      </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        flex:1,
        borderRadius: 4,
        padding: 8,
        backgroundColor: Colors.primary100,
        elevation: 4,
    },
    pressed: {
        opacity: 0.5,
        backgroundColor: Colors.primary50,
        borderRadius: 4
    }
});
