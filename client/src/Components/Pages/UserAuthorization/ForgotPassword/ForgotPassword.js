import React, {useState}  from 'react'
import MainPage from './MainPage'
import Redirection from './Redirection'


const ForgotPassword = () => {
  const [componentToRender, setComponentToRender]= useState("MainPage")
  return (
    
    <div style={{display: "flex", flexDirection: "column", gap: "15px", color: "white", width: "27vw", height: "100vh", margin: "0 auto", padding: "60px 0", paddingBottom: "20px"}}>
        <i className="fa-solid fa-music fa-2xl" style={{fontWeight: "bold", display: "block", color: "white", margin: "0 auto"}}></i>
         {componentToRender=="MainPage" && <MainPage setComponentToRender={setComponentToRender}/>}
         {componentToRender=="Redirection" && <Redirection setComponentToRender={setComponentToRender}/>}
        <footer style={{marginTop: "auto", fontSize: "13px", color: "gray", textAlign: "center"}}>
            This site is protected by reCAPTCHA and the Google
            <a href="#" style={{color: "gray"}}>Privacy Policy</a> and <a href="#" style={{color: "gray"}}>Terms of Service</a> apply.
        </footer>
    </div>
  )
}

export default ForgotPassword
