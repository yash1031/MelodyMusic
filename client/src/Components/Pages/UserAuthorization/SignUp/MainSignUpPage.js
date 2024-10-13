import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../../Context/User/UserContext';
import {
    Link, useLocation, useNavigate, Outlet
  } from "react-router-dom";
import { auth, providerGoogle, providerFacebook, FacebookAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut} from './SignUpWithGoogle/firebase';
import {onAuthStateChanged, setPersistence, browserLocalPersistence} from 'firebase/auth';
import {toast } from 'react-toastify';

const MainSignUpPage = () => {
    const context= useContext(UserContext);
    const [auth1, setAuth1]= useState('Hello');
    const [auth2, setAuth2]= useState('');
    const {email, setEmail, setName}= context;
    const [authReady, setAuthReady] = useState(false);  // Track when auth is initialized
    const navigate= useNavigate();
    // console.log(host);
  
    // useEffect(() => {
    //   setPersistence(auth, browserLocalPersistence)
    //     .then(() => {
    //       console.log("Persistence set to LOCAL");
    //     })
    //     .catch((error) => {
    //       console.error("Error setting persistence: ", error);
    //     });
    // }, [auth]);

    // // Wait for Firebase to initialize auth state before calling getRedirectResult
    // useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth, (user) => {
    //     console.log("User from onAuthStateChanged: ", user);
    //     if(user) {
    //       console.log("User is already signed in:", user);
    //     }
    //     setAuthReady(true);  // Firebase auth is initialized
    //     unsubscribe(); // Clean up listener after it's triggered
    //   });
    // }, [auth]);

    // useEffect(()=>{
    //   console.log(authReady);
    //   if (!authReady) return;  // Wait until auth is ready  
    //   console.log("auth1 ", auth1);
    //   console.log("auth2 ", auth);
    //   getRedirectResult(auth)
    //   .then((result) => {
    //     console.log("result is ", result);
    //     if(result){
    //       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //       const credential = FacebookAuthProvider.credentialFromResult(result);
    //       const token = credential.accessToken;

    //       const user = result.user;
    //       console.log("user", user);
    //       console.log("token", token);
    //       const authPlatform= 'Facebook'
    //       navigate(`?authPlatform=${authPlatform}#step2`);
    //     }
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     // const email = error.customData.email;
    //     // AuthCredential type that was used.
    //     const credential = FacebookAuthProvider.credentialFromError(error);
    //     console.log("errorCode: ", errorCode);
    //     console.log("errorMessage: ", errorMessage);
    //     // console.log("email: ", email);
    //     console.log("credential: ", credential);
    //     console.log(error)        
    //     // ...
    //   });
    // }, [authReady, auth]);

    const signUpWithFacebook=  (e)=>{
      e.preventDefault();
      signInWithPopup(auth, providerFacebook)
        .then(async (result) => {
          const authPlatform= "Facebook";
          console.log("Facebook User", result);
          setEmail(result.user.email)
          setName(result.user.displayName)
          navigate(`?authPlatform=${authPlatform}#step2`);
        })
        .catch((error) => {
              // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
          console.log("errorCode: ", errorCode);
          console.log("errorMessage: ", errorMessage);
          console.log("email: ", email);
          console.log("credential: ", credential);
          console.log(error)
        
        });
      // setAuth1(auth);
      // signInWithRedirect(auth, providerFacebook);
      // console.log("Hello2");
      // console.log("auth1", auth);
      
    }
    const signUpWithApple=  ()=>{
      // signInWithPopup(auth, provider)
      //   .then(async (result) => {
      //     const authPlatform= "Apple";
      //     setEmail(result.user.email)
      //     setName(result.user.displayName)
      //     navigate(`?authPlatform=${authPlatform}#step2`);
      //   })
      //   .catch((error) => {
      //     console.error("Error during sign-in: ", error);
      //   });
    }
    

    const signUpWithGoogle=  ()=>{
      signInWithPopup(auth, providerGoogle)
        .then(async (result) => {
          const authPlatform= "Google";
          setEmail(result.user.email)
          setName(result.user.displayName)
          navigate(`?authPlatform=${authPlatform}#step2`);
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
      navigate('?authPlatform=Melody Music#step1'); 
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
            <Link id="mobileSignUp" to="/enter-mobile?authPlatform=Mobile&flow=signUp" style={{display: "block", color: "#2fb52f", fontWeight: "bold"}}>Use phone number instead</Link>
          </section>
          <section style={{display: "flex"}}>
            <hr style={{display:"inline", width: "46%"}}/>
            <span>&nbsp;or&nbsp;</span>
            <hr style={{display:"inline", width: "46%"}}/>
          </section>
          <button onClick={handleNext} id="nextToEmail" style={{display: "block",border: "none", height: "50px", borderRadius: "25px", width: "100%", backgroundColor: "rgb(59 198 59 / 96%)"}}>
          Next</button>
            <section style={{display: "flex", flexDirection: "column", gap: "5px"}}>
            <button onClick={signUpWithGoogle} style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "black"}}>
              Sign up with Google
            </button>
            <button onClick={e=> signUpWithFacebook(e)} style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "black"}}>
              Sign up with Facebook
            </button>
            <button onClick={signUpWithApple} style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "black"}}>
              Sign up with Apple
            </button>
          </section>
          <hr />
          <section>
            <span style={{color: "gray"}}>Already have an account?</span> <Link to="/log-in" style={{color: "white"}}>Log in here</Link>
          </section>
      </>
    )
  
}

export default MainSignUpPage
