import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  { timestamps: true },
);

const patchContactsSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true },
);

const patchContact = model('patchContact', patchContactsSchema, 'contacts');
const Contacts = model('Contacts', contactsSchema, 'contacts');

export { patchContact, Contacts };
