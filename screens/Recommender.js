// Recommender for food

import { View, Text, StyleSheet } from "react-native";
import Background from "../components/UI/Background";
import RecommenderForm from "../components/Recommender/RecommenderForm";
import { useState } from "react";

function Recommender() {
  const [options, setOptions] = useState("");

  function getOptionsHandler(searchOptions) {
    setOptions(searchOptions);
  }

  let ScreenView;

  if (options === "") {
    ScreenView = <RecommenderForm setSearchOptions={getOptionsHandler} />;
  } else {
    ScreenView = <Text>Result</Text>
  }

  return (
    <Background>
      {ScreenView}
    </Background>
  );
}

export default Recommender;
