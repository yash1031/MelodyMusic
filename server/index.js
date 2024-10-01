const express= require('express');
const cors = require('cors');
const {connectToMongo}= require('./db');
require('dotenv').config();

const startApp = async ()  => {
  try {
    let res = await connectToMongo();
    if(res[0]== "Success") console.log(`Connected to Database: ${res[1]}`);
    if(res[0]== "Failure") console.log(res[1]);
  } catch (error) {
    console.error('Failed to connect to DB:', error);
  }
};
  
startApp();
const app = express();
const port = process.env.REACT_APP_PORT; 

app.use(express.json()); //middleware to send JSON data through requests 
app.use(cors());

//Available routes
app.use('/api/auth', require('./routes/auth'));

//Meaning of the app running on the below port
app.listen(port, async () => {
    console.log(`melodyMusic backend listening on port ${port}`);
  })