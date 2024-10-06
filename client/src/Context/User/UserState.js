import UserContext from './UserContext';
import React, {useState} from "react";

const UserState= (props)=>{
    
  const host= process.env.REACT_APP_HOST_NAME;
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [name, setName]= useState('');
  const [dob, setDob]= useState('');
  const [gender, setGender]= useState('');

  const createUser= async (authPlatform) =>{
    try{
      console.log(name, email, password, authPlatform, dob, gender);
      const response = await fetch(`${host}/api/auth/create-user`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, authPlatform, dob, gender }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      if (response.status === 200) {
          localStorage.setItem('token', json.message);
          return [true, json.message];
      }
      else{
        console.log("Failure1: "+ json.message)
          return [false, json.message];
      }
    }
    catch(error){
      // console.log("Failure2: "+ error);
      return [false, error];
    }
  }

  const loginUser= async (loggingEmail, loggingPassword, authPlatform) =>{
    console.log("In UserState: ", loggingEmail, loggingPassword, authPlatform);
    try{
      const response= await fetch(`${host}/api/auth/login-user`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({loggingEmail, loggingPassword, authPlatform}),
      });
      const json = await response.json();
      if (response.status === 200) {
          localStorage.setItem('token', json.message);
          return [true, json.message];
      }
      else{
        console.log("Failure1: "+ json.message)
          return [false, json.message];
      }
    }
    catch(error){
      console.log("Failure2: "+ error);
      return [false, error];
    }
  }

  return (
    <UserContext.Provider value={{loginUser, email, setEmail, password, setPassword, name, setName, dob, setDob, gender, setGender, createUser}}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserState;