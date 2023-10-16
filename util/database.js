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
          meal.cuisne,
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
                meal.cuisne,
                meal.restaurant,
                meal.price,
                meal.description,
                meal.recipe
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
