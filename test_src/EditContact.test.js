import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import EditContact from "../src/EditContact";
import { editContact } from "../redux/contactAction";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({});

describe("EditContact component", () => {
  const contact = {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    selectedImage: null,
  };

  it("renders correctly", () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Provider store={store}>
        <EditContact route={{ params: { contact } }} />
      </Provider>
    );

    const nameInput = getByPlaceholderText("Name");
    const emailInput = getByPlaceholderText("Email");
    const phoneInput = getByPlaceholderText("Phone");
    const saveButton = getByTestId("saveButton");

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(phoneInput).toBeDefined();
    expect(saveButton).toBeDefined();
  });

  it("handles name input correctly", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <EditContact route={{ params: { contact } }} />
      </Provider>
    );

    const nameInput = getByPlaceholderText("Name");

    fireEvent.changeText(nameInput, "Jane Doe");

    expect(nameInput.props.value).toBe("Jane Doe");
  });
});
