import express from 'express';
import cors    from 'cors';
import morgan  from 'morgan';

let app = express();

let persons = [
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
];

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/persons', (req, res) => {
  res.json(persons);
});

app.get('/persons/:id', (req, res) => {
  let person = persons.find(person => person.id === Number(req.params.id));
  
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/persons/:id', (req, res) => {
  persons = persons.filter(person => person.id !== Number(req.params.id));
  res.status(204).end()
});

app.post('/persons/', (req, res) => {
  let person = { id: Math.floor(Math.random() * 100000), ...req.body, }
  
  let error;
  if      (!person.name) error   = { error: 'name must be included' };
  else if (!person.number) error = { error: 'number must be included' };
  else if (persons.map(person => person.name).includes(person.name)) {
    error = { error: 'name must be unique' };
  }
  
  if (error) return res.status(400).json(error);
  
  persons.push(person);
  res.json(person);
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people<p><p>${new Date(Date.now())}</p>`
  );
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});