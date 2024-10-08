import UserContext from './UserContext';
import React, {useState} from "react";

const UserState= (props)=>{
    
  const host= process.env.REACT_APP_HOST_NAME;
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [name, setName]= useState('');
  const [dob, setDob]= useState('');
  const [gender, setGender]= useState('');
  const [fullPhone, setFullPhone]= useState('');

  const createUser= async (authPlatform) =>{
    try{
      console.log(name, email, password, authPlatform, dob, gender);
      const response = await fetch(`${host}/api/auth/create-user`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobile: fullPhone, password, authPlatform, dob, gender }), // body data type must match "Content-Type" header
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

  const loginUser= async ({_id='', mobile='', loggingEmail='', loggingPassword='', authPlatform}) =>{
    console.log("In UserState: ", _id, mobile, loggingEmail, loggingPassword, authPlatform);
    try{
      const response= await fetch(`${host}/api/auth/login-user`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({_id, mobile, loggingEmail, loggingPassword, authPlatform}),
      });
      const json = await response.json();
      if (response.status === 200) {
          localStorage.setItem('token', json.message);
          console.log("Successfully logged in user");
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

  const mobileExist= async (fullPhone)=>{
    try{
      const response= await fetch(`${host}/api/auth/mobile-exist`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({fullPhone}),
      });
      const json = await response.json();
      if (response.status === 200) {
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

  const sendEmailWithLink= async (email) =>{
    console.log("Email recieved for password reset is: "+ email);
    try{
      const response= await fetch(`${host}/api/auth/send-email`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email}),
      })
      const json= await response.json();
      if(response.status=== 200){
        console.log("Success in sending password recovery email: "+ json.message);
        return [true, json.message];
      }
      else{
        console.log("Failure1: "+ json.message);
        return [false, json.message];
      }
    }
    catch(error){
      console.log("Failure2: "+ error);
      return [false, error];
    }
  }

  const passwordReset= async ({user_id, password})=>{
    console.log("user_id recieved: ", user_id, "password recieved: ", password);
    try{
      const response= await fetch(`${host}/api/auth/password-reset`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user_id, password}),
      })
      const json= await response.json();
      if(response.status=== 200){
        console.log("Success in password reset: ", json.message);
        return [true, json.message];
      }
      else{
        console.log("Failure1: ", json.message);
        return [false, json.message];
      }
    }
    catch(error){
      console.log("Failure2: ", error);
      return [false, error];
    }
  }

  return (
    <UserContext.Provider value={{passwordReset, sendEmailWithLink, fullPhone, setFullPhone, mobileExist, loginUser, email, setEmail, password, setPassword, name, setName, dob, setDob, gender, setGender, createUser}}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserState;