

import {useState} from 'react';


const Names=[{id:1,name:'Chandu kishore',number:458945424},
            {id:2,name:'Mahesh',number:8744458424}];

export default function App() {

  const [contacts, setContacts]=useState(Names)
  const [newName, setNewName]=useState('')
  const [newNumber, setNewNumber]=useState('')

  function addName(e){
    e.preventDefault();
    if(contacts.find((person)=>person.name===newName)){
      alert(`${newName} already added to phonebook`)
    }else{
    const nameObj={
                  id:contacts.length+1,
                  name:newName,
                  number:newNumber}
    setContacts(contacts.concat(nameObj));
    setNewName('');
    setNewNumber('')}
  }

  return(
          <>
          <form onSubmit={addName}>
            <h2>Phonebook</h2>
            <div>
            <input
              type='text'
              value={newName}
              placeholder='Name...'
              onChange={(e)=>setNewName(e.target.value)}/>
            </div>

            <div>
            <input
              type='tel'
              value={newNumber}
              placeholder='Number...'
              onChange={(e)=>setNewNumber(e.target.value)}/>
            </div>

            <input type='submit' value='add'/>
          </form>

          <h2>Numbers</h2>
          <ul>
           {contacts.map((person)=> <li key={person.id}>{person.name} {person.number}</li>)}
          </ul>
          </>);  
  
}

