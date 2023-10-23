// Recommender for food

import { View, Text, StyleSheet } from "react-native";
import Background from "../components/UI/Background";
import RecommenderForm from "../components/Recommender/RecommenderForm";

function Recommender() {
  function getOptionsHandler(options) {
    console.log(options);
  }

  return (
    <Background>
      <RecommenderForm setSearchOptions={getOptionsHandler}/>
    </Background>
  );
}

export default Recommender;
