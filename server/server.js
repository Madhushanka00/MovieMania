const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const CORS = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// const express = require('express');
const { ObjectId } = require('mongodb');
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

app.get('/getUserData', async (req, res) => {
    const { userId } = req.query;
    // console.log("userId",userId);
    try {
        // Find the user by userId
        const user = await mdb.collection('users').findOne({ _id: new ObjectId(userId) });
        
        if (!user) {
            console.log("User not found", userId);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("User found", user.username, user.email);
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get user data', error });
    }
});

app.get('/getHistory', async (req, res) => {
    const { userId } = req.query;
    // console.log("userId",userId);
    try {
        // Find the user by userId
        const history = await mdb.collection('history')
            .find({ userId: userId })
            .sort({ timestamp: -1 })  // Assuming `timestamp` is the field for sorting by most recent
            .limit(50)  // Limit to 50 results
            .toArray();
        
        if (!history) {
            console.log("History not found", userId);
            return res.status(404).json({ message: 'History not found' });
        }

        console.log("History found", history);
        res.status(200).json({ history });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get history', error });
    }
});

app.get('/getRatings', async (req, res) => {
    const {userId} = req.query;
    // console.log("userId",userId);
    try {
        // Find the user by userId
        const ratings = await mdb.collection('ratings').find({ userId: userId }).toArray();

        if (!ratings) {
            console.log("Ratings not found", userId);
            return res.status(404).json({ message: 'Ratings not found' });
        }
        console.log("Ratings found", ratings);
        res.status(200).json({ ratings });
    }catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to get ratings', error });
        }
    
});

app.get('/getRecommendations', async(req, res) => {
    const {user_id } =  req.query;
    try{
        const recommendaIDs = await mdb.collection('recommendations').find({ user_id: user_id },{ projection: { recommended_movie_ids: 1, _id: 0 } }).toArray();
        console.log(recommendaIDs);
        res.status(200).json({recommendaIDs});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Failed to get recommendations', error});
    }
});

app.get('/getRating', async (req, res) => {
    const {userId, movieId} = req.query;
    try {
        // Find the user by userId
        const rating = await mdb.collection('ratings').findOne({ userId: userId, movieId: parseInt(movieId, 10)});

        if (!rating) {
            console.log("Rating not found", userId ," ", movieId);
            return res.status(404).json({ message: 'Rating not found' });
        }
        console.log("Rating found", rating);
        res.status(200).json({ rating });
    }catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to get rating', error });
        }
    
});


app.post('/addHistory', async (req, res) => {
    const { userId, movieId, movieTitle, media_type } = req.body;
    // console.log("req.body",req.body);

    try {

            const result = await mdb.collection('history').updateOne(
                { userId: userId, movieId: movieId , movieTitle: movieTitle, media_type: media_type},
                {
                    $set: {
                        userId: userId,
                        movieId: movieId,
                        movieTitle: movieTitle,
                        media_type: media_type,
                        updatedAt: new Date()
                    }
                },
                { upsert: true } // Insert if no document matches the query
            );
        

        console.log("History updated successfully", userId, movieId);
        res.status(200).json({ message: 'History updated successfully', userId, movieId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update history', error });
    }
});


app.post('/addratings', async (req, res) => {
    const { userId, movieId, movieTitle, media_type, rating } = req.body;
    // console.log("req.body",req.body);
    try {

            const result = await mdb.collection('ratings').updateOne(
                { 
                    userId: userId, // Match based on userId
                    movieId: movieId // Match based on movieId
                },
                {
                    $set: {

                        movieTitle:movieTitle,
                        media_type:media_type,
                        rating: rating,

                    }
                },
                { upsert: true } // Insert if no document matches the query
            );
        

        console.log("Rating updated successfully", userId, movieId);
        res.status(200).json({ message: 'Rating updated successfully', userId, movieId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update rating', error });
    }
});

// POST endpoint to store username and password
app.post('/register/:username/:email/:password', async (req, res) => {
    const { username, password, email } = req.params;
    // console.log(req.params);

    try {
        // Check if username already exists
        const existingUser = await mdb.collection('users').findOne({ username });
        if (existingUser) {
            console.log("Username already exists",username );
            return res.status(400).json({ message: 'Username already exists' });
            
        }
        // Check if email already exists
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

app.post('/addToWatchlist', async (req, res) => {
    const { userId, movieId, movieTitle, media_type } = req.body;
    // console.log("req.body",req.body);

    try {
        const result = await mdb.collection('watchList').updateOne(
            { userId: userId, movieId: movieId , movieTitle: movieTitle, media_type: media_type},
            {
                $set: {
                    userId: userId,
                    movieId: movieId,
                    movieTitle: movieTitle,
                    media_type: media_type,
                    updatedAt: new Date()
                }
            },
            { upsert: true } // Insert if no document matches the query
        );

        console.log("Watchlist updated successfully", userId, movieId);
        res.status(200).json({ message: 'Watchlist updated successfully', userId, movieId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update watchlist', error });
    }
});

app.post('/removeFromWatchlist', async (req, res) => {
    const { userId, movieIds} = req.body;


    try {
        const result = await mdb.collection('watchList').deleteMany(
            {userId: userId,
            movieId: { $in: movieIds }}
        );

        console.log(`Deleted ${result.deletedCount} items from the watchlist for user ${userId}`);
        res.status(200).json({ message: `Deleted ${result.deletedCount} items from watchlist`, userId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update watchlist', error });
    }
});


app.get('/checkWatchList', async (req, res) => {
    let {userId, movieId} = req.query;
    movieId = parseInt(movieId, 10);
    console.log(userId, movieId);
    try {
        // Find the user by userId
        const watchlist = await mdb.collection('watchList').findOne({ userId: userId, movieId: movieId});
        // console.log(watchlist);
        if (!watchlist) {
            console.log("Watchlist not found", userId ," ", movieId);
            return res.status(404).json({ message: 'Watchlist not found' });
        }
        console.log("Watchlist found", watchlist);
        res.status(200).json({ message: 'Watchlist found' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get watchlist', error });
    }
}
);


app.get('/getWatchlist', async (req, res) => {
    const { userId } = req.query;
    // console.log("userId",userId);
    try {
        // Find the user by userId
        const watchlist = await mdb.collection('watchList').find({ userId: userId }).toArray();
        
        if (!watchlist) {
            console.log("Watchlist not found", userId);
            return res.status(404).json({ message: 'Watchlist not found' });
        }

        // console.log("Watchlist found", watchlist);
        res.status(200).json({ watchlist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get watchlist', error });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });