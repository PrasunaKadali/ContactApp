import React from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addImage } from "../src/redux/contactAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const imageUri = useSelector((state) => state.image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      dispatch(addImage(uri));
      navigation.navigate("CreateContact", { selectedImage: uri });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.img} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  img: { width: 200, height: 200 },
});
export default Profile;
