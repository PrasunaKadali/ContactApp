import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ContactForm from "../src/ContactForm";
import { useRoute } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useRoute: () => ({
      params: {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
      },
    }),
  };
});

describe("ContactForm Component", () => {
  const mockedContacts = [
    {
      name: "John Doe",
      phone: "1234567890",
      email: "john@example.com",
      selectedImage: null,
    },
    {
      name: "Jane Smith",
      phone: "0987654321",
      email: "jane@example.com",
      selectedImage: null,
    },
  ];

  const mockedNavigation = {
    navigate: jest.fn(),
  };

  const mockStore = configureStore([]);
  const store = mockStore({
    contacts: mockedContacts,
  });

  test("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ContactForm contacts={mockedContacts} navigation={mockedNavigation} />
      </Provider>
    );
  });

  test('navigates to Create Contact screen when "Create Contact" button is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ContactForm contacts={mockedContacts} navigation={mockedNavigation} />
      </Provider>
    );

    const createContactButton = getByText("Create Contact");
    fireEvent.press(createContactButton);
  });

  test("navigates to Details screen with correct params when a contact is pressed", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ContactForm contacts={mockedContacts} navigation={mockedNavigation} />
      </Provider>
    );

    const contactItem = getByText("John Doe");
    fireEvent.press(contactItem);
  });
});
