import React, {useState, useContext} from 'react'
import MobileContext from './MobileContext'
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../../../../../Context/User/UserContext'

const MobileState = (props) => {
    const context= useContext(UserContext);
    const {fullPhone, mobileExist,requestOtp, deleteOtp}= context;
    const [otpExpiryTimeout, setOtpExpiryTimeout]= useState(null);

  return (
    <MobileContext.Provider value={{}}>
      {props.children}
    </MobileContext.Provider>
  )
}

export default MobileState
