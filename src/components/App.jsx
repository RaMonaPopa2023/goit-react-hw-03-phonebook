import React, { Component } from 'react';
import './App.css';
import styles from './ContactForm/ContactForm.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const CONTACT_KEY = 'contact';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  async componentDidMount() {
    const data = localStorage.getItem(CONTACT_KEY);
    console.log('ContactForm a fost montat');

    try {
      if (data) {
        this.setState({
          contacts: JSON.parse(data),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState?.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(CONTACT_KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = (name, number) => {
    const isNameAlreadyExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameAlreadyExist) {
      alert(`Contact with name ${name} already exists!`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleSearchChange = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  handleDeleteContact = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({
      contacts: updatedContacts,
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styles.addContactContainer}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleSearchChange} />
        <ContactList
          list={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
