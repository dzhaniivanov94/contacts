import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";



function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuidv4(), ...contact }])
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])


  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route path="/"
            exact
            render={(props) => (<ContactList
              {...props}
              contacts={contacts}
              getContactId={removeContactHandler}
            />
            )}
          />
          <Route path="/add"
            render={(props) => (<AddContact
              {...props}
              addContactHandler={addContactHandler}
            />)}
          />
          <Route path="/contact/:id" component={ContactDetails} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
