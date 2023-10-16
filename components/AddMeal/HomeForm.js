import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { cusine, price } from "../../constants/meals";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import { useState } from "react";
import Button from "../UI/Button";
import { Meal } from "../../models/meal";

function HomeForm({ onSaveMeal }) {
  const [titleMeal, setTitleMeal] = useState("");
  const [cusineMeal, setCusineMeal] = useState("");
  const [priceMeal, setPriceMeal] = useState("");
  const [descriptionMeal, setDescriptionMeal] = useState("");
  const [recipeMeal, setRecipeMeal] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  function imageHandler(image) {
    setSelectedImage(image.uri);
  }

  function titleHandler(enteredText) {
    setTitleMeal(enteredText);
  }

  function cusineHandler(enteredText) {
    setCusineMeal(enteredText);
  }

  function priceHandler(enteredText) {
    setPriceMeal(enteredText);
  }

  function descriptionHandler(enteredText) {
    setDescriptionMeal(enteredText);
  }

  function recipeHandler(enteredText) {
    setRecipeMeal(enteredText);
  }

  function saveHandler() {
    if (selectedImage === "") {
      setSelectedImage(null);
    }

    const data = new Meal(
      titleMeal,
      "home",
      selectedImage,
      cusineMeal,
      null,
      priceMeal,
      descriptionMeal,
      recipeMeal
    );

    console.log(data.id);
    onSaveMeal(data);
  }

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}> Title </Text>
          <TextInput
            style={styles.inputStyle}
            autoCorrect={false}
            onChangeText={titleHandler}
            value={titleMeal}
          />
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
              onSelect={(selectedItem) => cusineHandler(selectedItem)}
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
              onSelect={(selectedItem) => priceHandler(selectedItem)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Description </Text>
          <TextInput
            style={styles.inputStyle}
            multiline
            onChangeText={descriptionHandler}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Recipe</Text>
          <TextInput
            style={[styles.inputStyle, styles.multilineStyle]}
            multiline
            onChangeText={recipeHandler}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Image</Text>
          <ImagePicker onImageTaken={imageHandler} />
        </View>
        <View style={styles.inputContainer}>
          <Button
            onPress={saveHandler}
            buttonStyle={styles.saveButton}
            textStyle={styles.saveText}
          >
            Save
          </Button>
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
    elevation: 4,
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
    elevation: 4,
  },
  multilineStyle: {
    textAlignVertical: "top",
    paddingVertical: 8,
    height: 144,
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
    position: "absolute",
    backgroundColor: Colors.background,
    borderRadius: 4,
  },
  rowStyle: {
    borderBottomColor: "black",
  },
  rowTextStyle: {
    color: Colors.text,
    fontSize: 15,
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    elevation: 4,
    backgroundColor: Colors.primary300,
    maxWidth: "25%",
    marginHorizontal: "37.5%",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
