import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Library from '../../Library/Library'
import MainScreen from '../../MainScreen/MainScreen'
import SignUpFooter from './SignUpFooter/SignUpFooter'
import './Home.css'
import WebPlaybackComponent from './WebPlaybackComponent/WebPlaybackComponent'

const Home = () => {
  const token= process.env.REACT_APP_player_access_token;
  console.log("token ", token);

  return (
    <div id="home">
        <div id="nav">
        <Navbar></Navbar>
        </div>
        <div id="libraryAndContent">
            <div id="library">
                <Library></Library>
            </div>
            <div id="mainScreen">
                <MainScreen></MainScreen>
            </div>
        </div>

        <div id="webPlaybackComp">
            <WebPlaybackComponent token={token}></WebPlaybackComponent>
        </div>
        {/* <div id="signUpFooter">
            <SignUpFooter></SignUpFooter>
        </div> */}
    </div>
  )
}

export default Home
