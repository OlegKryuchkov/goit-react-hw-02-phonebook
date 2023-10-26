import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import style from '../components/App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Albir Rojas', number: '667-00-76' },
      { id: 'id-2', name: 'Asia Voronova', number: '865-65-43' },
      { id: 'id-3', name: 'Oksana Sidorska', number: '532-09-21' },
      { id: 'id-4', name: 'Sandra Gutierrez', number: '321-43-09' },
    ],
    filter: '',
  };

  handleAddNewContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const contactsName = contacts.map(contact => contact.name);

    return (
      <div>
        <h1 className={style.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleAddNewContact}
          contactsName={contactsName}
        />

        <h2 className={style.title}>Contacts</h2>
        <div className={style.contact_list_container}>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            visibleContacts={visibleContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;