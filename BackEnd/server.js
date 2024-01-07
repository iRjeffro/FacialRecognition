const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

require('dotenv').config();
const dbPW = process.env.DB_PW;

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : dbPW,
      database : 'smart-brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('success'));
app.post('/signin', (req, res) => { signin.handleSignIn(db, bcrypt, req, res) });
app.post('/register', (req, res) => { register.handleRegister(req, res,  db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleImageURL(req, res) });

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

