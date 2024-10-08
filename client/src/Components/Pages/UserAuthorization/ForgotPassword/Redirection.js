import React from 'react'
import { useNavigate } from 'react-router-dom';

const Redirection = ({setComponentToRender}) => {
    const navigate= useNavigate();
    const editEmailUserName= (e)=>{
        e.preventDefault();
        setComponentToRender("MainPage");
    }
    const backToLogin= (e)=>{
        e.preventDefault();
        navigate('/log-in');
    }
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
      <h1>Check your inbox</h1>
      <p>We've sent you and email. Follow the instructions to access your Melody Music account</p>
      <button onClick={e=> backToLogin(e)} style={{display: "block",border: "none", height: "50px", color: "white", borderRadius: "25px", width: "100%", backgroundColor: "rgb(59 198 59 / 96%)"}}>Back to login</button>
      <button onClick={e=> editEmailUserName(e)} style={{display: "block",border: "1px solid white", height: "50px", color: "white", borderRadius: "25px", width: "100%", backgroundColor: "black"}}>Edit email/username</button>
    </div>
  )
}

export default Redirection
