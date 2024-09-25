import React from 'react'
import GoogleLogo from './GoogleLogo.webp'
import {
    Link, useLocation,
  } from "react-router-dom";

const SignUp = () => {
  return (
    <>
    <div style={{display: "flex", flexDirection: "column", gap: "25px", color: "white", width: "40vw", margin: "40px auto"}}>
        <i class="fa-solid fa-music fa-2xl" style={{fontWeight: "bold", display: "block", color: "white", margin: "auto"}}></i>
        <h1 style={{fontWeight: "bold", textAlign: "center", margin: "0 20px"}}>Sign up to start listening</h1>
        <section id="email">
          <h3>Email address</h3>
          <input type="text" placeholder='name@domain.com' style={{color: "white", display: "block", width:"100%", height: "40px", padding: "0 7px", backgroundColor: "black", font: "gray", borderRadius: "5px", border: "1px solid gray"}} />
          <Link id="mobileSignUp" to="/enter-mobile" style={{display: "block", color: "#2fb52f", fontWeight: "bold"}}>Use phone number instead</Link>
        </section>
        <section style={{display: "flex"}}>
          <hr style={{display:"inline", width: "46%"}}/>
          <span>&nbsp;or&nbsp;</span>
          <hr style={{display:"inline", width: "46%"}}/>
        </section>
        <button style={{display: "block",border: "none", height: "50px", borderRadius: "25px", width: "100%", backgroundColor: "rgb(59 198 59 / 96%)"}}>Next</button>
          <section style={{display: "flex", flexDirection: "column", gap: "5px"}}>
          <button style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "black"}}>Sign up with Google</button>
          <button style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "black"}}>Sign up with Facebook</button>
          <button style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "black"}}>Sign up with Apple</button>
        </section>
        <hr />
        <section>
          <span style={{color: "gray"}}>Already have an account?</span> <Link to="/log-in" style={{color: "white"}}>Log in here</Link>
        </section>
        <footer style={{fontSize: "13px", color: "gray", textAlign: "center"}}>
        This site is protected by reCAPTCHA and the Google
        <a href="#" style={{color: "gray"}}>Privacy Policy</a> and <a href="#" style={{color: "gray"}}>Terms of Service</a> apply.
        </footer>
    </div>
    </>
  )
}

export default SignUp
