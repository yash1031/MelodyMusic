import React, {useState, useContext} from 'react'
import UserContext from '../../../../Context/User/UserContext';
import {
    Link, useLocation, useNavigate, Outlet
  } from "react-router-dom";
import {toast } from 'react-toastify';
import $ from 'jquery';

const ConsentForm = () =>{

  const context= useContext(UserContext);
  const {createUser}= context;
  const [receiveMessage, setReceiveMessage]= useState("false");
  const [shareData, setShareData]= useState("false");
  const navigate= useNavigate();

  const handleSignUp= async (e) =>{
    console.log(receiveMessage, shareData);
    const queryString = window.location.search; // Returns the query string part of the URL including the "?"
    const urlParams = new URLSearchParams(queryString);
    // Accessing query parameters
    const authPlatform = urlParams.get('authPlatform'); // "123"
    console.log("authPlatform is: "+ authPlatform)
    const userCreated= await createUser(authPlatform);
    if(userCreated[0]){
      console.log("Successful User creation: "+ userCreated[1]);
      navigate('/');
    }
    else{
      console.log("Error in user creation: "+ userCreated[1]);
    }
  }

  const handleChange= (e) =>{
    let element= document.getElementById(e.target.id);
    if(e.target.id=== "recieveMarketingMessage") setReceiveMessage(element.checked);
    if(e.target.id=== "shareUserData") setShareData(element.checked);
  }


  return (
    <>
      <h2>Terms & Conditions</h2>
      <div id="check-boxes">
        <input onChange={e=> handleChange(e)} type="checkbox" id="recieveMarketingMessage" />
        <label htmlFor="recieveMarketingMessage">I would prefer not to receive marketing messages from MelodyMusic</label>
        <br />
        <input onChange={e=> handleChange(e)} type="checkbox" id="shareUserData" />
        <label htmlFor="shareUserData">Share my registration data with MelodyMusic's content providers for marketing purposes.</label>
      </div>
      <div id="termsAndConditions">By clicking on sign-up, you agree to Spotify's <a href="#">Terms and Conditions of Use.</a></div>
      <div id="privacyPolicy">To learn more about how Spotify collects, uses, shares and protects your personal data, please see <a href="#">MelodyMusic's Privacy Policy.</a></div>
      <button onClick={(e)=> handleSignUp(e)}>Sign up</button>
    </>
  )
}

export default ConsentForm
