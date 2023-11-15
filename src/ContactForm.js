import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { editContact } from "../src/redux/contactAction";

const ContactForm = ({ navigation, contacts }) => {
  const route = useRoute();
  const name = route.params?.name;
  const email = route.params?.email;
  const phone = route.params?.phone;

  const handleAdd = () => {
    navigation.navigate("CreateContact");
  };
  const uniqueContacts = [
    ...new Set(contacts.map((contact) => contact.phone)),
  ].map((phone) => {
    return contacts.find((contact) => contact.phone === phone);
  });
  uniqueContacts.sort((a, b) => {
    if (a.name && b.name) {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.create} onPress={handleAdd}>
          <AntDesign name="adduser" size={20} color="black" />
          <Text style={{ color: "black", fontSize: 20 }}>Create Contact</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <FlatList
          data={uniqueContacts}
          keyExtractor={(item) => item.phone}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Details", {
                  name: item.name,
                  phone: item.phone,
                  email: item.email,
                  selectedImage: item.selectedImage,
                })
              }
              style={styles.touch}
              key={item.phone}
            >
              {item.selectedImage ? (
                <Image
                  source={{ uri: item.selectedImage }}
                  style={styles.img}
                />
              ) : (
                <FontAwesome5
                  name="user-circle"
                  size={30}
                  color="black"
                  alignSelf="center"
                />
              )}

              <Text style={styles.names} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  contacts: state.contacts,
  selectedImage: state.selectedImage,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => dispatch(addContact(contact)),
    editContact: (contact) => dispatch(editContact(contact)),
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 30,
    marginLeft: 1,
  },
  create: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
    alignSelf: "center",
  },
  container2: {
    marginTop: 10,
    marginLeft: 10,
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  names: {
    color: "black",
    fontSize: 20,
    marginTop: 10,
    justifyContent: "center",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
