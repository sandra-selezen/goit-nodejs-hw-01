const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  // Returns an array of contacts
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  // Returns the contact object with this id. Returns null if no contact with this id is found.
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}

const addContact = async ({ name, email, phone }) => {
  // Returns the added contact object.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const removeContact = async (contactId) => {
  // Returns the object of the deleted contact. Returns null if no contact with this id is found.
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}