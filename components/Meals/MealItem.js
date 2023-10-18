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

  console.log(imageUri);

  return (
    <Pressable
      onPress={onPress.bind(this, data.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      {image}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{data.title}</Text>
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
    marginHorizontal: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary100,
    borderRadius: 6,
    overflow: "hidden",
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text
  },
  cusinePriceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  cpText: {
    fontSize: 16,
    fontStyle: 'italic'
  }
});
