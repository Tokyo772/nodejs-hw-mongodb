import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import router from './routers/contacts.js';

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

  app.use(router);

  app.use('*', errorHandlerMiddleware);

  app.use(notFoundMiddleware);
  const PORT = env(ENV_VARS.PORT, 3005);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
