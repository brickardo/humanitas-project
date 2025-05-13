import { Low } from 'lowdb';
import {JSONFilePreset } from 'lowdb/node';
import express from 'express'
import cors from 'cors'
import e, { json } from 'express';

const app = express()
const PORT = 5000
const corsOptions = {
  origin: 'http://localhost:3000', 
};
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],

}));

app.use(express.json())


const defaultData = { users: [] }
const db = await JSONFilePreset('db.json', defaultData)
//const obj = JSON.parse('{"id": 1,"name": "Dima", "email": "hitodndz@gmail.com", "password": "123456", "trainer": "Lukasz","price": 23,"expiresAt": "2026-01-01"}');
//const obj = JSON.parse('{"id": 1, "name": "Dima", "email": "hitodndz@gmail.com", "password": "123456", "visitData": [10, 30, 25, 30, 27, 23, 19], "timeSpentData": [10, 20, 20, 30, 50, 40, 60], "trainer": "Lukasz", "price": 23.99, "expiresAt": "2026-01-01"}');
// const adapter = new JSONFile('db.json');
// const db = new Low(adapter);

// if(db.data === null){
//   db.data = { users: [] };
//   db.write();
// }

app.post('/DICK', (req, res) => {
    res.json({dick: "dick"});
    const { email, password } = req.body
    console.log(email)
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = db.data.users.find(
    u => u.email === email && u.password === password
  )

  if (user) {
    const {
      name,
      trainer,
      price,
      expiresAt,
      visitData,
      timeSpentData,
      email,
    } = user

    res.json({
      success: true,
      name,
      trainer,
      price,
      expiresAt,
      visitData,
      timeSpentData,
      email,
    })
  } else {
    console.log('Invalid credentials')
    res.status(401).json({ success: false, message: 'Invalid credentials' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})