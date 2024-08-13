import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World',
    });
  });
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
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
      message: 'Successfully found contact with id {contactId}!',
      data: {
        contact,
      },
    });
  });

  app.use('*', errorHandlerMiddleware);

  app.use(notFoundMiddleware);
  const PORT = env(ENV_VARS.PORT, 3005);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
