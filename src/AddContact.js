import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { addContact } from "../src/redux/contactAction";
import { connect, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { addImage } from "../src/redux/contactAction";

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

    navigation.navigate("MyContacts", {
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
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.img} />
          ) : imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.img} />
          ) : (
            <Feather name="camera" size={50} color="black" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.container3}>
        <AntDesign name="user" size={40} color="black" />

        <TextInput
          placeholder="Name"
          value={name}
          maxLength={28}
          onChangeText={(text) => setName(text)}
          style={styles.texting}
        />
      </View>
      <View style={styles.container3}>
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
          style={styles.texting}
        />
      </View>
      {!isValidEmail && <Text style={styles.emails}>Invalid Email</Text>}
      <View style={styles.container3}>
        <Feather name="phone" size={40} color="black" alignSelf="center" />

        <TextInput
          placeholder="Phone"
          value={phone}
          maxLength={10}
          keyboardType="phone-pad"
          onChangeText={(text) => onChanged(text)}
          style={styles.texting}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.save}
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

const styles = StyleSheet.create({
  container: { marginLeft: 10 },
  container2: {
    justifyContent: "centre",
    alignContent: "centre",
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  container3: {
    flexDirection: "row",
    columnGap: 40,
    marginBottom: 40,
  },
  texting: {
    fontSize: 20,
    color: "blue",
    borderWidth: 1,
    paddingHorizontal: 40,
    width: 250,
  },
  emails: {
    color: "red",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 120,
  },
  save: {
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
  },
});

export default connect(null, mapDispatchToProps)(AddContact);
