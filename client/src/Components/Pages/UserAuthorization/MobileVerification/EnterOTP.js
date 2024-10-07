import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../../Context/User/UserContext';

const EnterOTP = () => {
  const navigate= useNavigate();
  const [otp, setOtp] = useState('');
  const context= useContext(UserContext);
  const {fullPhone, loginUser}= context;
  const verifyOtp= async (e) =>{
    e.preventDefault();

    const queryString = window.location.search; // Returns the query string part of the URL including the "?"
    const urlParams = new URLSearchParams(queryString);
    // Accessing query parameters
    const authPlatform = urlParams.get('authPlatform'); // "123"
    const confirmationResult= urlParams.get('confirmationResult');
    const flow= urlParams.get('flow');
    console.log("authPlatform is: "+ authPlatform)
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
    // if (confirmationResult) {
    //   confirmationResult.confirm(otp)
    //     .then((result) => {
    //       // Successfully signed in
    //       console.log('User signed in:', result.user);
    //       alert('User authenticated successfully');
    //       // navigate(`/sign-up?authPlatform=${authPlatform}#step2`);
    //     })
    //     .catch((error) => {
    //       console.error('Error verifying OTP:', error);
    //       alert('Invalid OTP');
    //     });
    // }
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
            <a href="#" style={{textDecoration: "none", color: "white"}}>Get a new Code</a>
            <button value={otp} onClick={(e)=> verifyOtp(e)} style={{alignSelf: "flex-start", border: "none", height: "50px", padding: "0 35px", borderRadius: "25px", color: "white", backgroundColor: "rgb(59 198 59 / 96%)"}}>Next</button>
      </section>
      <p style={{color: "white"}}>We sent a 6-digit code to +917351314778</p>
    </div>
  )
}

export default EnterOTP
