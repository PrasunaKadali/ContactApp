import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { editContact, deleteContact } from "../redux/contactAction";
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
      navigation.navigate("Edit Contact", {
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
      navigation.navigate("My Contacts");
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
            navigation.navigate("My Contacts", {
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
            style={{
              width: 1,
              height: 1,
            }}
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
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
              }}
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
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 25,
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            columnGap: 10,
            marginLeft: 10,
          }}
        >
          <FontAwesome5
            name="phone-alt"
            size={20}
            color="black"
            alignSelf="center"
          />

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 18,
              }}
            >
              {phone}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
              }}
            >
              PhoneNumber
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            columnGap: 10,
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
            alignSelf="center"
          />

          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
              }}
            >
              {email}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 15,
              }}
            >
              Email
            </Text>
          </View>
        </View>
        {menuOpen && (
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              testID="edit-contact-button"
              style={{
                marginTop: 10,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                borderRadius: 5,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "black",
                }}
                onPress={() => handleEdit(phone)}
              >
                Edit Contact
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="delete-contact-button"
              style={{
                marginTop: 10,
                width: 120,
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "black",
                }}
                onPress={() => handleDelete(phone)}
              >
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
