const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@example.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@example.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get('/', function (req, res) {
  res.send(db.users);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

app.post('/signin', (req, res) => {
  if (
    req.body.email == db.users[0].email &&
    req.body.password == db.users[0].password
  ) {
    res.json(db.users[0]);
  } else {
    res.status(400).json('error');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(db.users[db.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.users.forEach(user => {
    if (user.id === id) {
      found = true;
      res.json(user);
    }
  });
  if (!found) {
    res.status(404).json('not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  db.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json('not found');
  }
});
