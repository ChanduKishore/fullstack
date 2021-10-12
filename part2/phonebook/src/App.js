

import {useState} from 'react';


const Names=[{id:1,name:'Chandu kishore',number:458945424},
            {id:2,name:'Mahesh',number:8744458424}];

function Filter({value,onChange}){
  return <input type='text' value={value} onChange={onChange} placeholder='Filter' />
}

function InputField({type,value,placeholder,onChange}){
  return(<div>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}/>
    </div>);
}

function PersonForm({title,onSubmit, handleInputChange,values}){
  return(<form onSubmit={onSubmit}>
            <h2>{title}</h2>
            <InputField type='text' onChange={handleInputChange.name} value={values.name} placeholder='Name' />
            <InputField type='tel' onChange={handleInputChange.number} value={values.number} placeholder='Number' />
            <InputField type='submit' value='add' />
          </form>);

}
function Person({person}){
  return <li>{person.name} {person.number}</li>
}
function Display({title,contacts}){
  return(<>
          <h2>{title}</h2>
            <ul>
           {contacts.map((person)=> <Person key={person.id} person={person} />)}
          </ul>
          </>);
}

export default function App() {

  const [contacts, setContacts]=useState(Names);
  const [newName, setNewName]=useState('');
  const [newNumber, setNewNumber]=useState('');
  const [filtered, setFilter]=useState('');
  const filteredContacts = (!filtered)?
                             contacts:
                             contacts.filter(contact=>
                                              contact.name.slice(0,filtered.length).indexOf(filtered)!==-1);

  function handleFilterChange(e){
    setFilter(e.target.value)
  }
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
          <h2>Phonebook</h2>
          <Filter onChange={handleFilterChange} value={filtered} />

          <PersonForm 
            title='Add new contact'
            onSubmit={addName}
            handleInputChange={{name:(e)=>setNewName(e.target.value),
                                number:(e)=>setNewNumber(e.target.value)}}
            values={{name:newName,number:newNumber}}/>

          <Display title='Numbers' contacts={filteredContacts}/>
          </>);  
  
}

