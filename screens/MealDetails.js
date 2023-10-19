// Meal Details page

import { View, Text, StyleSheet, Image, Alert } from "react-native";
import Background from "../components/UI/Background";
import { fetchMeal, removeMeal } from "../util/database";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "../constants/colors";
import IconButton from "../components/UI/IconButton";

function MealDetails({ route, navigation }) {
  const mealId = route.params.id;

  const [loadedMeal, setLoadedMeal] = useState([]);

  async function removeFromDatabase() {
    await removeMeal(mealId);
    navigation.navigate("AllMeals");
  }

  function remove() {
    Alert.alert(`Remove ${loadedMeal.title}`,
    'Are you sure that you want to remove this meal ?',
    [{text: 'NO', onPress: () => { return }, style: 'cancel'},
  {text: 'YES', onPress: () => removeFromDatabase() }])
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadMeal() {
      const meal = await fetchMeal(mealId);
      setLoadedMeal(meal);
      navigation.setOptions({
        title: meal.title,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="trash-outline"
            size={24}
            color={tintColor}
            onPress={() => {
              remove()

            }}
          />
        )
      });
    }
    if (isFocused) {
      loadMeal();
    }
  }, [isFocused]);

  let image;
  if (loadedMeal.imageUri === "") {
    image = (
      <Image
        style={styles.image}
        source={require("../assets/meals/no-image.jpg")}
      />
    );
  } else {
    image = <Image style={styles.image} source={{ uri: loadedMeal.imageUri }} />;
  }

  let description;
  if (loadedMeal.description || loadedMeal.description !== '') {
    description = <View style={styles.descriptionContainer}>
      <Text style={styles.description}>{loadedMeal.description}</Text>
    </View>
  }

  let recipe;
  if (loadedMeal.recipe || loadedMeal.recipe !== '') {
    recipe = <View style={styles.recipeContainer}>
      <Text style={styles.recipe}>{loadedMeal.recipe}</Text>
    </View>
  }

  let restaurant;
  if (loadedMeal.restaurant || loadedMeal.restaurant !== '') {
    restaurant = <View style={styles.restaurantContainer}>
      <Text style={styles.restaurant}>{loadedMeal.restaurant}</Text>
    </View>
  }

  return (
    <Background>
      <View style={styles.root}>
      {image}
      <View style={styles.cusinePriceContainer}>
        <Text style={styles.cpText}>{loadedMeal.cusine}</Text>
        <Text style={styles.cpText}>{loadedMeal.price}</Text>
      </View>
      {description}
      {recipe}
      {restaurant}

      </View>
    </Background>
  );
}

export default MealDetails;

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  image: {
    height: '35%',
    minHeight: 250,
    width: "100%",
  },
  cusinePriceContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  cpText: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    margin: 4,
    padding: 12
  },
  description: {
    color: Colors.text,
    fontSize: 18
  },
  recipeContainer: {
    margin: 4,
    padding: 12
  },
  recipe: {
    color: Colors.text,
    fontSize: 16
  },
  restaurantContainer: {
    margin: 4,
    padding: 12
  },
  restaurant: {
    color: Colors.text,
    fontSize: 18
  },
  
})