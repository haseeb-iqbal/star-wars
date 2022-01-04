import React from "react";
import Logo from '../../assets/logo.png';
import './custom-header.styles.scss'
import { useNavigate } from "react-router-dom";

const CustomHeader = () =>{
    let navigate = useNavigate();
    return(
        <div className="custom-header">
            <img src={Logo} className="main-logo" onClick={()=>{navigate('/')}}/>
    </div>
    );
}

export default CustomHeader