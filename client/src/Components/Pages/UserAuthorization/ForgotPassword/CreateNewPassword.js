import React from 'react'
import Password from '../SignUp/Password'

const CreateNewPassword = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "25px", color: "white", width: "40vw", margin: "40px auto"}}>
        <i className="fa-solid fa-music fa-2xl" style={{fontWeight: "bold", display: "block", color: "white", margin: "auto"}}></i>
        <Password type="resetPassword"/>
        <footer style={{fontSize: "13px", color: "gray", textAlign: "center"}}>
        This site is protected by reCAPTCHA and the Google
        <a href="#" style={{color: "gray"}}>Privacy Policy</a> and <a href="#" style={{color: "gray"}}>Terms of Service</a> apply.
        </footer>
    </div>
  )
}

export default CreateNewPassword
