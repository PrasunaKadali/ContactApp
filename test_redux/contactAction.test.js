import {
  addContact,
  editContact,
  deleteContact,
  addImage,
} from "../redux/contactAction";

describe("Contact Actions", () => {
  test("addContact action", () => {
    const contact = { name: "John Doe", phone: "123-456-7890" };
    const selectedImage = "path/to/image.jpg";

    const action = addContact(contact, selectedImage);

    expect(action).toEqual({
      type: "ADD_CONTACT",
      payload: { contact, selectedImage },
    });
  });

  test("editContact action", () => {
    const updatedContact = { name: "Jane Doe", phone: "987-654-3210" };

    const action = editContact(updatedContact);

    expect(action).toEqual({
      type: "EDIT_CONTACT",
      payload: updatedContact,
    });
  });

  test("deleteContact action", () => {
    const phone = "123-456-7890";

    const action = deleteContact(phone);

    expect(action).toEqual({
      type: "DELETE_CONTACT",
      payload: phone,
    });
  });

  test("addImage action", () => {
    const selectedImage = "path/to/image.jpg";

    const action = addImage(selectedImage);

    expect(action).toEqual({
      type: "ADD_IMAGE",
      payload: selectedImage,
    });
  });
});
