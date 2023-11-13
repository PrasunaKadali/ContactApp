import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { editContact } from "../redux/contactAction";

const ContactForm = ({ navigation, contacts, editContact }) => {
  const route = useRoute();
  const name = route.params?.name;
  const email = route.params?.email;
  const phone = route.params?.phone;

  const handleAdd = () => {
    navigation.navigate("Create Contact");
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
  // console.log("Unique Contacts:", uniqueContacts);

  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          marginTop: 30,
          marginLeft: 1,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            columnGap: 5,
            alignSelf: "center",
          }}
          onPress={handleAdd}
        >
          <AntDesign name="adduser" size={20} color="black" />
          <Text style={{ color: "black", fontSize: 20 }}>Create Contact</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 10,
          marginLeft: 10,
        }}
      >
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
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
              }}
              key={item.phone}
            >
              {/* {updatedContact && updatedContact.item.selectedImage ? (
                <Image
                  source={{ uri: updatedContact.item.selectedImage }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 25,
                  }}
                />
              ) : (
                <FontAwesome5
                  name="user-circle"
                  size={30}
                  color="black"
                  alignSelf="center"
                />
              )} */}
              {item.selectedImage ? (
                <Image
                  source={{ uri: item.selectedImage }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 25,
                  }}
                />
              ) : (
                <FontAwesome5
                  name="user-circle"
                  size={30}
                  color="black"
                  alignSelf="center"
                />
              )}

              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  marginTop: 10,
                  justifyContent: "center",
                }}
                numberOfLines={1}
              >
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
