import React, {useState, useContext} from 'react'
import UserContext from '../../../../Context/User/UserContext';
import {
    Link, useLocation, useNavigate, Outlet
  } from "react-router-dom";
import {toast } from 'react-toastify';
import $ from 'jquery';

const UserDetails = () =>{
  
  const navigate= useNavigate();
  const context= useContext(UserContext);
  const {name, setName, dob, setDob, gender, setGender}= context;

  const handleNext = () =>{
    
    if(name===""){
      $('#nameRequired').css('display', '');
      console.log("name is blank")
      return;
    }
    if(dob===""){
      $('#dobRequired').css('display', '');
      return;

    }
    if(gender===""){
      $('#genderRequired').css('display', '');
      return;

    }

    console.log(name, dob, gender);
    const queryString = window.location.search; // Returns the query string part of the URL including the "?"
    const urlParams = new URLSearchParams(queryString);
    // Accessing query parameters
    const authPlatform = urlParams.get('authPlatform'); // "123"
    console.log("authPlatform is: "+ authPlatform)
    navigate(`?authPlatform=${authPlatform}#step3`); // Programmatically change the URL to append #step1
  }

  const handleChange = (e) =>{
    e.preventDefault();
    if(e.target.name=== "name"){
      setName(e.target.value);
    }
    if(e.target.name=== "dob"){
      setDob(e.target.value);
    }
  }

  const handleGenderChange= (e) =>{
    e.preventDefault();
    setGender(e.target.value);
    $(`#genderRequired`).css('display', 'none');

  }

  const focusElement= (e) =>{
    e.preventDefault();
      $(`#${e.target.name}Required`).css('display', 'none');
  }

  return (
    <>
      <h2>Tell us about yourself</h2>
      <h2>Name</h2>
      <input onFocus={(e)=> focusElement(e)} onChange={(e)=> handleChange(e)} name="name" type="text" value={name}/>
      <div id="nameRequired" style={{display:"none", color:"Red"}}>
            Required*
      </div>
      <h2>Date of birth</h2>
      <input onFocus={(e)=> focusElement(e)} onChange={(e)=> handleChange(e)} name="dob" type="date" value={dob}/>
      <div id="dobRequired" style={{display:"none", color:"Red"}}>
            Required*
      </div>
      <h2>Gender</h2>
      <div className="gender-selection" onChange={(e)=> handleGenderChange(e)}>
        <div className="genderItem">
          <input type="radio" id="item1" value="Man" name="gender" /> 
          <label htmlFor="item1">Man</label>
        </div>

        <div className="genderItem">
          <input type="radio" id="item2" value="Woman" name="gender"/> 
          <label htmlFor="item2">Woman</label>
        </div>

        <div className="genderItem">
          <input type="radio" id="item3" value="Non-binary" name="gender"/> 
          <label htmlFor="item3">Non-binary</label>
        </div>

        <div className="genderItem">
          <input type="radio" id="item4" value="Something else" name="gender"/> 
          <label htmlFor="item4">Something else</label>
        </div>

        <div className="genderItem">
          <input type="radio" id="item5" value="Prefer not to say" name="gender"/> 
          <label htmlFor="item5">Prefer not to say</label>
        </div>
      </div>
      <div id="genderRequired" style={{display:"none", color:"Red"}}>
            Required*
       </div>

      <button onClick={handleNext}>Next</button>
    </>
  )
}

export default UserDetails
