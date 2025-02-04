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

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

  
startApp();
const app = express();
const port = process.env.REACT_APP_PORT; 
const client_id = process.env.client_id; 
const client_secret = process.env.client_secret;
console.log("client_id ", client_id);
console.log("client_secret ", client_secret);

app.use(express.json()); //middleware to send JSON data through requests 
app.use(cors());

//Available routes
app.use('/api/auth', require('./routes/auth'));

// On accessing 'localhost:5000/auth/login':
// 1. Asks user for necessary permissions as asked in scope
// 2. Then it redirects to 'http://localhost:3000/auth/callback' and code and state(generated here) are sent as parameters ex: 'http://localhost:3000/auth/callback?code=AQB8CNw0bDDi4gWutIWMcSQXzRLJZEb_-XrgVjp7YykolKN9wxkjtyhXxcjAkzBrZE9v2v5njZ2jQDMddOqOqNYpRJ8ow5ONDrwt-qe5_GKjQJNQH4RMmKJhojL4AGKtSfxHbJps56LP35eMN_rJplfejbdi0fzgDZFFlgExrPz_cKNrOIVGNKYsK-ZQJLkPxq99pu49liwDw2yrT7hibNleXXzAW6ojDjC7YeNVxwX_GxbN0Z8&state=Jh1kj3KlvLHMuADG'
// Once user provides permission for the mentioned scope, spotify will be able to exchange access token, so access token is getting requested in 'GenerateAccessToken' component
app.get('/auth/login', (req, res) => {
  console.log(client_id)
  var scope = "streaming \
               user-read-email \
               user-read-private"
  // var scope = "user-read-playback-state"

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: 'bbbc38b877044e2d83ce8c78d4956eeb',
    scope: scope,
    redirect_uri: "http://localhost:3000/auth/callback",
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

//Meaning of the app running on the below port
app.listen(port, async () => {
    console.log(`melodyMusic backend listening on port ${port}`);
})

