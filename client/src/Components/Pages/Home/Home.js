import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Library from '../../Library/Library'
import MainScreen from '../../MainScreen/MainScreen'
import SignUpFooter from './SignUpFooter/SignUpFooter'
import './Home.css'
import WebPlaybackComponent from './WebPlaybackComponent/WebPlaybackComponent'

const Home = () => {
  const token= 'BQAJkmwGxPHhOvqCqY9H1R42eldyx82EQGvn2tQUxHZMMGhOrcBRlC0N90ZKVjfY6aGMavyjVjfWa625xWFmF6lgzEfNDZ-oUZPTDV_0Bn_j05wetDSg1AltKhZRHvPpnfMGj3S_Wk1N8xWIFTwPrBG4rfwOy36UMb68GcN9ELDTQXBxQJK8NTItPdGOiSKby7Gi_wxHTGzA_DWnSSvIqaZJ7y9z6o2GQ6BXchl9';

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
