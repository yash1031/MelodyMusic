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
          console.log("Success")
          localStorage.setItem('token', json.message);
          return true;
      }
      else{
        console.log("Failure1: "+ json.message)
          return false;
      }
    }
    catch(error){
      console.log("Failure2: "+ error);
          return false;
    }
  }

  return (
    <UserContext.Provider value={{email, setEmail, password, setPassword, name, setName, dob, setDob, gender, setGender, createUser}}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserState;