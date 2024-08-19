import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsAllController,
  patchContactController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.use('/contacts/:contactId', isValidId);

router.get('/contacts', ctrlWrapper(getContactsAllController));

router.get(
  '/contacts/:contactId',

  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),

  ctrlWrapper(patchContactController),
);

router.delete(
  '/contacts/:contactId',

  ctrlWrapper(deleteContactByIdController),
);

export default router;
