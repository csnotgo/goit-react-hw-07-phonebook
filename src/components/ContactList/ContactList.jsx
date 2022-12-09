import { ContactListitem } from 'components/ContactListItem/ContactListItem';
import PropTypes from 'prop-types';
import { List, Item } from './ContactList.styled';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <List>
      {contacts &&
        contacts.map(({ name, phone, id }) => {
          return (
            <Item key={id}>
              <ContactListitem
                name={name}
                number={phone}
                deleteContact={deleteContact}
                id={id}
              />
            </Item>
          );
        })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      id: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
};
