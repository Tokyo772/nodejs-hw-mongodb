import { SORT_ORDER } from '../constants/index.js';
import { Contacts, patchContact } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = patchContact.find();
  const contactsCount = await patchContact
    .find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await patchContact
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = await calculatePaginationData(
    contactsCount,
    perPage,
    page,
  );
  return {
    data: contacts,
    ...paginationData,
  };
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
