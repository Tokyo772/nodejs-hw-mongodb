import createHttpError from 'http-errors';
import { Users } from '../models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
  const user = await Users.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await Users.create({
    ...payload,
    password: encryptedPassword,
  });
};
