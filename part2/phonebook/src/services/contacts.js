import axios from 'axios';

const jsonServer='http://localhost:3001/contacts';

function getAll(){
    const request=axios.get(jsonServer)
    return request.then(response=>response.data)
}
function create(newObject){
    const request= axios.post(jsonServer,newObject)
    return request.then(response=>response.data)

    

}

function update(id, newobject){
    const request=axios.put(`${jsonServer}/${id}`, newobject)
    return request.then(response=>response.data)
    
}

function remove(id){
     return axios.delete(`${jsonServer}/${id}`) 
     
}

export default {getAll, create, update, remove}