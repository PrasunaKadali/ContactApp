import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { editContact } from "../src/redux/contactAction";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const EditContact = ({ route, navigation }) => {
  const { contact } = route.params;
  const [editedContact, setEditedContact] = useState(contact);
  const [editedImage, setEditedImage] = useState(contact.selectedImage || null);
  const dispatch = useDispatch();

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access photos is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setEditedImage(pickerResult.uri);
    }
  };
  const handleSave = () => {
    console.log("Edited Contact before update:", editedContact);
    const updatedContact = {
      ...editedContact,
      selectedImage: editedImage,
    };
    console.log("Updated Contact:", updatedContact);
    dispatch(editContact(updatedContact));
    navigation.navigate("MyContacts");
  };

  return (
    <View style={{ marginLeft: 10 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleImagePicker}
          testID="imagePickerButton"
        >
          {editedImage ? (
            <Image source={{ uri: editedImage }} style={styles.img1} />
          ) : contact.selectedImage ? (
            <Image
              source={{ uri: contact.selectedImage }}
              style={styles.img2}
            />
          ) : (
            <FontAwesome5
              name="user-circle"
              size={50}
              color="black"
              alignSelf="center"
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <AntDesign name="user" size={40} color="black" />

        <TextInput
          placeholder="Name"
          value={editedContact.name}
          maxLength={28}
          onChangeText={(text) =>
            setEditedContact({ ...editedContact, name: text })
          }
          style={styles.data}
        />
      </View>
      <View style={styles.container2}>
        <MaterialCommunityIcons
          name="email-outline"
          size={40}
          color="black"
          alignSelf="center"
        />

        <TextInput
          placeholder="Email"
          value={editedContact.email}
          maxLength={40}
          onChangeText={(text) =>
            setEditedContact({ ...editedContact, email: text })
          }
          style={styles.data}
        />
      </View>

      <View style={styles.container2}>
        <Feather name="phone" size={40} color="black" alignSelf="center" />

        <TextInput
          placeholder="Phone"
          value={editedContact.phone}
          maxLength={10}
          onChangeText={(text) =>
            setEditedContact({ ...editedContact, phone: text })
          }
          style={styles.data}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <TouchableOpacity
          style={styles.save}
          onPress={() => handleSave()}
          testID="saveButton"
        >
          <Text style={styles.savetext}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  container2: {
    flexDirection: "row",
    columnGap: 40,
    marginBottom: 40,
  },
  data: {
    fontSize: 20,
    borderWidth: 1,
    paddingHorizontal: 40,
    color: "blue",
    width: 250,
  },
  save: {
    backgroundColor: "blue",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
    fontSize: 40,
    marginLeft: 150,
  },
  savetext: {
    color: "white",
    fontSize: 30,
  },
  img1: { width: 100, height: 100, borderRadius: 50 },
  img2: { width: 50, height: 50, borderRadius: 50 },
});
export default EditContact;
