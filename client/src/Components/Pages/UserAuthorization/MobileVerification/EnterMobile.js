import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, connectAuthEmulator } from '../SignUp/SignUpWithGoogle/firebase';
import UserContext from '../../../../Context/User/UserContext';

const EnterMobile = () => {
  const [currentCountryCode, setCurrentCountryCode]= useState('+91');
  const countryCodes= ["+20","+27","+51","+52","+54","+55","+56","+57","+62","+66","+84","+91","+212","+213","+233","+234","+254","+255","+256","+593","+852","+966","+971"]  
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate= useNavigate();
  const location= useLocation();
  const context= useContext(UserContext);
  const {otpStatusElement, setOtpStatusElement, otpExpiryTimeout, setOtpExpiryTimeout, fullPhone, setFullPhone, mobileExist,requestOtp, deleteOtp}= context;

  document.addEventListener('click', (e)=>{
    // console.log("Background Clicked")
    let countryCodesElement= document.getElementById("countryCodes");
    // countryCodesElement.style.display===""? countryCodesElement.style.display= "none": countryCodesElement.style.display=""; 
     // Get the button and list elements
     const dropdownBtn = document.getElementById('countryCodesBtn');
     const dropdownList = document.getElementById('countryCodes');
    // If the click happens outside the dropdown button and dropdown content
    // if (!JSON.stringify(e.target).contains(dropdownBtn) && !JSON.stringify(e.target).contains(dropdownList)) {
        // countryCodesElement.style.display= "none";
    // }
  })

  const showHideCountryCodes= (e) =>{
    e.preventDefault();
    console.log("button clicked")
    let countryCodesElement= document.getElementById("countryCodes");
    countryCodesElement.style.display===""? countryCodesElement.style.display= "none": countryCodesElement.style.display=""; 
  }

  const sendOtp= async (e)=>{
    e.preventDefault();

    const queryString = window.location.search; // Returns the query string part of the URL including the "?"
    const urlParams = new URLSearchParams(queryString);
    // Accessing query parameters
    const authPlatform = urlParams.get('authPlatform'); 
    const flow = urlParams.get('flow'); 

    if(flow=="logIn"){
      console.log("fullPhone", fullPhone)
      const mobileExisted= await mobileExist(fullPhone);
      if(!mobileExisted[0]){
        alert(mobileExisted[1]);
        return; 
      }
    }
    const requestedOTP= await requestOtp({mobile: fullPhone});

    if(requestedOTP[0]){
      console.log("Success requesting OTP: ", requestedOTP[1]);
      setOtpStatusElement(`We've sent a 6-digit code to ${fullPhone}`)
       //If it's not the first time Validation button is clicked, time to Expire OTP will move forward, need to cancel execution of previous setTimeout function
      if (otpExpiryTimeout !== null) {
        clearTimeout(otpExpiryTimeout);
      }
      setOtpExpiryTimeout(
        //Delete the record from database after 1 min.
        setTimeout(async (e) => {
                // Once OTPs are expired, all OTP records for that user to be deleted from DB
                const deletedOtp= await deleteOtp({mobile: fullPhone});
                if(deletedOtp[0]){
                    // console.log("Result for record deletion: " + deletedOtp[1]);
                    setOtpStatusElement('OTP Expired. Please request for a new one');
                }
                else{
                    // console.log("Error in deletion is: " + deletedOtp[1]);
                }
        }, 60000)
      )
      if(location.pathname !== 'enter-otp') navigate(`/enter-otp?authPlatform=${authPlatform}&flow=${flow}`);
    }
    else{
      console.log("Error in requesting OTP: ", requestedOTP[1]);
    }

  }

  const inputPhone= (e)=>{
    e.preventDefault();
    setPhoneNumber(e.target.value);
    setFullPhone(currentCountryCode+ e.target.value)
  }

  return (
    <div style={{display: "flex", flexDirection: "column",alignItems: "center" , gap: "20px", margin: "auto", width: "60%", paddingTop: "50px"}}>
      <h2 style={{color: "white"}}>Enter phone number</h2>
      <section style={{display: "flex", gap: "10px", width: "100%"}}>
        <button onClick={(e)=>showHideCountryCodes(e)} style={{position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", width: "15%", background: "black", border: "1px solid gray", height: "40px", borderRadius: "3px"}}>
            <span id="countryCodesBtn" style={{color: "white", float: "left"}}>{currentCountryCode}</span>
            <i className="fa-solid fa-angle-down" style={{ color: "gray", float: "right"}}></i>
            <ul id="countryCodes" style={{display: "none", margin: "0", padding: "0", position: "absolute", top: "40px", left: "0", width: "100%", height: "50vh", overflow: "auto",  background: "black", color: "white", border: "1px solid gray", borderRadius: "3px", listStyleType: "none"}}>
                {countryCodes.map((code)=>{
                    return (<li onClick={(e)=>{e.preventDefault(); setCurrentCountryCode(code) }} style={{textAlign: "start", paddingLeft: "5px"}}>{code}</li>)
                })}
            </ul>
        </button>
        <input type="text" placeholder='Phone number' onChange={e=> inputPhone(e)} value={phoneNumber} style={{flex: "1", background: "black", border: "1px solid gray", borderRadius: "3px", height: "40px", padding: "0 10px", color: "white"}}/>
      </section>
      <button id="sendOTP" onClick={(e)=>sendOtp(e)} style={{alignSelf: "flex-start", border: "none", height: "50px", padding: "0 35px", borderRadius: "25px", color: "white", backgroundColor: "rgb(59 198 59 / 96%)"}}>Next</button>
    </div>
  ) 
}

export default EnterMobile
