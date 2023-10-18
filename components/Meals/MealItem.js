import { Image, Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/colors";

function MealItem({ data, onPress }) {
  let image;

  if (data.imageUri === "") {
    image = (
      <Image
        style={styles.image}
        source={require("../../assets/meals/no-image.jpg")}
      />
    );
  } else {
    image = <Image style={styles.image} source={{ uri: data.imageUri }} />;
  }

  let type;
  if (data.type === "home") {
    type = "Make-at-home";
  } else {
    type = "Takeaway";
  }

  return (
    <Pressable
      onPress={onPress.bind(this, data.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      {image}
      <View style={styles.infoContainer}>
        <View style={styles.titleTypeContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
        <View style={styles.cusinePriceContainer}>
          <Text style={styles.cpText}>{data.cusine}</Text>
          <Text style={styles.cpText}>{data.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default MealItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    height: 120,
    width: 120,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
  },
  titleTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  cusinePriceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  cpText: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
