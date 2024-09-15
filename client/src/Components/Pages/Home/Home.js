import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Library from '../../Library/Library'
import AllContent from '../../AllContent/AllContent'
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
        <div id="allContent">
            <AllContent></AllContent>
        </div>
        </div>
    </div>
  )
}

export default Home
