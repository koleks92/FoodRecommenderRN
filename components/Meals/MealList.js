import { FlatList, StyleSheet, View, Text } from "react-native";
import MealItem from "./MealItem";
import { useNavigation } from "@react-navigation/native";

function MealList({ meals }) {
  const navigation = useNavigation();

  function selectMealHandler(id) {
    navigation.navigate("MealDetails", { id: id });
  }

  if (!meals || meals.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No meals added yet :(</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={meals}
      keyExtractor={(item, index) => {
        return item.id;
      }}
      renderItem={({ item }) => (
        <MealItem data={item} onPress={selectMealHandler} />
      )}
    />
  );
}

export default MealList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    margin: 8,
  },
  fallbackContainer: {},
  fallbackText: {},
});
