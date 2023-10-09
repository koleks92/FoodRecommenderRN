// DATABASE FILE
import * as SQlite from "expo-sqlite";

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
