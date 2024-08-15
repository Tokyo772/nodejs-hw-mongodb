import { Contacts, patchContact } from '../models/contacts.js';

export const getAllContacts = async () => {
  return await patchContact.find({});
};

export const getContactById = async (id) => {
  return await Contacts.findById(id);
};

export const postContact = async (payload) => {
  const contact = await patchContact.create(payload);
  return contact;
};
