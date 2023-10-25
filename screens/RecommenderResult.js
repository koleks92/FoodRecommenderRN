import { View, Text, StyleSheet } from "react-native";
import RecommendedItem from "../components/Recommender/RecommendedItem";
import Background from "../components/UI/Background";

function RecommenderResult({ route }) {
    const meal = route.params.meal; 

    function onPressHandler(id) {
        navigation.navigate("MealDetails", { id: id });
      }

    return (
        <Background>
            <RecommendedItem meal = {meal} onPress = {onPressHandler}/>
        </Background>
    )
}

export default RecommenderResult;

const styles = StyleSheet.create({

})