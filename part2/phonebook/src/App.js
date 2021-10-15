

import {useState,useEffect} from 'react';
import contactServices from './services/contacts'
import uuid from 'react-uuid'

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
function Person({person,handleDelete}){

  return (
  <div>{person.name} {person.number} <button
                                      onClick={()=>handleDelete(person.id,person.name)}>
                                        delete</button>
  </div>)
}
function Display({title,contacts,setContacts}){
  function handleDelete(id,name){
    if(window.confirm(`Delete ${name}`)){
          contactServices.remove(id)
          const updatedContacts=contacts.filter(contact=> contact.id!==id)
          setContacts(updatedContacts)
          }
    }
  return(<>
          <h2>{title}</h2>
           {contacts.map((person)=> <Person 
                                          key={person.id}
                                            person={person}
                                            handleDelete={handleDelete} 
                                            />)}
          </>);
}

export default function App() {
  
  const [contacts, setContacts]=useState([]);
  const [newName, setNewName]=useState('');
  const [newNumber, setNewNumber]=useState('');
  const [filtered, setFilter]=useState('');
  const filteredContacts = (!filtered)?
                             contacts:
                             contacts.filter(contact=>
                             contact.name.indexOf(filtered)!==-1);
  

  function addContact(e){
    e.preventDefault();
    const contactAlreadyExists=contacts.find(person=>person.name===newName)
    if(contactAlreadyExists){

      if(window.confirm(`${newName} already added to phonebook, replace the old number with new one`)){

         const updatedContact={...contactAlreadyExists, number:newNumber}
        contactServices.update(contactAlreadyExists.id,updatedContact)
        const updatedContactList=contacts.map(contact=> (contact.id!==contactAlreadyExists.id)?contact:updatedContact)
        setContacts(updatedContactList)
        setNewName('')
        setNewNumber('')
       }
      }else{
            const newObj={
                          id:uuid(),
                          name:newName,
                          number:newNumber}     
            contactServices.create(newObj)
            setContacts(contacts.concat(newObj))
            setNewName('')
            setNewNumber('')}

  }

  useEffect(()=>{
    contactServices
    .getAll()
    .then(contactList=>setContacts(contactList))
  },[])
  
  return(
          <>
          <h2>Phonebook</h2>
          <Filter onChange={(e)=>setFilter(e.target.value)} value={filtered} />

          <PersonForm 
            title='Add new contact'
            onSubmit={addContact}
            handleInputChange={{name:(e)=>setNewName(e.target.value),
                                number:(e)=>setNewNumber(e.target.value)}}
            values={{name:newName,number:newNumber}}/>

          <Display title='Numbers' contacts={filteredContacts} setContacts={setContacts}/>
          </>);  
  
}

