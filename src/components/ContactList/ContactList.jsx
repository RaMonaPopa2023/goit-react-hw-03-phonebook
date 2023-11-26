import React, { Component } from 'react';
import styles from './ContactList.module.css';
import ContactListItem from './ContactListItem';

class ContactList extends Component {
  render() {
    const { list, onDeleteContact } = this.props;

    return (
      <div className={`${styles.contactsList}`}>
        {list.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </div>
    );
  }
}

export default ContactList;
