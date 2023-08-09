import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

export const contactPath = path.resolve('db', 'contacts.json');

//pobranie aktualnej listy kontaktów
export const listContacts = async () => {
  const response = await fs.readFile(contactPath);
  return JSON.parse(response);
};

//pobranie kontaktu z podanym contactId
export const getContactById = async contactId => {
  const fullList = await listContacts();
  const response = fullList.find(contact => contact.id === contactId);
  return response || null;
};

//usuwanie kontaktu z podanym contactId
export const removeContact = async contactId => {
  const fullList = await listContacts();
  const index = fullList.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [response] = fullList.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(fullList, null, 2));
  return response;
};

//dodawanie kontaktu
export const addContact = async data => {
  const fullList = await listContacts();
  const newContact = { id: nanoid(), ...data };
  fullList.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(fullList, null, 2));
  return newContact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
