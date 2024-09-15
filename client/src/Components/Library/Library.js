import React from 'react'
import Library_Image from './Library_Image.png';

const Library = () => {
  return (
    <div style={{color: "white", height: "100%", display: "flex", flexDirection: "column", gap: "25px", padding: "5px"}}>
     <header style={{height: "8%", padding: "5px"}}>
        <span style={{float: "left", color: "gray", fontSize: "20px", fontWeight: "bold", display: "flex", alignItems: "center"}}>
          <img src={Library_Image} alt="" />
          Your Library
        </span>
        <span style={{float: "right", color: "gray", fontSize: "30px", display: "flex", alignItems: "center"}}>
          +
        </span> 
     </header> 
     <section id="sect1" style={{display: "flex", flexDirection: "column", padding: "20px", backgroundColor: "#898b881f", borderRadius: "5px"}}>
      <h5>Create your first playlist</h5>
      <p>It's easy, we'll help you</p>
      <button className="btn" style={{alignSelf: "flex-start", fontWeight: "bold", marginTop: "auto", color: "black", padding: "0 12px", backgroundColor:"white", borderRadius: "25px"}}>Create playlist</button>
     </section>
     <section id="sect2" style={{display: "flex", flexDirection: "column", padding: "20px", backgroundColor: "#898b881f", borderRadius: "5px"}}>
      <h5>Let's find some podcasts to follow</h5>
      <p>We'll keep you updated on new episodes</p>
      <button className="btn" style={{alignSelf: "flex-start", fontWeight: "bold", marginTop: "auto", color: "black", padding: "0 12px", backgroundColor:"white", borderRadius: "25px"}}>Browse podcasts</button>
     </section>
     <footer style={{display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto", padding: "30px 15px"}}>
        <ul style={{display: "flex", flexWrap: "wrap", gap: "15px", paddingLeft: "5px",  listStyle: "none"}}>
          <li><a href="#" style={{textDecoration: "none", color: "white"}}>Legal</a></li>
          <li><a href="#" style={{textDecoration: "none", color: "white"}}>Safety&PrivacyCenter</a></li>
          <li><a href="#" style={{textDecoration: "none", color: "white"}}>PrivacyPolicy</a></li>
          <li><a href="#" style={{textDecoration: "none", color: "white"}}>Cookies</a></li>
          <li><a href="#" style={{textDecoration: "none", color: "white"}}>AboutAds</a></li>
          <li><a href="#" style={{textDecoration: "none", color: "white"}}>Accessibility</a></li>
          <li><a href="#" style={{textDecoration: "none", color: "white"}}>Cookies</a></li>
        </ul>
        <button className="btn" style={{alignSelf: "flex-start", fontWeight: "bold", color: "white", padding: "5px 20px", border: "1px solid white", borderRadius: "25px"}}>
          English
        </button>
     </footer>
    </div>

  )
}

export default Library
