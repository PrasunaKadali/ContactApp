import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddContact from "../src/AddContact";

const mockStore = configureStore();

describe("AddContact Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AddContact route={{ params: { selectedImage: null } }} />
      </Provider>
    );
    const nameInput = getByPlaceholderText("Name");
    const emailInput = getByPlaceholderText("Email");
    const phoneInput = getByPlaceholderText("Phone");

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(phoneInput).toBeDefined();
  });

  test("handles input changes", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AddContact route={{ params: { selectedImage: null } }} />
      </Provider>
    );
    const nameInput = getByPlaceholderText("Name");
    const emailInput = getByPlaceholderText("Email");
    const phoneInput = getByPlaceholderText("Phone");

    fireEvent.changeText(nameInput, "John Doe");
    fireEvent.changeText(emailInput, "john.doe@example.com");
    fireEvent.changeText(phoneInput, "1234567890");

    expect(nameInput.props.value).toBe("John Doe");
    expect(emailInput.props.value).toBe("john.doe@example.com");
    expect(phoneInput.props.value).toBe("1234567890");
  });
});
