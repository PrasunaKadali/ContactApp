import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { addContact } from "../redux/contactAction";
import { connect, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { addImage } from "../redux/contactAction";

const AddContact = ({ navigation, addContact, route }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const selectedImage = route.params?.selectedImage ?? null;

  const dispatch = useDispatch();
  const imageUri = useSelector((state) => state.image);

  const handleSaveContact = () => {
    if (!name || !phone || !email) {
      Alert.alert("Error", "Please Fillout all fields.");
      return;
    }

    const contact = {
      id: Date.now(),
      name,
      phone,
      email,
    };
    dispatch(addContact(contact, selectedImage));
    setName("");
    setEmail("");
    setPhone("");
    if (selectedImage) {
      dispatch(addImage(selectedImage));
    }

    navigation.navigate("My Contacts", {
      name: name,
      email: email,
      phone: phone,
      selectedImage: selectedImage,
    });
  };

  const onChanged = (text) => {
    setPhone(text.replace(/[^0-9]/g, ""));
  };

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };

  return (
    <View style={{ marginLeft: 10 }}>
      <View
        style={{
          justifyContent: "centre",
          alignContent: "centre",
          marginBottom: 20,
          marginTop: 20,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          ) : imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          ) : (
            <Feather name="camera" size={50} color="black" />
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
          value={name}
          maxLength={28}
          onChangeText={(text) => setName(text)}
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
          value={email}
          maxLength={40}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            fontSize: 20,
            color: "blue",
            borderWidth: 1,
            paddingHorizontal: 40,
            width: 250,
          }}
        />
      </View>
      {!isValidEmail && (
        <Text
          style={{
            color: "red",
            justifyContent: "center",
            alignContent: "center",
            marginLeft: 120,
          }}
        >
          Invalid Email
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          columnGap: 40,
          marginBottom: 40,
        }}
      >
        <Feather name="phone" size={40} color="black" alignSelf="center" />

        <TextInput
          placeholder="Phone"
          value={phone}
          maxLength={10}
          keyboardType="phone-pad"
          onChangeText={(text) => onChanged(text)}
          style={{
            fontSize: 20,
            color: "blue",
            borderWidth: 1,
            paddingHorizontal: 40,
            width: 250,
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            borderRadius: 5,
            fontSize: 40,
            alignSelf: "center",
            borderWidth: 1,
            marginLeft: 30,
            marginRight: 20,
          }}
          onPress={() => handleSaveContact()}
        >
          <Text
            style={{
              color: "black",
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

const mapDispatchToProps = {
  addContact,
};

export default connect(null, mapDispatchToProps)(AddContact);
