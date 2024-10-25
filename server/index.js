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
app.get('/auth/login', (req, res) => {
  console.log(client_id)
  var scope = "streaming \
               user-read-email \
               user-read-private"

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

app.get('/auth/callback', async (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;
  console.log("code ", code)
  console.log("state ", state)
  console.log("client_id ", client_id)
  console.log("client_secret ", client_secret)
  console.log("base64 string: ");
  console.log(new Buffer.from(client_id + ':' + client_secret).toString('base64'));
  if (state === null) {
    res.redirect('/' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    console.log("In else part");
    const response= await fetch(`https://accounts.spotify.com/api/token`,{
      method: "POST",
      form: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: "http://localhost:3000/auth/callback",
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
      },
    })
    // request.post(authOptions, function(error, response, body) {
    //   if (!error && response.statusCode === 200) {
    //     var access_token = body.access_token;
    //     console.log("access_token ", access_token);
    //     res.redirect('/')
    //   }
    // });
    const json= await response.json();
    if(response.status=== 200){
      res.status(200).json({message: json});
      console.log("Success in generating access token");
    }
    else{
      res.status(400).json({message: json});
      console.log("Failure in generating access token")
    }
  }
});

//Meaning of the app running on the below port
app.listen(port, async () => {
    console.log(`melodyMusic backend listening on port ${port}`);
})

