import {
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  ADD_IMAGE,
} from "./actionTypes";

export const addContact = (contact, selectedImage) => {
  return {
    type: ADD_CONTACT,
    payload: { contact, selectedImage },
  };
};
export const editContact = (updatedContact) => {
  return {
    type: EDIT_CONTACT,
    payload: updatedContact,
  };
};
export const deleteContact = (phone) => {
  return {
    type: DELETE_CONTACT,
    payload: phone,
  };
};
export const addImage = (selectedImage) => {
  return {
    type: ADD_IMAGE,
    payload: selectedImage,
  };
};
