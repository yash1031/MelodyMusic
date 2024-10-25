import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Library from '../../Library/Library'
import MainScreen from '../../MainScreen/MainScreen'
import SignUpFooter from './SignUpFooter/SignUpFooter'
import './Home.css'
import WebPlaybackComponent from './WebPlaybackComponent/WebPlaybackComponent'

const Home = () => {
  const token= 'BQAsDREK27O6LakbeMPzGOEGCBQ9asghV70a7AMkXumTRMVPyC1aav9GpnmAmltlpfRErBHVWca_1QRYvG9yPBF6NUFXZVPQPt3Ra-_boKF_Rhr7DYL11E1s6xMPSHBLeJZZmIxn7egM-BdXrL-ugFDUsg5i1Xo0MerEq6XY0KAEVqCqvl12TXnLgc2N8S4OTvY4SX4LwsN-9mpYKg9RsGJh4v3SIy6ft2VbCIL7';

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
