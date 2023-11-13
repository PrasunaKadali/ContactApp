import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react-native";
import ContactList from "../src/ContactList";
import configureMockStore from "redux-mock-store";
import { NavigationContainer } from "@react-navigation/native";

const mockStore = configureMockStore();

describe("ContactList", () => {
  const contacts = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      selectedImage: "image1.jpg",
    },
  ];

  it("renders correctly with provided props", () => {
    const store = mockStore({});
    const route = { params: contacts[0] };

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <ContactList contacts={contacts} route={route} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("john.doe@example.com")).toBeTruthy();
    expect(getByText("123-456-7890")).toBeTruthy();
  });

  it("handles edit contact", () => {
    const store = mockStore({});
    const route = { params: contacts[0] };

    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <ContactList contacts={contacts} route={route} />
        </NavigationContainer>
      </Provider>
    );

    fireEvent.press(getByTestId("edit-contact-button"));
  });

  it("handles delete contact", () => {
    const store = mockStore({});
    const route = { params: contacts[0] };

    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <ContactList contacts={contacts} route={route} />
        </NavigationContainer>
      </Provider>
    );

    fireEvent.press(getByTestId("delete-contact-button"));
  });

  it("toggles menu visibility", () => {
    const store = mockStore({});
    const route = { params: contacts[0] };

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <ContactList contacts={contacts} route={route} />
        </NavigationContainer>
      </Provider>
    );
  });
});
