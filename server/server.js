const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const CORS = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const e = require('express');
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

// app.post('/validateUser/:username/:password', async (req, res) => {
//     const { username, password } = req.params;
//     const email = username;
//     console.log(req.params);

//     try {
//         // Check if username exists
//         const existingUser = await mdb.collection('users').findOne({ username });
//         const existingEmail = await mdb.collection('users').findOne({ email});
//         if (!existingUser || !existingEmail) {
//             console.log("Username or email does not exist",username );
//             return res.status(400).json({ message: 'Username does not exist' });
//         }
//         let validPassword;
//         // Check if password is correct
//         if (existingUser){
//             validPassword = await bcrypt.compare(password, existingUser.password);
//         }else if( existingEmail){
//             validPassword = await bcrypt.compare(password, existingEmail.password);
//         }
        
//         if (!validPassword) {
//             console.log("Invalid password",username );
//             return res.status(400).json({ message: 'Invalid password' });
//         }

//         console.log("User validated successfully",username );
//         res.status(200).json({ message: 'User validated successfully', userId: existingUser._id });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to validate user', error });
//     }
// });

app.post('/validateUser', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    console.log("req.body",req.body);

    try {
        // Determine if input is an email or username
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);
        
        let existingUser;
        if (isEmail) {
            // Search by email if it's an email
            existingUser = await mdb.collection('users').findOne({ email: usernameOrEmail });
        } else {
            // Search by username if it's a username
            existingUser = await mdb.collection('users').findOne({ username: usernameOrEmail });
        }

        // Check if the user exists
        if (!existingUser) {
            console.log("User does not exist", usernameOrEmail);
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            console.log("Invalid password", usernameOrEmail);
            return res.status(400).json({ message: 'Invalid password' });
        }

        console.log("User validated successfully", usernameOrEmail);
        res.status(200).json({ message: 'User validated successfully', userId: existingUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to validate user', error });
    }
});




// POST endpoint to store username and password
app.post('/register/:username/:email/:password', async (req, res) => {
    const { username, password, email } = req.params;
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
            email,
        });
        console.log("User registered successfully",result.insertedId);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });