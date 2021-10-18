const express= require('express')

const app=express()

app.use(express.json())

let contacts=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request,response)=>{
    response.send('<h1>Phonebook Backend</h1>')
})

app.get('/info', (request,response)=>{
    
    const info= {text:`Phonebook has info for ${contacts.length} people`, date: new Date()}
    const htmlEle=`<p>${info.text}</p>
                   <p> ${info.date}</p>`

    response.send(htmlEle)
})

app.get('/api/persons',(request, response)=>{
    response.json(contacts)
})

app.get('/api/persons/:id',(request, response)=>{
    const contact=contacts.find(contact=>contact.id == request.params.id)
    response.json(contact)
})

app.delete('/api/persons/:id', (request,response)=>{
   contacts=contacts.filter(contact=>contact.id !== Number(request.params.id))
  response.status(204).end()
})

function generatedId(){
  const maxId=(contacts.length > 0)
  ? Math.max(...contacts.map(contact=>contact.id))
  :0
  return maxId+1
}

app.post('/api/persons', (request, response)=>{
  const body=request.body
  console.log(body.name)
  
  

  if(!body.name || !body.number){
    return response.status(400).json({
      error:'contact name/number missing'
    })
  }
  const nameAlreadtExists=contacts.find(contact=>contact.name===body.name)
  console.log(nameAlreadtExists)
  if(nameAlreadtExists){
    return response.status(400).json({
      error:'name must be unique'
    })
  }
    
    const contact= {
      id:generatedId(),
      name:body.name,
      number:body.number
    }
    console.log(contact)
    contacts =contacts.concat(contact)
    response.json(contact)

  
})

const PORT=3001
app.listen(PORT,()=>{
    console.log('Server ruuning on port '+PORT)
})
