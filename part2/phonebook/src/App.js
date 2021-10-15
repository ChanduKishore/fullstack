

import {useState,useEffect} from 'react';
import Display  from './components/display'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import contactServices from './services/contacts'
import uuid from 'react-uuid'
import './App.css'


function Notification({message,type}){
  return (message)?<div className= {`notify ${type}`}>{message}</div>:null
}

export default function App() {
  
  const [contacts, setContacts]=useState([]);
  const [newName, setNewName]=useState('');
  const [newNumber, setNewNumber]=useState('');
  const [filtered, setFilter]=useState('');
  const [message,setMessage]=useState({text:null,type:null});

  const filteredContacts = (!filtered)?
                             contacts:
                             contacts.filter(contact=>
                             contact.name.indexOf(filtered)!==-1);
  
  function displayNotification(message,operation,type=null){
    setMessage({text:`${message} ${operation}`,type:type})
    setTimeout(()=>setMessage({text:null,type:null}),2000)
  }

  function addContact(e){
        e.preventDefault();
        const contactExists=contacts.find(person=>person.name===newName)

        if(contactExists){
          if(window.confirm(`${newName} already added to phonebook, replace the old number with new one`)){

                  const updatedContact= {...contactExists, number:newNumber}

                  contactServices.update(contactExists.id, updatedContact )
                  .then(contact=> displayNotification(newName,'updated'))

  
                  setContacts(contacts.map(contact=> 
                    (contact.id!==contactExists.id)?contact:updatedContact))

                  setNewName('')
                  setNewNumber('')
                }
          }
          else{
                const newObj={
                              id:uuid(),
                              name:newName,
                              number:newNumber} 

                contactServices.create(newObj)
                .then(newContact=> displayNotification(newName,'added'))
                setContacts(contacts.concat(newObj))
                setNewName('')
                setNewNumber('')}

      }

  function handleDelete(id,name){
  
    if(window.confirm(`Delete ${name}`)){

          contactServices.remove(id)
          .then(contact=>displayNotification(name,'deleted','warning'))
          .catch(error=>displayNotification(`information of ${name} has already removedfrom the server`,'','error'))
          
          setContacts(contacts.filter(contact=> contact.id!==id))
          }
    }

  useEffect(()=>{
    contactServices
    .getAll()
    .then(contactList=>setContacts(contactList))
  },[])
  
  return(
          <>
           <Notification 
              message={message.text} 
              type={message.type}/>

          <h2>Phonebook</h2>

          <Filter 
              onChange={(e)=>setFilter(e.target.value)} 
              value={filtered} />
         
          <PersonForm 
              title='Add new contact'
              onSubmit={addContact}
              handleInputChange={{name:(e)=>setNewName(e.target.value),
                                  number:(e)=>setNewNumber(e.target.value)}}
              values={{name:newName,number:newNumber}}/>

          <Display title='Numbers' 
              contacts={filteredContacts} 
              setContacts={setContacts} 
              setMessage={setMessage} 
              handleDelete={handleDelete}/>
          </>);  
  
}

