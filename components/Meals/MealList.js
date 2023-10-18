import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "./MealItem";

function MealList({ meals }) {
    function selectMealHandler(id) {
        console.log("YES!")
    }

    if (!meals || meals.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>
                    No meals added yet :(
                </Text>
            </View>
        )
    }

  return (
    <FlatList
      style={styles.list}
      data={meals}
      keyExtractor={(item, index) => {
        return item.id;
      }}
      renderItem={({ item }) => (
        <MealItem place={item} onPress={selectMealHandler} />
      )}
    />
  );
}

export default MealList;

const styles = StyleSheet.create({
  list: {},
  fallbackContainer: {},
  fallbackText: {}
});
