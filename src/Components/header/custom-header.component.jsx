import React from "react";
import Logo from '../../assets/logo.png';
import './custom-header.styles.scss'
const CustomHeader = () =>
(
    <div className="custom-header">
        <img src={Logo} className="main-logo"/>
   </div>
)

export default CustomHeader