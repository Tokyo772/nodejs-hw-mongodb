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

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contacts.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = Contacts.findOneAndDelete({ _id: contactId });

  return contact;
};
