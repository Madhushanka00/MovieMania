const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const uri = "mongodb+srv://Mahesha:Tg%23078DB@cluster0.wgivi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });