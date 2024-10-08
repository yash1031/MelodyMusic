import React, {useContext} from 'react'
import Redirection from './Redirection';
import UserContext from '../../../../Context/User/UserContext';

const MainPage = ({setComponentToRender}) => {
    const context= useContext(UserContext);
    const {email, setEmail, sendEmailWithLink}= context;
    const sendLink= async (e) =>{
        e.preventDefault();
        if(email==='') document.getElementById('emailRequired').style.display= "";
        setTimeout(()=>{
          document.getElementById('emailRequired').style.display= "none";
        },3000);
        //Put checks on email

        //Send link to reset password;
      const linkSent= await sendEmailWithLink(email);
      if(linkSent[0]){
        console.log("Link sent successfully: "+ linkSent[1]);
        setComponentToRender("Redirection");
      }
      else{
        console.log("Error in sending the link: "+ linkSent[1]);
        alert(linkSent[1]);
      }
    }
    const inputEmail= (e)=>{
        e.preventDefault();
        setEmail(e.target.value);
    }
    
  return (
    <div>
        <h1 style={{fontWeight: "bold", textAlign: "center"}}>Reset your password</h1>
        <p>Enter the email address or username linked to your Spotify account and we'll send you an email.</p>
        <section id="email">
          <h3>Email address or username</h3>
          <input onChange={e=> inputEmail(e)} value={email} type="text" placeholder='name@domain.com' style={{display: "block", width:"100%", height: "40px", padding: "0 7px", backgroundColor: "black", font: "gray", borderRadius: "5px", border: "1px solid gray"}} />
          <div id="emailRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
          <a id="needSupport" href="#" style={{display: "block", color: "white"}}>Need Support?</a>
        </section>
        <button onClick={e=>sendLink(e)} style={{display: "block",border: "none", height: "50px", color: "white", borderRadius: "25px", width: "100%", backgroundColor: "rgb(59 198 59 / 96%)"}}>Send Link</button>
    </div>
  )
}

export default MainPage
