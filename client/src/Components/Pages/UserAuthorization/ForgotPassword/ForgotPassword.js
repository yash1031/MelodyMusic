import React from 'react'

const ForgotPassword = () => {
  return (
    
    <div style={{display: "flex", flexDirection: "column", gap: "15px", color: "white", width: "27vw", height: "100vh", margin: "0 auto", padding: "60px 0", paddingBottom: "20px"}}>
        <i class="fa-solid fa-music fa-2xl" style={{fontWeight: "bold", display: "block", color: "white", margin: "0 auto"}}></i>
        <h1 style={{fontWeight: "bold", textAlign: "center"}}>Reset your password</h1>
        <p>Enter the email address or username linked to your Spotify account and we'll send you an email.</p>
        <section id="email">
          <h3>Email address or username</h3>
          <input type="text" placeholder='name@domain.com' style={{display: "block", width:"100%", height: "40px", padding: "0 7px", backgroundColor: "black", font: "gray", borderRadius: "5px", border: "1px solid gray"}} />
          <a id="needSupport" href="#" style={{display: "block", color: "white"}}>Need Support?</a>
        </section>
        <button style={{display: "block",border: "none", height: "50px", color: "white", borderRadius: "25px", width: "100%", backgroundColor: "rgb(59 198 59 / 96%)"}}>Send Link</button>
          
        <footer style={{marginTop: "auto", fontSize: "13px", color: "gray", textAlign: "center"}}>
            This site is protected by reCAPTCHA and the Google
            <a href="#" style={{color: "gray"}}>Privacy Policy</a> and <a href="#" style={{color: "gray"}}>Terms of Service</a> apply.
        </footer>
    </div>
  )
}

export default ForgotPassword
