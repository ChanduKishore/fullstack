function Person({person,handleDelete}){
  
  return (
  <div>{person.name} {person.number} <button
                                      onClick={()=>handleDelete(person.id,person.name)}>
                                        delete</button>
  </div>)
}

export default function Display({title,contacts,setContacts,setMessage,handleDelete}){
    
    return(<>
            <h2>{title}</h2>
             {contacts.map((person)=> <Person 
                                            key={person.id}
                                              person={person}
                                              handleDelete={handleDelete} 
                                              />)}
            </>);
  }