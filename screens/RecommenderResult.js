import { View, Text, StyleSheet } from "react-native";
import RecommendedItem from "../components/Recommender/RecommendedItem";

function RecommenderResult({ route }) {
    const meal = route.params.meal; 
    return (
        <View>
            <RecommendedItem meal = {meal}/>
        </View>
    )
}

export default RecommenderResult;

const styles = StyleSheet.create({

})