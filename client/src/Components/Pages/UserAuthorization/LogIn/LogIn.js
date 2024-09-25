import React from 'react'
import {
    Link, useLocation,
  } from "react-router-dom";

const LogIn = () => {
  return (
    <>
        <div style={{width: "50vw", background: "#898b881f", margin: "40px auto", padding: "50px 0", borderRadius: "7px"}}>
            <div style={{display: "flex", flexDirection: "column", gap: "25px", color: "white", width: "25vw", margin: " auto"}}>
                <i class="fa-solid fa-music fa-2xl" style={{fontWeight: "bold", display: "block", color: "white", margin: "auto"}}></i>
                <h1 style={{fontWeight: "bold", textAlign: "center", margin: "0 20px"}}>Log in to Melody Music</h1>
                <section style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <button style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "#898b881f"}}>Continue with Google</button>
                <button style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "#898b881f"}}>Continue with Facebook</button>
                <button style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "#898b881f"}}>Continue with Apple</button>
                <Link to="/enter-mobile" style={{textDecoration: "none"}}><button style={{display: "block", border: "1px solid gray", height: "50px", borderRadius: "25px", width: "100%",color: "white", backgroundColor: "#898b881f"}}>Continue with phone number</button></Link>
                </section>
                <hr />
                <section id="emailPassword" style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <div id="email">
                    <h5>Email or username</h5>
                    <input type="text" placeholder='Email or username' style={{display: "block", width:"100%", height: "40px", padding: "0 7px", backgroundColor: "#898b881f", font: "gray", borderRadius: "5px", border: "1px solid gray"}} />
                </div>
                <div id="password">
                    <h5>Password</h5>
                    <input type="text" placeholder='Password' style={{display: "block", width:"100%", height: "40px", padding: "0 7px", backgroundColor: "#898b881f", font: "gray", borderRadius: "5px", border: "1px solid gray"}} />
                </div>
                </section>
                <button style={{display: "block",border: "none", height: "50px", borderRadius: "25px", width: "100%", backgroundColor: "rgb(59 198 59 / 96%)"}}>Log In</button>
                <Link to="/forgot-password" style={{color: "white", textAlign: "center"}}>Forgot your password?</Link>
                <section>
                <span style={{color: "gray"}}>Don't have an account?</span> <Link to="/sign-up" style={{color: "white"}}>Sign up for Melody Music</Link>
                </section>
            </div>
        </div>
        <footer style={{display: "flex", justifyContent: "center", alignItems: "center", fontSize: "13px", color: "gray", textAlign: "center", height: "60px", background: "#898b881f"}}>
            This site is protected by reCAPTCHA and the Google&nbsp;
            <a href="#" style={{color: "gray"}}>Privacy Policy</a>&nbsp;and&nbsp;<a href="#" style={{color: "gray"}}>Terms of Service</a>&nbsp;apply.
        </footer>
    </>
  )
}

export default LogIn
