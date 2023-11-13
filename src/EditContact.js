import React, { useState } from "react";
import { View, TextInput, Image, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { editContact } from "../redux/contactAction";
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
    navigation.navigate("My Contacts");
  };

  return (
    <View style={{ marginLeft: 10 }}>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleImagePicker}
          testID="imagePickerButton"
        >
          {editedImage ? (
            <Image
              source={{ uri: editedImage }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          ) : contact.selectedImage ? (
            <Image
              source={{ uri: contact.selectedImage }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
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
      <View
        style={{
          flexDirection: "row",
          columnGap: 40,
          marginBottom: 40,
        }}
      >
        <AntDesign name="user" size={40} color="black" />

        <TextInput
          placeholder="Name"
          value={editedContact.name}
          maxLength={28}
          onChangeText={(text) =>
            setEditedContact({ ...editedContact, name: text })
          }
          style={{
            fontSize: 20,
            borderWidth: 1,
            paddingHorizontal: 40,
            color: "blue",
            width: 250,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          columnGap: 40,
          marginBottom: 10,
        }}
      >
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
          style={{
            fontSize: 20,
            borderWidth: 1,
            paddingHorizontal: 40,
            color: "blue",
            width: 250,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          columnGap: 40,
          marginBottom: 40,
          marginTop: 30,
        }}
      >
        <Feather name="phone" size={40} color="black" alignSelf="center" />

        <TextInput
          placeholder="Phone"
          value={editedContact.phone}
          maxLength={10}
          onChangeText={(text) =>
            setEditedContact({ ...editedContact, phone: text })
          }
          style={{
            fontSize: 20,
            borderWidth: 1,
            paddingHorizontal: 40,
            color: "blue",
            width: 250,
          }}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            borderRadius: 5,
            fontSize: 40,
            marginLeft: 150,
          }}
          onPress={() => handleSave()}
          testID="saveButton"
        >
          <Text
            style={{
              color: "white",
              fontSize: 30,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditContact;
