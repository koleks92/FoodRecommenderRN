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
                price REAL,
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
        [meal.title, meal.type, meal.imageUri, meal.cuisne, meal.restaurant, meal.price, meal.description, meal.recipe ],
        (_, result) => {
          console.log(result);
          resolve(result)
        },
        (_, error) => {
          reject(error)
        }
      );
    });
  });
}
