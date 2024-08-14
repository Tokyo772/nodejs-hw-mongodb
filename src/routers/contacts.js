import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  controllerGetContactById,
  controllerGetContactsAll,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(controllerGetContactsAll));

router.get('/contacts/:contactId', ctrlWrapper(controllerGetContactById));

export default router;
