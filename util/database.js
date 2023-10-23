// DATABASE FILE
import * as SQlite from "expo-sqlite";
import { Meal } from "../models/meal";

const database = SQlite.openDatabase("meals.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS meals (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                type TEXT NOT NULL,
                imageUri TEXT,
                cusine TEXT,
                restaurant TEXT,
                price TEXT,
                description TEXT,
                recipe TEXT
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertMeal(meal) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO meals (title, type, imageUri, cusine, restaurant, price, description, recipe) VALUES (?, ?, ?, ?, ?, ?, ? ,?)`,
        [
          meal.title,
          meal.type,
          meal.imageUri,
          meal.cusine,
          meal.restaurant,
          meal.price,
          meal.description,
          meal.recipe,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function fetchAllMeals() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meals",
        [],
        (_, result) => {
          const meals = [];
          for (const meal of result.rows._array) {
            meals.push(
              new Meal(
                meal.title,
                meal.type,
                meal.imageUri,
                meal.cusine,
                meal.restaurant,
                meal.price,
                meal.description,
                meal.recipe,
                meal.id
              )
            );
          }
          resolve(meals);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function fetchMeals(typeOfMeal) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meals WHERE type = ?",
        [typeOfMeal],
        (_, result) => {
          const meals = [];
          for (const meal of result.rows._array) {
            meals.push(
              new Meal(
                meal.title,
                meal.type,
                meal.imageUri,
                meal.cusine,
                meal.restaurant,
                meal.price,
                meal.description,
                meal.recipe,
                meal.id
              )
            );
          }
          resolve(meals);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function fetchMeal(id) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM meals WHERE id = ?",
        [id],
        (_, result) => {
          const resultMeal = result.rows._array[0];
          const meal = new Meal(
            resultMeal.title,
            resultMeal.type,
            resultMeal.imageUri,
            resultMeal.cusine,
            resultMeal.restaurant,
            resultMeal.price,
            resultMeal.description,
            resultMeal.recipe,
            resultMeal.id
          );
          resolve(meal);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function removeMeal(id) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM meals WHERE id = ?",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function updateMeal(meal) {
  console.log(meal.id)
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "UPDATE meals SET title = ?, imageUri = ?, cusine = ?, restaurant = ?, price = ?, description = ?, recipe = ? WHERE id = ?",
        [
          meal.title,
          meal.imageUri,
          meal.cusine,
          meal.restaurant,
          meal.price,
          meal.description,
          meal.recipe,
          meal.id,
        ],
        (_, result) => {
          if (result.rowsAffected > 0) {
            resolve("Meal updated successfully");
          } else {
            reject("No meal was updated. Meal with the specified ID not found.");
          }
        },
        (_, error) => {
          reject("Error updating meal: " + error.message);
        }
      );
    });
  });
}
