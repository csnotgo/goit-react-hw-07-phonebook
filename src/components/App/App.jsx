import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContactsThunk,
  addContactsThunk,
  deleteContactsThunk,
} from 'Redux/operations/contactsOperation';
import { filter } from 'Redux/slices/filterSlice';
import Notiflix from 'notiflix';
import { Loader } from 'components/Loader/Loader';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container } from './App.styled';

Notiflix.Notify.init({ position: 'center-top', timeout: 1000 });

export const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const filterValue = useSelector(state => state.filter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const onFilterChange = e => {
    dispatch(filter(e.target.value));
  };

  const onFilteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    if (contacts?.length !== 0) {
      const filtredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
      return filtredContacts;
    }
  };

  const onFormSubmitState = ({ ...data }) => {
    const enterName = contacts?.map(contact => contact.name);
    const enterNumber = contacts?.map(contact => contact.phone);

    if (enterName.includes(data.name)) {
      return Notiflix.Notify.failure(`${data.name} is allready in contact`);
    }
    if (enterNumber.includes(data.phone)) {
      return Notiflix.Notify.failure(
        `This number ${data.phone} is allready in contact`
      );
    }
    dispatch(addContactsThunk(data));
    Notiflix.Notify.success('Add new contact');
  };

  const deleteContact = contactId => {
    dispatch(deleteContactsThunk(contactId));
    Notiflix.Notify.success('Delete contact');
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmitState} />

      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} value={filterValue} />
      {isLoading ? (
        <Loader />
      ) : (
        <ContactList
          contacts={onFilteredContacts()}
          deleteContact={deleteContact}
        />
      )}
    </Container>
  );
};
