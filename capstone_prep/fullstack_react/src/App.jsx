import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  let [persons, setPersons] = useState([]);
  let [displayedPersons, setDisplayedPersons] = useState([...persons]);
  const [newName, setNewName] = useState('');
  let [newNumber, setNewNumber] = useState('');
  let [search, setSearch] = useState('');
  
  useEffect(() => {
    axios
      .get('http://3.234.162.36:8081/persons')
      .then(response => {
        setPersons(response.data);
        setDisplayedPersons(response.data);
    });
  }, []);

  function addPerson() {
    event.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    
    setPersons([ ...persons, { name: newName, number: newNumber } ]);
    setNewName('');
    setNewNumber('');
    
    if (new RegExp(search, 'i').test(newName)) {
      setDisplayedPersons([ ...displayedPersons, { name: newName, number: newNumber }]);
    }
  }
  
  let handleNameChange   = (event) => setNewName(event.target.value);
  let handleNumberChange = (event) => setNewNumber(event.target.value);
  
  function handleSearchChange(event) {
    setSearch(event.target.value);
    setDisplayedPersons([...persons.filter(person => {
      return new RegExp(event.target.value, 'i').test(person.name);
    })]);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Search search={search} handleSearchChange={handleSearchChange}/>
      </div>
      <NewPerson data={{newName, newNumber}}
                 callbacks={{addPerson, handleNameChange, handleNumberChange}}/>
      <h2>Numbers</h2>
      <Persons persons={displayedPersons} />
    </div>
  );
};

let Persons = ({ persons }) => {
  return(
    <ul>
    {persons.map(person => {
      return (
        <li key={person.name}>
          {person.name} {person.number || ''}
        </li>
      );
    })}
    </ul>
  );
}

let NewPerson = ({ data, callbacks }) => {
  return (
    <form onSubmit={callbacks.addPerson}>
      <div>
        name: <input value={data.newName} onChange={callbacks.handleNameChange} />
        number: <input value={data.newNumber} onChange={callbacks.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

let Search = ({ search, handleSearchChange }) => {
  return <>filter shown with <input value={search} onChange={handleSearchChange} /></>
}

export default App;