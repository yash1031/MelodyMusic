import React, {useState, useContext} from 'react'
import UserContext from '../../../../Context/User/UserContext';
import {
    Link, useLocation, useNavigate, Outlet
  } from "react-router-dom";
import { auth, provider, signInWithPopup, signOut} from './SignUpWithGoogle/firebase';
import {toast } from 'react-toastify';

const MainSignUpPage = () => {
    const context= useContext(UserContext);
    const {email, setEmail}= context;
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate= useNavigate();
    const host= "http://localhost:5000";
    const [isValid, setIsValid]= useState(true);
    // console.log(host);
  
    const signUpWithGoogle=  ()=>{
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const name= result.user.displayName;
          const email= result.user.email;
          const authPlatform= "Google";
          try{
            // console.log("Inside try block")
            const url= `${host}/api/auth/create-user`;
            // console.log(host, url, name, email, authPlatform);
            const response= await fetch(url,{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({name, email, authPlatform}),
            });
            const json = await response.json();
            if (response.status === 200) {
              console.log("Success! Authentication Token is: "+ json.message);
              // save the authToken and redirect
              localStorage.setItem("token", json.message);
              toast.success("Account Created Successfully");
              navigate("/");
            } else {
              console.log("Error: "+ json.message);
              toast.error(json.message)
            }
          }catch(error){
            console.log("Error: "+ error);
            toast.error(error)
          }
        })
        .catch((error) => {
          console.error("Error during sign-in: ", error);
        });
    }
  
    const handleNext = ()=>{
      console.log(email);
      if(email===""){
         document.getElementById("emailRequired").style.display= "";
         return; 
       }
      // if NotValid show warning and set isValid as false;
      // check if email exists in DB, if not navigate to next page
      navigate('#step1'); 
    }
  
    const handleInput= (e)=>{
      e.preventDefault();
      setEmail(e.target.value);
      // if NotValid show warning and set isValid as false;
    }

    const focusEmail= (e)=>{
        e.preventDefault();
        document.getElementById("emailRequired").style.display= "none";
    }
  
    return (
      <>
         <h1 style={{fontWeight: "bold", textAlign: "center", margin: "0 20px"}}>Sign up to start listening</h1>
          <section id="email">
            <h3>Email address</h3>
            <input onFocus={(e)=> focusEmail(e)} onChange={(e)=> handleInput(e)} value={email} type="text" placeholder='name@domain.com' style={{color: "white", display: "block", width:"100%", height: "40px", padding: "0 7px", backgroundColor: "black", font: "gray", borderRadius: "5px", border: "1px solid gray"}} />
            <div id="emailRequired" style={{display:"none", color:"Red"}}>
                Required*
            </div>
            <Link id="mobileSignUp" to="/enter-mobile" style={{display: "block", color: "#2fb52f", fontWeight: "bold"}}>Use phone number instead</Link>
          </section>
          <section style={{display: "flex"}}>
            <hr style={{display:"inline", width: "46%"}}/>
            <span>&nbsp;or&nbsp;</span>
            <hr style={{display:"inline", width: "46%"}}/>
          </section>
          <button onClick={handleNext} id="nextToEmail" style={{display: "block",border: "none", height: "50px", borderRadius: "25px", width: "100%", backgroundColor: "rgb(59 198 59 / 96%)"}}>
          Next</button>
            <section style={{display: "flex", flexDirection: "column", gap: "5px"}}>
            {/* <Link to="/google-sign-up" style={{textDecoration: "none"}}> */}
              <button onClick={signUpWithGoogle} style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "black"}}>
                Sign up with Google
              </button>
            {/* </Link> */}
            <button style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "black"}}>Sign up with Facebook</button>
            <button style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "black"}}>Sign up with Apple</button>
          </section>
          <hr />
          <section>
            <span style={{color: "gray"}}>Already have an account?</span> <Link to="/log-in" style={{color: "white"}}>Log in here</Link>
          </section>
      </>
    )
  
}

export default MainSignUpPage
