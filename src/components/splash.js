import React from "react";
import "./splash.css";
import splashimage from "./images/PhotoeyeLogo.png";

const Splash = props => {
  return (
    <div className="splash-container">
      <img src={splashimage} alt="photoeye logo" className="logo-image" />
      <p className="motto">Train your eye and perfect your craft...</p>
      <div className="text-description">
        <p>
          When you look at a picture can you instantly know what the aperture,
          shutterspeed, and ISO of that is are? Yeah me neither, that's why I
          made Photoeye. It's a way for me to practice identifying the settings
          of an existing picture. That way when I go out shooting I will have an
          idea of what settings I need to get the shot that I want. So come on
          in and see if you have a Photoeye...
        </p>
      </div>
      <div className="splash-info">
        <h5 className="project-info">
          By: <a href="https://adamlee.dev">Adam Lee</a>
        </h5>
        <p className="project-info">
          <p>
            This Project:{" "}
            <a href="https://github.com/Adamcglee/photoeye">Repo</a>
          </p>
        </p>
        <div className="project-info">
          <a className="splash-link" href="https://github.com/Adamcglee">
            <i className="fab fa-github" />
          </a>
          <a
            className="splash-link"
            href="https://www.linkedin.com/in/adamcglee/"
          >
            <i className="fab fa-linkedin" />
          </a>
          <a
            className="splash-link"
            href="https://drive.google.com/file/d/1laxkzXChH-a-O4ybtUslVucNtuCTsWsZ/view?usp=sharing"
          >
            <i className="fas fa-file-alt" />
          </a>
        </div>
      </div>
      <div className="enter-button" onClick={props.splashButton}>
        Enter
      </div>
    </div>
  );
};

export default Splash;
