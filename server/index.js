const express= require('express');
const cors = require('cors');
const {connectToMongo}= require('./db');
require('dotenv').config();

const startApp = async ()  => {
    try {
      let db = await connectToMongo();
      console.log('Database name in app.js:', db);
      module.exports= "Hello" 
      // Continue with the rest of your app logic
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  };
  
startApp();
const app = express();
const port = process.env.REACT_APP_PORT; 

app.use(express.json()); //middleware to send JSON data through requests 
app.use(cors());

//Meaning of the app running on the below port
app.listen(port, async () => {
    console.log(`melodyMusic backend listening on port ${port}`);
  })