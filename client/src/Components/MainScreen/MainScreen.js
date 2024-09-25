import React from 'react'
import './MainScreen.css'
import {
      Outlet
} from "react-router-dom"


const MainScreen = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default MainScreen
