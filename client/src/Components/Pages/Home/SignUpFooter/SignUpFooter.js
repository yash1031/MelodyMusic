import React from 'react'
import {
    Link, useLocation,
  } from "react-router-dom";

const SignUpFooter = () => {
  return (
    <Link to='/sign-up' style={{textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center", height: "65px", color: "white", background: "purple", padding: "5px"}}>
      <div style={{display: "flex", flexDirection: "column", padding:"15px"}}>
        <h6>Preview of Melody Music</h6>
        <span>Sign up to get unlimited songs and podcasts with ocassional ads. No credit card needed</span>
      </div>
      <button style={{height: "100%", fontWeight: "bold", color: "black", padding: "0 30px", backgroundColor:"white", borderRadius: "27.5px", height: "100%"}}>Sign up free</button>
    </Link>
  )
}

export default SignUpFooter
