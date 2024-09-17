import React, { useState } from 'react'

const EnterMobile = () => {
  let [currentCountryCode, setCurrentCountryCode]= useState('+91');
  const countryCodes= ["+20","+27","+51","+52","+54","+55","+56","+57","+62","+66","+84","+91","+212","+213","+233","+234","+254","+255","+256","+593","+852","+966","+971"]  
  document.addEventListener('click', (e)=>{
    // console.log("Background Clicked")
    let countryCodesElement= document.getElementById("countryCodes");
    // countryCodesElement.style.display===""? countryCodesElement.style.display= "none": countryCodesElement.style.display=""; 
     // Get the button and list elements
     const dropdownBtn = document.getElementById('countryCodesBtn');
     const dropdownList = document.getElementById('countryCodes');
    // If the click happens outside the dropdown button and dropdown content
    // if (!JSON.stringify(e.target).contains(dropdownBtn) && !JSON.stringify(e.target).contains(dropdownList)) {
        // countryCodesElement.style.display= "none";
    // }
  })
  const showHideCountryCodes= (e) =>{
    e.preventDefault();
    console.log("button clicked")
    let countryCodesElement= document.getElementById("countryCodes");
    countryCodesElement.style.display===""? countryCodesElement.style.display= "none": countryCodesElement.style.display=""; 
  }
  return (
    <div style={{display: "flex", flexDirection: "column",alignItems: "center" , gap: "20px", margin: "auto", width: "60%", paddingTop: "50px"}}>
      <h2 style={{color: "white"}}>Enter phone number</h2>
      <section style={{display: "flex", gap: "10px", width: "100%"}}>
        <button onClick={(e)=>showHideCountryCodes(e)} style={{position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", width: "15%", background: "black", border: "1px solid gray", height: "40px", borderRadius: "3px"}}>
            <span id="countryCodesBtn" style={{color: "white", float: "left"}}>{currentCountryCode}</span>
            <i class="fa-solid fa-angle-down" style={{ color: "gray", float: "right"}}></i>
            <ul id="countryCodes" style={{display: "none", margin: "0", padding: "0", position: "absolute", top: "40px", left: "0", width: "100%", height: "50vh", overflow: "auto",  background: "black", color: "white", border: "1px solid gray", borderRadius: "3px", listStyleType: "none"}}>
                {countryCodes.map((code)=>{
                    return (<li onClick={(e)=>{e.preventDefault(); setCurrentCountryCode(code) }} style={{textAlign: "start", paddingLeft: "5px"}}>{code}</li>)
                })}
            </ul>
        </button>
        <input type="text" placeholder='Phone number' style={{flex: "1", background: "black", border: "1px solid gray", borderRadius: "3px", height: "40px", padding: "0 10px", color: "white"}}/>
      </section>
      <button style={{alignSelf: "flex-start", border: "none", height: "50px", padding: "0 35px", borderRadius: "25px", color: "white", backgroundColor: "rgb(59 198 59 / 96%)"}}>Next</button>
    </div>
  ) 
}

export default EnterMobile
