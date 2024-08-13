import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => {
  return await Contact.find({});
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};
