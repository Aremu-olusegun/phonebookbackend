const express = require('express')
const app = express()
const path = require('path')

const cors = require('cors')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Muhammad Buhari", 
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

app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/', (request, response) => {
  response.send('Hello world')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const number = parseInt(request.params.id)
    const note = persons.find(person => person.id === number)
    if (note) {    
        response.json(note)  
    } else {    
        response.status(404).end('Number was not found')  
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const number = parseInt(request.params.id)
    persons = persons.filter(person => person.id !== number)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'Name or number missing' 
      })
    }
  
    const duplicatePerson = persons.find(p => p.name === body.name)
    if (duplicatePerson) {
      return response.status(400).json({ 
        error: 'Name already exists in the phonebook' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
    response.json(person)
  })
  


app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        response.send(
            `
            <div>
                <p>Phonebook has info for ${persons.length} people</p>
            </div>
            <div>
                <p>${currentDate} (${timeZone})</p>
            </div>`
        )
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




