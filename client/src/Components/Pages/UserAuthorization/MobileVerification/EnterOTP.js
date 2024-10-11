import React, {useState, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../../../../Context/User/UserContext';

const EnterOTP = () => {
  const navigate= useNavigate();
  const location= useLocation();
  const [otp, setOtp] = useState('');
  const context= useContext(UserContext);
  const {otpStatusElement, setOtpStatusElement, otpExpiryTimeout, setOtpExpiryTimeout, requestOtp, mobileExist, fullPhone, loginUser, verifyOtp, deleteOtp}= context;


  
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

  const verifyOTP= async (e) =>{
    e.preventDefault();

    if(otpStatusElement==='OTP Expired. Please request for a new one') {
      alert(otpStatusElement)
      return;
    }

    const queryString = window.location.search; // Returns the query string part of the URL including the "?"
    const urlParams = new URLSearchParams(queryString);
    // Accessing query parameters
    const authPlatform = urlParams.get('authPlatform'); 
    const flow= urlParams.get('flow');
    
    const otpVerified= await verifyOtp({mobile: fullPhone, otp});
    if(!otpVerified[0]){
      console.log("Error in OTP validation");
      alert(otpVerified[1]);
      return;
    }
    else{
      //delete OTP from DB
      const otpDeleted= await deleteOtp({mobile: fullPhone});
      if(otpDeleted[0]){
        console.log("otp Deleted");
      }
      else{
        console.log("Error in otp Deletion");
      }
    }
    if(flow=== 'logIn') {
      const loggedinUser= await loginUser({mobile: fullPhone, authPlatform});
      if(loggedinUser[0]){
        console.log("Successfully loggedin User: "+ loggedinUser[1]);
        navigate('/');
      }
      else{
          alert(loggedinUser[1]);
          console.log("Error in loggingIn User: "+ loggedinUser[1]);
      }
    }
    else navigate(`/sign-up?authPlatform=${authPlatform}#step2`);
  }

  const inputOtp= (e)=>{
    e.preventDefault();
    setOtp(e.target.value);
  }

  return (
    <div style={{display: "flex", flexDirection: "column",alignItems: "center" , gap: "20px", margin: "auto", width: "60%", paddingTop: "50px"}}>
      <h2 style={{color: "white"}}>Enter your code</h2>
      <section style={{width: "100%"}}>

    <input onChange={e=> inputOtp(e)} type="text" placeholder='6-digit code' style={{flex: "1", background: "black", border: "1px solid gray", borderRadius: "3px", height: "45px", width: "100%", padding: "0 10px", color: "white"}}/>
      </section>
      <section style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
            <a onClick={e=>sendOtp(e)} style={{textDecoration: "none", color: "white"}}>Get a new Code</a>
            <button value={otp} onClick={(e)=> verifyOTP(e)} style={{alignSelf: "flex-start", border: "none", height: "50px", padding: "0 35px", borderRadius: "25px", color: "white", backgroundColor: "rgb(59 198 59 / 96%)"}}>Next</button>
      </section>
      <p id="otpStatus" style={{color: "white"}}>{otpStatusElement}</p>
    </div>
  )
}

export default EnterOTP
