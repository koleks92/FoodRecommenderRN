import { FlatList, StyleSheet, View, Text } from "react-native";
import MealItem from "./MealItem";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";

function MealList({ meals }) {


  if (!meals || meals.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No meals added yet :(</Text>
        <Text style={styles.fallbackText}>Add some now :)</Text>
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
        <MealItem data={item}/>
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
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    marginVertical: 12,
    color: Colors.text,
    fontSize: 24
  },
});
