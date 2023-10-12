import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { cusine, price } from "../../constants/addmeal";
import { Colors } from "../../constants/colors";

function HomeForm() {
  return (
    <ScrollView style={styles.root}>
      <View>
        <Text style={styles.labelText}> Title </Text>
        <TextInput
          style={styles.titleInput}
          autoCorrect={false}
        />
      </View>
      <View>
        <Text style={styles.labelText}> Cusine </Text>
        <SelectDropdown data={cusine} search="true" />
      </View>
      <View>
        <Text style={styles.labelText}> description </Text>
        <TextInput />
      </View>
      <View>
        <Text style={styles.labelText}>Recipe</Text>
        <TextInput />
      </View>
      <View>
        <Text style={styles.labelText}>Price Range</Text>
        <SelectDropdown data={price} />
      </View>
    </ScrollView>
  );
}

export default HomeForm;

const styles = StyleSheet.create({
  labelText: {
    color: Colors.text,
    fontSize: 16,
  },
  titleInput: {
    color: 'white',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: Colors.primary50,
    fontSize: 16,
  },
});
