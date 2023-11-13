import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import ContactsList from "./src/ContactList";
import AddContact from "./src/AddContact";
import EditContact from "./src/EditContact";
import ContactForm from "./src/ContactForm";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import Profile from "./src/Profile";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate Loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="My Contacts">
            <Stack.Screen
              name="Details"
              component={ContactsList}
            ></Stack.Screen>
            <Stack.Screen
              name="My Contacts"
              component={ContactForm}
            ></Stack.Screen>
            <Stack.Screen
              name="Create Contact"
              component={AddContact}
            ></Stack.Screen>
            <Stack.Screen
              name="Edit Contact"
              component={EditContact}
            ></Stack.Screen>
            <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
