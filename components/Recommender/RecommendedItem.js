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

    return (
        <Pressable
          onPress={onPress.bind(this, meal.id)}
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        >
          {image}
          <View style={styles.infoContainer}>
            <View style={styles.titleTypeContainer}>
              <Text style={styles.title}>{meal.title}</Text>
              <Text style={styles.type}>{meal.type}</Text>
            </View>
            <View style={styles.cusinePriceContainer}>
              <Text style={styles.cpText}>{meal.cusine}</Text>
              <Text style={styles.cpText}>{meal.price}</Text>
            </View>
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
        height: "50%",
        width: "100%"
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
