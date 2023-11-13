import contactReducer from "../redux/contactReducer";
import * as actionTypes from "../redux/actionTypes";

describe("contactReducer", () => {
  it("should handle ADD_CONTACT action", () => {
    const initialState = {
      contacts: [],
      selectedImage: null,
    };

    const contact = {
      id: 1,
      name: "John Doe",
      phone: "1234567890",
    };

    const action = {
      type: actionTypes.ADD_CONTACT,
      payload: {
        contact,
        selectedImage: "profile.jpg",
      },
    };

    const newState = contactReducer(initialState, action);

    expect(newState.contacts).toHaveLength(1);
    expect(newState.contacts[0]).toEqual({
      id: 1,
      name: "John Doe",
      phone: "1234567890",
      selectedImage: "profile.jpg",
    });
  });

  it("should handle EDIT_CONTACT action", () => {
    const initialState = {
      contacts: [
        {
          id: 1,
          name: "John Doe",
          phone: "1234567890",
          selectedImage: "profile.jpg",
        },
      ],
      selectedImage: null,
    };

    const updatedContact = {
      id: 1,
      name: "Jane Doe",
      phone: "0987654321",
      selectedImage: "new_profile.jpg",
    };

    const action = {
      type: actionTypes.EDIT_CONTACT,
      payload: updatedContact,
    };

    const newState = contactReducer(initialState, action);

    expect(newState.contacts).toHaveLength(1);
    expect(newState.contacts[0]).toEqual(updatedContact);
  });

  it("should handle ADD_IMAGE action", () => {
    const initialState = {
      contacts: [],
      selectedImage: null,
    };

    const action = {
      type: actionTypes.ADD_IMAGE,
      payload: "profile.jpg",
    };

    const newState = contactReducer(initialState, action);

    expect(newState.selectedImage).toEqual("profile.jpg");
  });

  it("should handle DELETE_CONTACT action", () => {
    const initialState = {
      contacts: [
        {
          id: 1,
          name: "John Doe",
          phone: "1234567890",
          selectedImage: "profile.jpg",
        },
        {
          id: 2,
          name: "Jane Doe",
          phone: "0987654321",
          selectedImage: "new_profile.jpg",
        },
      ],
      selectedImage: null,
    };

    const action = {
      type: actionTypes.DELETE_CONTACT,
      payload: { phone: "1234567890" },
    };

    const newState = contactReducer(initialState, action);

    expect(newState.contacts).toHaveLength(1);
    expect(newState.contacts[0].phone).toEqual("0987654321");
  });

  it("should return the initial state for unknown action type", () => {
    const initialState = {
      contacts: [],
      selectedImage: null,
    };

    const action = {
      type: "UNKNOWN_ACTION",
      payload: {},
    };

    const newState = contactReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
