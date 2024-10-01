import React, {useState, useContext} from 'react'
import {
    Link, useLocation, useNavigate, Outlet
  } from "react-router-dom";
import {toast } from 'react-toastify';
import MainSignUpPage from './MainSignUpPage';
import Password from './Password';
import UserDetails from './UserDetails';
import ConsentForm from './ConsentForm';

const SignUp = () => {

  const location = useLocation();
  console.log("current location is: "+ JSON.stringify(location));
  
  // Conditionally render based on the URL fragment
  // Determine the component to render based on the URL fragment
  let componentToRender;
  switch (location.hash) {
    case '#step1':
      componentToRender = <Password />;
      break;
    case '#step2':
      componentToRender = <UserDetails />;
      break;
    case '#step3':
      componentToRender = <ConsentForm />;
      break;
    default:
      componentToRender = <MainSignUpPage />;
  }

  return (
    <>
    <div style={{display: "flex", flexDirection: "column", gap: "25px", color: "white", width: "40vw", margin: "40px auto"}}>
        <i className="fa-solid fa-music fa-2xl" style={{fontWeight: "bold", display: "block", color: "white", margin: "auto"}}></i>
        {componentToRender}
        <footer style={{fontSize: "13px", color: "gray", textAlign: "center"}}>
        This site is protected by reCAPTCHA and the Google
        <a href="#" style={{color: "gray"}}>Privacy Policy</a> and <a href="#" style={{color: "gray"}}>Terms of Service</a> apply.
        </footer>
    </div>
    </>
  )
}

export {MainSignUpPage, Password, UserDetails, ConsentForm}
export default SignUp
