import { Image, Pressable, StyleSheet, View } from "react-native";

function MealItem({ data, onPress}) {
    return (
        <Pressable
        onPress={onPress.bind(this, data.id)} 
        style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
            <Image styles={styles.image} source={{ uri: data.imageUri}} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}></Text> 
                <View style={styles.cusinePriceContainer}>
                    <Text style={styles.cusine}></Text>
                    <Text style={styles.price}></Text>
                </View>
            </View>
        </Pressable>

    )
};

export default MealItem;

const styles = StyleSheet.create({
    item: {

    },
    pressed: {

    },
    image: {

    },
    infoContainer: {

    },
    title: {

    },
    cusine: {

    },
    price: {

    },
})