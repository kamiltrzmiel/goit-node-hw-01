import { Command } from 'commander';
import os from 'os';
import { listContacts, getContactById, removeContact, addContact } from './contacts.js';

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const fullList = await listContacts();
      console.log(
        '\n' + new Date() + '\n' + os.type + '\n*************** FULL CONTACT LIST ***************'
      );
      return console.table(fullList);
      break;

    case 'get':
      const contactById = await getContactById(id);
      console.log(
        '\n' + new Date() + '\n' + os.type + '\n*************** CONTACT BY ID ***************'
      );
      return console.table(contactById);
      break;

    case 'add':
      const newContact = await addContact({ name, email, phone });
      console.log(
        '\n' + new Date() + '\n' + os.type + '\n*************** CONTACT ADDED ***************'
      );
      return console.table(newContact);
      break;

    case 'remove':
      const deleteContact = await removeContact(id);
      console.log(
        '\n' + new Date() + '\n' + os.type + '\n*************** CONTACT REMOVED ***************'
      );
      return console.table(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
