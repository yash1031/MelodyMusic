import UserContext from './UserContext';
import React, {useState} from "react";

const UserState= (props)=>{
    
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [name, setName]= useState('');
  const [dob, setDob]= useState('');
  const [gender, setGender]= useState('');

  return (
    <UserContext.Provider value={{email, setEmail, password, setPassword, name, setName, dob, setDob, gender, setGender}}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserState;