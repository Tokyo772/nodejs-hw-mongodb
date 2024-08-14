import { getAllContacts, getContactById } from '../services/contacts.js';

export const controllerGetContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({
      status: 404,
      message: 'Not found contact by Id',
    });
    return;
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: {
      contact,
    },
  });
};

export const controllerGetContactsAll = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
