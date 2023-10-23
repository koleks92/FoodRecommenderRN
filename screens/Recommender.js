// Recommender for food

import { View, Text, StyleSheet } from "react-native";
import Background from "../components/UI/Background";
import RecommenderForm from "../components/Recommender/RecommenderForm";

function Recommender() {
  return (
    <Background>
      <RecommenderForm />
    </Background>
  );
}

export default Recommender;
