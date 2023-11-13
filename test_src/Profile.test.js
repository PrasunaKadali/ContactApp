import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../src/Profile";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as ImagePicker from "expo-image-picker";

const mockStore = configureStore([]);

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe("Profile Component", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      image: null,
    });

    component = (
      <Provider store={store}>
        <NavigationContainer>
          <Profile />
        </NavigationContainer>
      </Provider>
    );
  });

  it("renders the pick image button", () => {
    const { getByText } = render(component);
    const buttonElement = getByText("Pick an image from camera roll");
    expect(buttonElement).toBeTruthy();
  });

  it("dispatches addImage action on picking an image", async () => {
    const { getByText } = render(component);

    const imagePickerSpy = jest.spyOn(ImagePicker, "launchImageLibraryAsync");
    imagePickerSpy.mockResolvedValue({
      cancelled: false,
      assets: [{ uri: "mocked_uri" }],
    });

    await fireEvent.press(getByText("Pick an image from camera roll"));

    expect(store.getActions()).toEqual([
      { type: "ADD_IMAGE", payload: "mocked_uri" },
    ]);
  });
});
