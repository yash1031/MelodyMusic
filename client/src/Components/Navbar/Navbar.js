import React from 'react'

const Navbar = () => {
  return (
    <div id="navBar" style={{position: "relative", height: "100%", width: "100%"}}>
      <span id="left-section" style={{float: "left"}}>
        Logo
      </span>
      <span id="center-section" style={{height: "100%", display: "inline-block", position: "absolute", left: "50%", transform: "translateX(-50%)"}}>
        <span style={{display: "flex", alignItems: "center", gap: "10px", height: "100%"}}>
          <span style={{display: "grid", placeItems: "center" ,backgroundColor: "#898b881f", height: "100%", aspectRatio: "1", borderRadius: "50%"}}>
            <i class="fa-solid fa-house" style={{color: "white"}}></i>
          </span>
          <span style={{width: "30vw", height: "100%", backgroundColor: "#898b881f", borderRadius: "5vh", border: "none"}}>
            <i class="fa-solid fa-magnifying-glass" style={{width: "10%", height:"100%"}}></i>
            <input type="text" style={{width: "80%"}}></input>
            <i class="fa-regular fa-window-restore" style={{width: "10%"}}></i>
          </span>
        </span>
      </span>
      <span id="right-section" style={{float: "right", height: "100%"}}>
        <button className="btn" style={{fontWeight: "bold", color: "rgb(137 139 136 / 60%)"}}>Sign up</button>
        <button className="btn" style={{fontWeight: "bold", color: "black", padding: "0 40px", backgroundColor:"white", borderRadius: "5vh", height: "100%"}}>Log in</button>
      </span>
    </div>
  )
}

export default Navbar

