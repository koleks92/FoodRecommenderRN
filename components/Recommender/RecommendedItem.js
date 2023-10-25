import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { Colors } from "../../constants/colors";

function RecommendedItem({ meal, onPress }) {
  let image;

  if (meal.imageUri === "") {
    image = (
      <Image
        style={styles.image}
        source={require("../../assets/meals/no-image.jpg")}
      />
    );
  } else {
    image = <Image style={styles.image} source={{ uri: meal.imageUri }} />;
  }

  let type;
  if (meal.type === "home") {
    type = "Make-at-home";
  } else {
    type = "Takeaway";
  }


  return (
    <Pressable
      onPress={onPress.bind(this, meal.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      {image}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{meal.title}</Text>
        <Text style={styles.text}>{type}</Text>
        <Text style={styles.text}>{meal.cusine}</Text>
        <Text style={styles.text}>{meal.price}</Text>
      </View>
    </Pressable>
  );
}

export default RecommendedItem;

const styles = StyleSheet.create({
  item: {
    height: "50%",
    width: "75%",
    flexDirection: "column",
    marginBottom: 8,
    backgroundColor: Colors.primary100,
    borderRadius: 6,
    overflow: "hidden",
    elevation: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    height: "50%",
    width: "100%",
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    alignItems: 'center'
  }, 
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
    marginVertical: 12
  },
  text: {
    fontSize: 20,
    fontStyle: "italic",
  },
});
