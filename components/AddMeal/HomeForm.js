import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { cusine, price } from "../../constants/addmeal";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import { useState } from "react";

function HomeForm() {
  const [selectedImage, setSelectedImage] = useState();

  function imageHandler() {
    setSelectedImage(image);
    console.log("IMAGE");
  }

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}> Title </Text>
          <TextInput style={styles.inputStyle} autoCorrect={false} />
        </View>
        <View style={styles.dropdownsContainer}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.labelText}>Cusine </Text>
            <SelectDropdown
              data={cusine}
              search="true"
              buttonStyle={styles.buttonDropdown}
              buttonTextStyle={styles.buttonDropdownTextStyle}
              dropdownStyle={styles.dropdownStyle}
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowTextStyle}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.labelText}>Price Range</Text>
            <SelectDropdown
              data={price}
              buttonStyle={styles.buttonDropdown}
              buttonTextStyle={styles.buttonDropdownTextStyle}
              dropdownStyle={styles.dropdownStyle}
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowTextStyle}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Description </Text>
          <TextInput
            style={styles.inputStyle}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Recipe</Text>
          <TextInput
            style={[styles.inputStyle, styles.multilineStyle]}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Image</Text>

          <ImagePicker onImageTaken={imageHandler} />
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputContainer: {
    margin: 8,
    minWidth: "90%",
  },
  dropdownsContainer: {
    flexDirection: "row",
    margin: 8,
    minWidth: "90%",
    justifyContent: "space-between",
  },
  dropdownContainer: {
    maxWidth: "48%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  labelText: {
    color: Colors.text,
    fontSize: 14,
  },
  inputStyle: {
    height: 48,
    color: Colors.text,
    paddingVertical: 0,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: Colors.primary200,
    fontSize: 16,
  },
  multilineStyle: {
    textAlignVertical: 'top',
    paddingVertical: 8,
    height: 144 
  },
  buttonDropdown: {
    backgroundColor: Colors.primary200,
    maxWidth: "100%",
    borderRadius: 4,
    height: 48,
    borderWidth: 1,
  },
  buttonDropdownTextStyle: {
    color: Colors.text,
    fontSize: 16,
  },
  dropdownStyle: {
    backgroundColor: Colors.background,
    borderRadius: 4
  },
  rowStyle: {
    borderBottomColor: 'black'
  },
  rowTextStyle: {
    color: Colors.text,
    fontSize: 15,
  },
});
