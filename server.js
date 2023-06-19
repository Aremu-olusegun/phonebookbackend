const express = require('express')
const app = express()
const path = require('path')

const cors = require('cors')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(express.static('build'))

app.use(express.static(path.join(__dirname, '/public')))

app.use(cors())

const Persons = require("./mongo")

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

/* app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'public', 'index.html'))
}) */

app.get('/', (request, response) => {
  response.send('Hello world')
})

app.get('/api/persons', async (request, response) => {
  try {
    const data = await Persons.find({});
    response.json(data);
  } catch (error) {
    response.status(500).json({ error: 'Could not fetch persons' });
  }
});

app.get('/api/persons/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const person = await Persons.findById(id);
    
    if (person) {
      response.json(person);
    } else {
      response.status(404).end('Person not found');
    }
  } catch (error) {
    console.log(error);
    response.status(400).end('Invalid ID format');
  }
});


app.delete('/api/persons/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const deletedPerson = await Persons.findByIdAndDelete(id);
    
    if (deletedPerson) {
      response.json(deletedPerson);
    } else {
      response.status(404).end('Person not found');
    }
  } catch (error) {
    console.log(error);
    response.status(400).end('Person could not be deleted');
  }
});


app.post('/api/persons', async (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number missing'
    });
  }

  try {
    const person = new Persons({
      name: body.name,
      number: body.number
    });

    const savedPerson = await person.save();
    response.json(savedPerson);
  } catch (error) {
    console.log(error);
    response.status(500).end();
  }
});


app.put("/api/persons:id")



app.get('/info', async (request, response) => {
  try {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const info = `
      <div>
        <p>Phonebook has info for ${Persons.length} people</p>
      </div>
      <div>
        <p>${currentDate} (${timeZone})</p>
      </div>
    `;
    
    response.send(info);
  } catch (error) {
    console.log(error);
    response.status(500).end();
  }
});


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})




