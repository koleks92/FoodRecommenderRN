import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { cusine, price } from "../../constants/meals";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { Meal } from "../../models/meal";
import { useRoute } from "@react-navigation/native";


 
function HomeTakeawayForm({ onSaveMeal, type }) {
  const [titleMeal, setTitleMeal] = useState("");
  const [cusineMeal, setCusineMeal] = useState("");
  const [priceMeal, setPriceMeal] = useState("");
  const [descriptionMeal, setDescriptionMeal] = useState("");
  const [recipeMeal, setRecipeMeal] = useState("");
  const [restaurantMeal, setRestaurantMeal] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [cusineError, setCusineError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  // Handlers
  function imageHandler(image) {
    setSelectedImage(image.uri);
  }

  function titleHandler(enteredText) {
    setTitleMeal(enteredText);
    setTitleError(false);
  }

  function cusineHandler(enteredText) {
    setCusineMeal(enteredText);
    setCusineError(false);
  }

  function priceHandler(enteredText) {
    setPriceMeal(enteredText);
    setPriceError(false);
  }

  function descriptionHandler(enteredText) {
    setDescriptionMeal(enteredText);
  }

  function recipeHandler(enteredText) {
    setRecipeMeal(enteredText);
  }

  function restaurantHandler(enteredText) {
    setRestaurantMeal(enteredText);
  }


  // Save handler + form validation
  function saveHandler() {
    if (titleMeal == "") {
      setTitleError(true);
      return;
    }

    if (cusineMeal == "") {
      setCusineError(true);
      return;
    }

    if (priceMeal == "") {
      setPriceError(true);
      return;
    }

    if (selectedImage === "") {
      setSelectedImage(null);
    }

    // Create new Meal object
    const data = new Meal(
      titleMeal,
      type,
      selectedImage,
      cusineMeal,
      restaurantMeal,
      priceMeal,
      descriptionMeal,
      recipeMeal
    );

    // Send object
    onSaveMeal(data);
  }

  // Chech if takeaway/homemade meal
  let recipeRestaurantComponent;

  if (type === "home") {
    recipeRestaurantComponent = (
      <>
        <Text style={styles.labelText}>Recipe</Text>
        <TextInput
          style={[styles.inputStyle, styles.multilineStyle]}
          multiline
          onChangeText={recipeHandler}
        />
      </>
    );
  }
  if (type === "takeaway") {
    recipeRestaurantComponent = (
      <>
        <Text style={styles.labelText}>Restaurant</Text>
        <TextInput style={styles.inputStyle} onChangeText={restaurantHandler} />
      </>
    );
  }

  // Main view
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={[styles.labelText, titleError ? styles.error : null]}> Title </Text>
          <TextInput
            style={styles.inputStyle}
            autoCorrect={false}
            onChangeText={titleHandler}
          />
        </View>
        <View style={styles.dropdownsContainer}>
          <View style={styles.dropdownContainer}>
            <Text style={[styles.labelText, cusineError ? styles.error : null]}>Cusine </Text>
            <SelectDropdown
              data={cusine}
              search="true"
              buttonStyle={styles.buttonDropdown}
              buttonTextStyle={[
                styles.buttonDropdownTextStyle,
                cusineError ? styles.buttonDropdownTextStyleError : null,
              ]}
              dropdownStyle={styles.dropdownStyle}
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowTextStyle}
              statusBarTranslucent={true}
              onSelect={(selectedItem) => cusineHandler(selectedItem)}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={[styles.labelText, priceError ? styles.error : null]}>Price Range</Text>
            <SelectDropdown
              data={price}
              buttonStyle={styles.buttonDropdown}
              buttonTextStyle={[styles.buttonDropdownTextStyle, priceError ? styles.buttonDropdownTextStyleError : null]}
              dropdownStyle={styles.dropdownStyle}
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowTextStyle}
              statusBarTranslucent={true}
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
        <View style={styles.inputContainer}>{recipeRestaurantComponent}</View>
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

export default HomeTakeawayForm;

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
  error: {
    color: Colors.error,
    fontWeight: "bold",
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
