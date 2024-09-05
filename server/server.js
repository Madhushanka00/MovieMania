const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const CORS = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// const app = express();

const uri = "mongodb+srv://Mahesha:Tg%23078DB@cluster0.wgivi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
app.use(CORS()); 
app.use(bodyParser.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  let mdb
// Connect to the MongoDB cluster
async function connect(){
    try {
        await client.connect();
        mdb = client.db("MovieMania");
        console.log("Connected to database");
    } catch (e) {
        console.error("failed to connect to the db",e);
    }
}

connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST endpoint to store username and password
app.post('/register/:username/:password', async (req, res) => {
    const { username, password } = req.params;
    console.log(req.params);

    try {
        // Check if username already exists
        const existingUser = await mdb.collection('users').findOne({ username });
        if (existingUser) {
            console.log("Username already exists",username );
            return res.status(400).json({ message: 'Username already exists' });
            
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the user into the database
        const result = await mdb.collection('users').insertOne({
            username,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });