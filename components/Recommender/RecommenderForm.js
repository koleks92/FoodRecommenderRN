import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../../constants/colors";
import { cusine, price } from "../../constants/meals";
import Button from "../UI/Button";
import React, { useState, useEffect, useRef } from "react";

function RecommenderForm({ setSearchOptions }) {
  const [active, setActive] = useState(false);
  const [takeaway, setTakeaway] = useState(false);
  const [home, setHome] = useState(true);
  const [cusineChoice, setCusineChoice] = useState(false);
  const [priceChoice, setPriceChoice] = useState(false);

  let transformX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      setTakeaway(true);
      setHome(false);
    } else {
      setHome(true);
      setTakeaway(false);
    }
  }, [active]);

  useEffect(() => {
    if (active) {
      Animated.timing(transformX, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(transformX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [active]);

  const rotationX = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [1, Dimensions.get("screen").width / 2 - 48 - 3],
  });

  function cusineHandler(cusine) {
    setCusineChoice(cusine);
  }

  function priceHandler(price) {
    setPriceChoice(price);
  }

  function searchHandler() {
    setSearchOptions([
      {
        takeaway: takeaway,
        home: home,
        cusineChosen: cusineChoice,
        priceChosen: priceChoice,
      },
    ]);
  }

  return (
    <View style={styles.root}>
      <Text style={styles.labelText}>Type</Text>
      <View style={styles.typeContainer}>
        <Animated.View
          style={{
            position: "absolute",
            height: 50 - 3 * 2,
            top: 1,
            bottom: 1,
            borderRadius: 14,
            width: Dimensions.get("screen").width / 2 - 48,
            transform: [
              {
                translateX: rotationX,
              },
            ],
            backgroundColor: Colors.background,
          }}
        ></Animated.View>
        <TouchableOpacity
          style={styles.typeOption}
          onPress={() => setActive(false)}
        >
          <Text style={styles.labelText}>Make-at-home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeOption}
          onPress={() => setActive(true)}
        >
          <Text style={styles.labelText}>Takeaway</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.choiceContainer}>
        <Text style={styles.labelText}>Cusine</Text>
        <SelectDropdown
          data={cusine}
          search="true"
          buttonStyle={styles.buttonDropdown}
          buttonTextStyle={styles.buttonDropdownTextStyle}
          dropdownStyle={styles.dropdownStyle}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.rowTextStyle}
          statusBarTranslucent={true}
          onSelect={(selectedItem) => cusineHandler(selectedItem)}
        />
      </View>
      <View style={styles.choiceContainer}>
        <Text style={styles.labelText}>Price Range</Text>
        <SelectDropdown
          data={price}
          buttonStyle={styles.buttonDropdown}
          buttonTextStyle={styles.buttonDropdownTextStyle}
          dropdownStyle={styles.dropdownStyle}
          rowStyle={styles.rowStyle}
          rowTextStyle={styles.rowTextStyle}
          statusBarTranslucent={true}
          onSelect={(selectedItem) => priceHandler(selectedItem)}
        />
      </View>
      <View style={styles.searchButtonContainer}>
        <Button
          onPress={searchHandler}
          buttonStyle={styles.searchButton}
          textStyle={styles.searchText}
        >
          Recommend !
        </Button>
      </View>
    </View>
  );
}

export default RecommenderForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  typeContainer: {
    flexDirection: "row",
    position: "relative",
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.primary100,
    marginHorizontal: 48,
    borderWidth: 1,
    marginVertical: 12,
  },
  typeOption: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  choiceContainer: {
    marginVertical: 12,
  },
  labelText: {
    color: Colors.text,
    fontSize: 18,
    textAlign: "center",
  },
  buttonDropdown: {
    backgroundColor: Colors.primary200,
    maxWidth: "100%",
    borderRadius: 16,
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
    borderRadius: 16,
  },
  rowStyle: {
    borderBottomColor: "black",
  },
  rowTextStyle: {
    color: Colors.text,
    fontSize: 15,
  },
  searchButtonContainer: {
    height: 48,
    marginVertical: 12,
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    elevation: 4,
    backgroundColor: Colors.primary300,
    width: "100%",
  },
  searchText: {
    marginHorizontal: 14,
    fontSize: 20,
    fontWeight: "bold",
  },
});
