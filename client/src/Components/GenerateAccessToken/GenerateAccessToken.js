import React from 'react'
const { Buffer } = require('buffer');

const GenerateAccessToken = () => {

    const host= process.env.REACT_APP_HOST_NAME;
    console.log(host);
    const client_id= process.env.REACT_APP_client_id;
    const client_secret= process.env.REACT_APP_client_secret; 

    const handleClick= async (event) =>{
        event.preventDefault();
        const queryString = window.location.search; // Returns the query string part of the URL including the "?"
        const urlParams = new URLSearchParams(queryString);
        // Accessing query parameters
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        console.log("code ", code)
        console.log("state ", state)
        // try{
        //     const response= await fetch(`${host}/auth/callback?code=${code}&state=${state}`,{
        //         method: "GET",
        //     });
        //     const json= await response.json();
        //     if(response.json === 200){
        //         console.log("Access Token Generated Successfully");
        //         console.log(json.message)
        //     }
        //     else{
        //         console.log("Failure in access token generation");
        //         console.log(json.message)
        //     }
        // }
        // catch(error){
        //     console.log("Failure2 ", error);
        // }
        const response= await fetch(`https://accounts.spotify.com/api/token`,{
          method: "POST",
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: "http://localhost:3000/auth/callback",
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
          },
        })
        const json= await response.json();
        if(response.status=== 200){
        //   res.status(200).json({message: json});
          console.log("Success in generating access token");
          console.log(json);
        }
        else{
        //   res.status(400).json({message: json});
          console.log("Failure in generating access token");
          console.log(json);
        }
    }

  return (
    <div>
      <button onClick= {event => handleClick(event)}>Request Access Token</button>
    </div>
  )
}

export default GenerateAccessToken
