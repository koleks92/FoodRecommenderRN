import { Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ children, onPress, style, textStyle }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => (pressed ? styles.pressed : null)}
      >
        <View style={styles.button}>
          <Text style={textStyle}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: Colors.primary100,
        elevation: 4
    },
    pressed: {
        opacity: 0.5,
        backgroundColor: Colors.primary50,
        borderRadius: 4
    }
});
