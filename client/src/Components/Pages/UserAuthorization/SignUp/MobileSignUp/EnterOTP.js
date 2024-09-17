import React from 'react'

const EnterOTP = () => {
  return (
    <div style={{display: "flex", flexDirection: "column",alignItems: "center" , gap: "20px", margin: "auto", width: "60%", paddingTop: "50px"}}>
      <h2 style={{color: "white"}}>Enter your code</h2>
      <section style={{width: "100%"}}>

    <input type="text" placeholder='6-digit code' style={{flex: "1", background: "black", border: "1px solid gray", borderRadius: "3px", height: "45px", width: "100%", padding: "0 10px", color: "white"}}/>
      </section>
      <section style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
            <a href="#" style={{textDecoration: "none", color: "white"}}>Get a new Code</a>
            <button style={{alignSelf: "flex-start", border: "none", height: "50px", padding: "0 35px", borderRadius: "25px", color: "white", backgroundColor: "rgb(59 198 59 / 96%)"}}>Next</button>
      </section>
      <p style={{color: "white"}}>We sent a 6-digit code to +917351314778</p>
    </div>
  )
}

export default EnterOTP
