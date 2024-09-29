import React, {useState, useContext} from 'react'
import UserContext from '../../../../Context/User/UserContext';
import {
    Link, useLocation, useNavigate, Outlet
  } from "react-router-dom";
import {toast } from 'react-toastify';

const Password = () =>{
  
  const navigate= useNavigate();
  const context= useContext(UserContext);
  const {password, setPassword}= context;
  const [cpassword, setCpassword]= useState("");

  const handleNext= () =>{
    if(password === ""){
      document.getElementById("passwordRequired").style.display = "block";
      return;
    } 
    if(cpassword === ""){
      document.getElementById("cpasswordRequired").style.display = "block";
      return;
    }
    if ( password !== cpassword) {
      document.getElementById("passwordsNotMatching").style.display = "block";
      return;
    }
    // If conditions on password string does not match return -> Write function



    navigate('#step2'); // Programmatically change the URL to append #step1
  }

  const handlePwdOnBlur = (e, showHideElementID) => {
    e.preventDefault();
    if (cpassword !== "" && password !== cpassword) {
      document.getElementById("passwordsNotMatching").style.display = "block";
    }
    document.getElementById(showHideElementID).style.boxShadow = "";
  };

  const handlePwdOnFocus = (e, showHideElementID) => {
    e.preventDefault();
    document.getElementById("passwordRequired").style.display = "none";
    document.getElementById("cpasswordRequired").style.display = "none";
    // document.getElementById("passwordsNotMatching").style.display = "none";
    document.getElementById(showHideElementID).style.boxShadow =
      "0 0 5px rgba(0, 123, 255, 0.5)";
  };

  const handleShowHidePwd = (e, passwordFieldID, openEyeID, closedEyeID) => {
    e.preventDefault();
    if (document.getElementById(passwordFieldID).value === "") return;
    let passwordType = document.getElementById(passwordFieldID).type;
    if (passwordType === "password") {
      document.getElementById(passwordFieldID).type = "";
      document.getElementById(openEyeID).style.display = "none";
      document.getElementById(closedEyeID).style.display = "inline";
    } else {
      document.getElementById(passwordFieldID).type = "password";
      document.getElementById(openEyeID).style.display = "inline";
      document.getElementById(closedEyeID).style.display = "none";
    }
  };

  const inputPassword= (e) =>{
    setPassword(e.target.value)
    if(e.target.value !== "") {
      if(e.target.type==="password"){
        document.getElementById("openedEyeIcon").style.display = "inline";
        document.getElementById("closedEyeIcon").style.display = "none";
      }
      else{
        document.getElementById("openedEyeIcon").style.display = "none";
        document.getElementById("closedEyeIcon").style.display = "inline";
      }
    }
    else{
      document.getElementById("openedEyeIcon").style.display = "none";
      document.getElementById("closedEyeIcon").style.display = "none";
    }
  }
  const inputCpassword= (e) =>{
    setCpassword(e.target.value)
    if(password!= e.target.value) {
      document.getElementById("passwordsNotMatching").style.display = "";}
    else
      document.getElementById("passwordsNotMatching").style.display = "none";
    if(e.target.value !== "") {
      if(e.target.type==="password"){
        document.getElementById("copenedEyeIcon").style.display = "inline";
        document.getElementById("cclosedEyeIcon").style.display = "none";
      }
      else{
        document.getElementById("copenedEyeIcon").style.display = "none";
        document.getElementById("cclosedEyeIcon").style.display = "inline";
      }
    }
    else{
      document.getElementById("copenedEyeIcon").style.display = "none";
      document.getElementById("cclosedEyeIcon").style.display = "none";
    }
  }

  return (
    <>
      <h2>Create a password</h2>
      <h2>Password</h2>
      <div id="passwords">
        <div className="form-group my-3">
          <div className="input-group" id="show_hide_password" onFocus={(e) => handlePwdOnFocus(e, "show_hide_password")} onBlur={(e) => handlePwdOnBlur(e, "show_hide_password")}
            style={{ border: "1px solid #00000021", borderRadius: "5px", paddingRight: "5px", background: "white",}}>
            <input value= {password} onChange={(e)=>inputPassword(e)} type="password" className="form-control input" id="passwordID" placeholder="Password" style={{ border: "none", boxShadow: "none" }}/>
            <button style={{ background: "white", border: "none" }} onClick={(e) =>handleShowHidePwd(e,"passwordID","openedEyeIcon","closedEyeIcon")}>
              <i className="fa-regular fa-eye" id="openedEyeIcon" style={{ border: "none", display: "none" }}/>
              <i className="fa-regular fa-eye-slash" id="closedEyeIcon" style={{ border: "none", display: "none" }} />
            </button>
          </div>
          <div id="passwordRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
        </div>

        <div className="form-group my-3">
          <div className="input-group" id="cshow_hide_password" onFocus={(e) => handlePwdOnFocus(e, "cshow_hide_password")} onBlur={(e) => handlePwdOnBlur(e, "cshow_hide_password")}
            style={{ border: "1px solid #00000021", borderRadius: "5px", paddingRight: "5px", background: "white",}}>
            <input value={cpassword} onChange={(e)=>inputCpassword(e)} type="password" className="form-control input" id="cpasswordID" placeholder="Confirm Password"  style={{ border: "none", boxShadow: "none" }} />
            <button style={{ background: "white", border: "none" }} onClick={(e) =>handleShowHidePwd(e,"cpasswordID","copenedEyeIcon","cclosedEyeIcon")}>
              <i className="fa-regular fa-eye" id="copenedEyeIcon" style={{ border: "none", display: "none" }}/>
              <i className="fa-regular fa-eye-slash" id="cclosedEyeIcon" style={{ border: "none", display: "none" }} />
            </button>
          </div>
          <div id="cpasswordRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
        </div>

        <div id="passwordsNotMatching" style={{ display: "none", color: "red", margin: "10px 0" }} >
          The Passwords you entered does not match.
        </div>
      </div>
      <div id="passwordConditions">
        <ul style={{listStyle: "none"}}>
          <li>1 letter</li>
          <li>1 number or special character (example: # ? ! &)</li>
          <li>1 uppercase alphabet</li>
          <li>1 lowercase alphabet</li>
          <li>10 characters</li>
        </ul>
      </div>
      <button onClick={handleNext}>Next</button>
    </>
  )
}

export default Password
