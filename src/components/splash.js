import React from 'react';
import './splash.css';
import splashimage from './images/PhotoeyeLogo.png';

const Splash = (props) => {
    return ( 
        <div className="splash-container">
            <img src={splashimage} alt="photoeye logo" className="logo-image"/>
            <p className="motto">Train your eye and perfect your craft...</p>
            <div className="enter-button" onClick={props.splashButton}>Enter</div>
        </div>
     );
}
 
export default Splash;