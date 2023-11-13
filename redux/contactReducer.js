import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  ADD_IMAGE,
} from "./actionTypes";
const initialState = {
  contacts: [],
  selectedImage: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      const { contact, selectedImage } = action.payload;
      const updatedContact = [...state.contacts, { ...contact, selectedImage }];
      return {
        ...state,
        contacts: updatedContact,
      };
    case "EDIT_CONTACT":
      const updatedContacts = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      return {
        ...state,
        contacts: updatedContacts,
      };

    case ADD_IMAGE:
      return {
        ...state,
        selectedImage: action.payload,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.phone !== action.payload.phone
        ),
      };

    default:
      return state;
  }
};
export default contactReducer;
