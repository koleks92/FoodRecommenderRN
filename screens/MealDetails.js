// Meal Details page

import { View, Text, StyleSheet, Image, Alert } from "react-native";
import Background from "../components/UI/Background";
import { fetchMeal, removeMeal } from "../util/database";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Colors } from "../constants/colors";
import IconButton from "../components/UI/IconButton";

function LoadingScreen() {
  return (
    <>
      <Text style={styles.loadingText}>Loading...</Text>
    </>
  );
}

function MealDetails({ route, navigation }) {
  const mealId = route.params.id;

  const [loadedMeal, setLoadedMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Remove function
  async function removeFromDatabase() {
    await removeMeal(mealId);
    navigation.navigate("AllMeals");
  }

  // Remove button handler
  function remove(meal) {
    Alert.alert(
      `Remove ${meal.title}`,
      "Are you sure that you want to remove this meal ?",
      [
        {
          text: "NO",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        { text: "YES", onPress: () => removeFromDatabase() },
      ]
    );
  }

  // Edit button handler
  function edit(meal) {
    navigation.navigate("ManageMeal", { loadedMeal: meal, type: "e" });
  }

  // If focused again, reload meal
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadMeal() {
      try {
        const meal = await fetchMeal(mealId);
        setLoadedMeal(meal);
        if (meal) {
          navigation.setOptions({
            title: meal.title,
            headerRight: ({ tintColor }) => (
              <>
                <IconButton
                  icon="pencil-outline"
                  style={styles.headerButton}
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    edit(meal);
                  }}
                />
                <IconButton
                  icon="trash-outline"
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    remove(meal);
                  }}
                />
              </>
            ),
          });
        }
        setIsLoading(false); // Mark loading as complete
      } catch (error) {
        console.error("Error fetching meal:", error);
      }
    }
    if (isFocused) {
      loadMeal();
    }
  }, [isFocused]);

  // Set image if avaliable
  let image;
  if (loadedMeal.imageUri === "") {
    image = (
      <Image
        style={styles.image}
        source={require("../assets/meals/no-image.jpg")}
      />
    );
  } else {
    image = (
      <Image style={styles.image} source={{ uri: loadedMeal.imageUri }} />
    );
  }

  // Set description if avaliable
  let description;
  if (loadedMeal.description || loadedMeal.description !== "") {
    description = (
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{loadedMeal.description}</Text>
      </View>
    );
  }

  // Set recipe if avaliable
  let recipe;
  if (loadedMeal.recipe || loadedMeal.recipe !== "") {
    recipe = (
      <View style={styles.recipeContainer}>
        <Text style={styles.recipe}>{loadedMeal.recipe}</Text>
      </View>
    );
  }

  // Set restaurant if avaliable
  let restaurant;
  if (loadedMeal.restaurant || loadedMeal.restaurant !== "") {
    restaurant = (
      <View style={styles.restaurantContainer}>
        <Text style={styles.restaurant}>{loadedMeal.restaurant}</Text>
      </View>
    );
  }

  return (
    <Background>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.root}>
          <View style={styles.imageContainer}>{image}</View>
          <View style={styles.cusinePriceContainer}>
            <Text style={styles.cpText}>{loadedMeal.cusine}</Text>
            <Text style={styles.cpText}>{loadedMeal.price}</Text>
          </View>
          {description}
          {recipe}
          {restaurant}
        </View>
      )}
    </Background>
  );
}

export default MealDetails;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 32,
    color: Colors.text,
  },
  headerButton: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  imageContainer: {
    height: "35%",
    minHeight: 250,
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderColor: "black",
    borderBottomWidth: 1,
  },
  cusinePriceContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cpText: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
  },
  descriptionContainer: {
    margin: 4,
    padding: 12,
  },
  description: {
    color: Colors.text,
    fontSize: 18,
  },
  recipeContainer: {
    margin: 4,
    padding: 12,
  },
  recipe: {
    color: Colors.text,
    fontSize: 16,
  },
  restaurantContainer: {
    margin: 4,
    padding: 12,
  },
  restaurant: {
    color: Colors.text,
    fontSize: 18,
  },
});
