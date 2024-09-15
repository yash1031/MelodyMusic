import React from 'react'

const Navbar = () => {
  return (
    <div id="navBar" style={{height: "100%"}}>
      <span id="left-section" style={{float: "left", display: "flex", alignItems:"center", height: "100%"}}>
        <i class="fa-solid fa-music fa-2xl" style={{color: "white"}}></i>
      </span>
      <span id="center-section" style={{height: "100%",  display: "inline-block", position: "sticky", left: "50%", transform: "translateX(-50%)"}}>
        <span style={{display: "flex", alignItems: "center", gap: "10px", height: "100%"}}>
          <span style={{display: "grid", placeItems: "center" ,backgroundColor: "#898b881f", height: "100%", aspectRatio: "1", borderRadius: "50%"}}>
            <i class="fa-solid fa-house fa-lg" style={{color: "white"}}></i>
          </span>
          <span style={{width: "30vw", height: "100%", backgroundColor: "#898b881f", borderRadius: "5vh", border: "none"}}>
            <i class="fa-solid fa-magnifying-glass fa-xl" style={{color: "rgb(137 139 136 / 60%)", borderTopLeftRadius: "50%", borderBottomLeftRadius: "50%", float: "left", width: "10%", display: "grid", placeItems: "center" ,backgroundColor: "#898b881f", height: "100%", aspectRatio: "1"}}></i>
            <input type="text" placeholder='What do you want to play?' style={{border: "none", outline: "none", color: "white", width: "80%", height: "100%", backgroundColor: "#898b881f"}}></input>
            <i class="fa-regular fa-window-restore" style={{color: "rgb(137 139 136 / 60%)", borderTopRightRadius: "50%", borderBottomRightRadius: "50%", float: "right", width: "10%", display: "grid", placeItems: "center" ,backgroundColor: "#898b881f", height: "100%", aspectRatio: "1"}}></i>
          </span>
        </span>
      </span>
      <span id="right-section1" style={{float: "right", height: "100%"}}>
        <button className="btn" style={{fontWeight: "bold", color: "rgb(137 139 136 / 60%)"}}>Sign up</button>
        <button className="btn" style={{fontWeight: "bold", color: "black", padding: "0 40px", backgroundColor:"white", borderRadius: "25px", height: "100%"}}>Log in</button>
      </span>
      {/* When Logged In below screen will be shown */}
      {/* <span id="right-section2" style={{float: "right", height: "100%", display: "flex", alignItems: "center", gap: "2vw"}}>
        <button className="btn" style={{fontWeight: "bold", color: "black", padding: "0 20px", backgroundColor:"white", borderRadius: "25px", height: "100%"}}>Explore Premium</button>
        <button className="btn" style={{fontWeight: "bold", color: "white", height: "100%"}}>
          <i class="fa-solid fa-angles-down"></i>
          Install App
        </button>
        <i class="fa-regular fa-bell fa-xl"></i>
        <span style={{ display: "flex", alignItems:"center", justifyContent: "center", fontWeight: "bold", borderRadius: "50%", height: "60%", aspectRatio: "1", backgroundColor: "purple"}}>Y</span>
      </span> */}
    </div>
  )
}

export default Navbar

