import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { editContact, deleteContact } from "../src/redux/contactAction";
import { connect, useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const ContactsList = ({ navigation, route, deleteContact, contacts }) => {
  const { name, email, phone, selectedImage } = route.params;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEdit = (contactPhone) => {
    const contact = contacts.find((contact) => contact.phone === contactPhone);
    if (contact) {
      navigation.navigate("EditContact", {
        contact,
        selectedImage: contact.selectedImage,
      });
    }
  };
  const dispatch = useDispatch();
  const handleDelete = (contactPhone) => {
    const contact = contacts.find((contact) => contact.phone === contactPhone);
    if (contact) {
      dispatch(deleteContact(contact));
      navigation.navigate("MyContacts");
    }
  };

  return (
    <View style={{ marginLeft: 10 }}>
      <View style={{ marginLeft: 350 }}>
        <TouchableOpacity
          onPress={() => setMenuOpen(!menuOpen)}
          testID="toggle-menu-button"
        >
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyContacts", {
              name,
              email,
              phone,
            })
          }
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3771/3771518.png",
            }}
            style={styles.img1}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          {selectedImage ? (
            <Image
              source={{
                uri: selectedImage,
              }}
              style={styles.img2}
            />
          ) : (
            <FontAwesome5
              name="user-circle"
              size={90}
              color="black"
              alignSelf="center"
              marginTop="10"
            />
          )}
        </View>
        <View>
          <Text style={styles.names}>{name}</Text>
        </View>
        <View style={styles.conatiner}>
          <FontAwesome5
            name="phone-alt"
            size={20}
            color="black"
            alignSelf="center"
          />

          <View style={styles.conatiner2}>
            <Text style={styles.text1}>{phone}</Text>
            <Text style={styles.text2}>PhoneNumber</Text>
          </View>
        </View>
        <View style={styles.conatiner}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
            alignSelf="center"
          />

          <View style={styles.conatiner2}>
            <Text style={styles.text1}>{email}</Text>
            <Text style={styles.text2}>Email</Text>
          </View>
        </View>
        {menuOpen && (
          <View style={styles.menus}>
            <TouchableOpacity
              testID="edit-contact-button"
              style={styles.button}
            >
              <Text style={styles.buttext} onPress={() => handleEdit(phone)}>
                Edit Contact
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="delete-contact-button"
              style={styles.button}
            >
              <Text style={styles.buttext} onPress={() => handleDelete(phone)}>
                Delete Contact
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  contacts: state.contacts,
  contactId: state.contactId,
  updatedInfo: state.updatedInfo,
});
const mapDispatchToProps = {
  editContact,
  deleteContact,
};

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    marginTop: 15,
    columnGap: 10,
    marginLeft: 10,
  },
  conatiner2: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 10,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttext: {
    color: "black",
  },
  text1: {
    color: "black",
    fontSize: 18,
  },
  text2: {
    color: "black",
    fontSize: 15,
  },
  names: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
    justifyContent: "center",
  },
  menus: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  img1: { width: 1, height: 1 },
  img2: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
