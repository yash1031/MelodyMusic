import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Library from '../../Library/Library'
import MainScreen from '../../MainScreen/MainScreen'
import SignUpFooter from './SignUpFooter/SignUpFooter'
import './Home.css'

const Home = () => {
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
        <div id="signUpFooter">
            <SignUpFooter></SignUpFooter>
        </div>
    </div>
  )
}

export default Home
