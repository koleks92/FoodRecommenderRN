import { View, Alert, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import Button from "../UI/Button";

function ImagePicker({ onImageTaken }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [cameraPhoto, setCameraPhoto] = useState();

  async function verifyPermissions() {
    console.log(cameraPermissionInformation.status);

    if (
      cameraPermissionInformation.status === PermissionStatus.UNDETERMINED ||
      cameraPermissionInformation.status === PermissionStatus.DENIED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setCameraPhoto(image.assets[0]);
    onImageTaken(image.assets[0]);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (cameraPhoto) {
    imagePreview = (
      <Image source={{ uri: cameraPhoto.uri }} style={styles.image} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        onPress={takeImageHandler}
      >
        Take Image
      </Button>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    height: 200,
    width: "100%",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary200,
    borderRadius: 4,
    elevation: 4,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 4,

  },
  button: {
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
