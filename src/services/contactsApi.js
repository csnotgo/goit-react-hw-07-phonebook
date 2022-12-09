import axios from 'axios';

const BASEURL = 'https://63924eaab750c8d178dbe540.mockapi.io/contacts';

export const fetchContacts = async () => {
  const response = await axios.get(BASEURL);
  return response;
};

export const addContact = async contact => {
  const response = await axios.post(BASEURL, {
    name: contact.name,
    phone: contact.phone,
  });
  return response;
};

export const deleteContact = async id => {
  const response = await axios.delete(`${BASEURL}/${id}`);
  return response;
};
