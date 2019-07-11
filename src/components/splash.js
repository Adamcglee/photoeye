import React from 'react';
import './splash.css';
import splashimage from './images/PhotoeyeLogo.png';

const Splash = (props) => {
    return ( 
        <div className="splash-container">
            <img src={splashimage} alt="photoeye logo" className="logo-image"/>
            <p className="motto">Train your eye and perfect your craft...</p>
            <div>
                <h6>By: <a href="https://adamlee.dev">Adam Lee</a></h6>
                <p><a href="https://github.com/Adamcglee/photoeye">Github Repo</a></p>
                <a href="https://github.com/Adamcglee"><i class="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/adamcglee/"><i class="fab fa-linkedin"></i></a>
                <a href="https://drive.google.com/file/d/1laxkzXChH-a-O4ybtUslVucNtuCTsWsZ/view?usp=sharing"><i class="fas fa-file-alt"></i></a>
            </div>
            <div className="enter-button" onClick={props.splashButton}>Enter</div>
        </div>
     );
}
 
export default Splash;