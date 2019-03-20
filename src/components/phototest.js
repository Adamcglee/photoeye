import React, { Component } from "react";
import axios from "axios";
import splashimage from "./images/PhotoeyeLogo.png";
import "./phototest.css";

class PhotoTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      difficulty: "null",
      imageURL: "",
      htmlURL: "",
      photographer: "",
      username: "",
      location: "",
      shutterspeed: "",
      aperture: "",
      iso: "",
      selectedfstop: "",
      selectedshutter: "",
      selectediso: "",
      showanswer: false,
      fstopanswer: false,
      shutteranswer: false,
      isoanswer: false,
      isCorrect: false,
      difficultyfstops: [],
      difficultyshutters: [],
      difficultyisos: [],
      fstops: [
        1.0,
        1.1,
        1.2,
        1.4,
        1.6,
        1.7,
        1.8,
        2.0,
        2.2,
        2.4,
        2.5,
        2.8,
        3.2,
        3.3,
        3.5,
        4.0,
        4.5,
        4.8,
        5.0,
        5.6,
        6.3,
        6.7,
        7.1,
        8.0,
        9.0,
        9.5,
        10,
        11,
        13,
        14,
        16,
        18,
        19,
        20,
        22,
        25,
        27,
        29,
        32,
        36,
        38,
        40,
        45,
        50,
        57,
        64
      ],
      shutterspeeds: [
        "1/8000",
        "1/6400",
        "1/6000",
        "1/5000",
        "1/4000",
        "1/3200",
        "1/3000",
        "1/2500",
        "1/2000",
        "1/1600",
        "1/1500",
        "1/1250",
        "1/1000",
        "1/800",
        "1/750",
        "1/640",
        "1/500",
        "1/400",
        "1/350",
        "1/320",
        "1/250",
        "1/200",
        "1/180",
        "1/160",
        "1/125",
        "1/100",
        "1/90",
        "1/80",
        "1/60",
        "1/50",
        "1/45",
        "1/40",
        "1/30",
        "1/25",
        "1/20",
        "1/15",
        "1/13",
        "1/10",
        "1/8",
        "1/6",
        "1/5",
        "1/4",
        "1/3",
        "1/2.5",
        "1/2",
        "1/0.3",
        "1/0.5",
        "1",
        "1.3",
        "1.5",
        "1.6",
        "2",
        "2.5",
        "3",
        "4",
        "5",
        "6",
        "8",
        "10",
        "12",
        "13",
        "16"
      ],
      isos: [
        12,
        16,
        20,
        25,
        32,
        40,
        50,
        64,
        80,
        100,
        125,
        160,
        200,
        250,
        320,
        400,
        500,
        640,
        800,
        1000,
        1250,
        1600,
        2000,
        2500,
        3200,
        4000,
        5000,
        6400,
        8000,
        10000,
        12500
      ]
    };
  }

  // For testing purposes
  showAnswer = () => {
    console.log("Fstop: ", this.state.aperture);
    console.log("Shutterspeed: ", this.state.shutterspeed);
    console.log("ISO: ", this.state.iso);
  };

  // Check user guesses vs actual answers
  checkAnswer = async () => {
    this.showAnswer();
    await this.checkfstop();
    await this.checkshutter();
    await this.checkiso();
    if (
      this.state.fstopanswer === true &&
      this.state.shutteranswer === true &&
      this.state.isoanswer === true
    ) {
      this.setState({ isCorrect: true }, () => {
        console.log("That's right!");
      });
    } else {
      console.log("Nope, try again!");
    }
    this.setState({ showanswer: true });
  };

  // Fstop specific check
  checkfstop = () => {
    const fstopAnsArr = this.state.selectedfstop.split(" ");
    if (
      Number(this.state.aperture) >= Number(fstopAnsArr[0]) &&
      Number(this.state.aperture) <= Number(fstopAnsArr[2])
    ) {
      this.setState({ fstopanswer: true }, () => {
        console.log("Fstop is correct");
      });
    }
  };

  // Shutterspeed specific check
  checkshutter = () => {
    const shutterAnsArr = this.state.selectedshutter.split(" ");
    if (
      this.parseFractions(this.state.shutterspeed) >=
        this.parseFractions(shutterAnsArr[0]) &&
      this.parseFractions(this.state.shutterspeed) <=
        this.parseFractions(shutterAnsArr[2])
    ) {
      this.setState({ shutteranswer: true }, () => {
        console.log("Shutterspeed is correct");
      });
    }
  };

  // Iso specific check
  checkiso = () => {
    const isoAnsArr = this.state.selectediso.split(" ");
    if (
      Number(this.state.iso) >= Number(isoAnsArr[0]) &&
      Number(this.state.iso) <= Number(isoAnsArr[2])
    ) {
      this.setState({ isoanswer: true }, () => {
        console.log("ISO is correct");
      });
    }
  };

  // Fraction string conversion into arithmetic
  parseFractions(string) {
    let converted = string.split("/");
    return converted[0] / converted[1];
  }

  // Check if current photo has mecessary meta data
  photoCheck = () => {
    if (this.state.aperture && this.state.shutterspeed && this.state.iso) {
      console.log("all good");
    } else {
      console.log("let's try again");
      this.getPhoto();
    }
  };

  // Get a new photo
  getPhoto = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/random/?client_id=${
          process.env.REACT_APP_API_ACCESS_TOKEN
        }`
        //   , {params: {count: 10}}
      )
      .then(res => {
        this.setState(
          {
            // photos: res.data,
            imageURL: res.data.urls.regular,
            htmlURL: res.data.links.html,
            photographer: res.data.user.name,
            username: res.data.user.username,
            location: res.data.user.location,
            shutterspeed: res.data.exif.exposure_time,
            aperture: res.data.exif.aperture,
            iso: res.data.exif.iso,
            isCorrect: false,
            fstopanswer: false,
            shutteranswer: false,
            isoanswer: false,
            showanswer: false
          },
          () => {
            this.photoCheck();
          }
        );
      })
      .catch(err => console.log(err));
  };

  // Change handler for fstop
  fstopChange = e => {
    this.setState({ selectedfstop: e.target.value });
  };

  // Change handler for shutterspeed
  shutterChange = e => {
    this.setState({ selectedshutter: e.target.value });
  };

  // Change handler for ISO
  isoChange = e => {
    this.setState({ selectediso: e.target.value });
  };

  // Change handler for difficulty
  difficultyChange = e => {
    this.setState({ difficulty: e.target.value }, () =>
      this.setDifficultyRange()
    );
  };

  setDifficultyRange = () => {
    const newfstops = [];
    const newshutters = [];
    const newisos = [];
    if (this.state.difficulty === "easy") {
      // Easy Fstop Band
      for (let i = 0; i < this.state.fstops.length - 1; i += 15) {
        newfstops.push(
          `${this.state.fstops[i]} - ${this.state.fstops[i + 14]}`
        );
      }
      newfstops.push(`${this.state.fstops[this.state.fstops.length - 1]}+`);
      // Easy Shutterspeed Band
      for (let i = 0; i < this.state.shutterspeeds.length - 2; i += 15) {
        newshutters.push(
          `${this.state.shutterspeeds[i]} - ${this.state.shutterspeeds[i + 14]}`
        );
      }
      newshutters.push(
        `${this.state.shutterspeeds[this.state.shutterspeeds.length - 2]}+`
      );
      // Easy Iso Band
      for (let i = 0; i < this.state.isos.length - 1; i += 15) {
        newisos.push(`${this.state.isos[i]} - ${this.state.isos[i + 14]}`);
      }
      newisos.push(`${this.state.isos[this.state.isos.length - 1]}+`);
    } else if (this.state.difficulty === "medium") {
      // Medium Fstop Band
      for (let i = 0; i < this.state.fstops.length - 4; i += 9) {
        newfstops.push(`${this.state.fstops[i]} - ${this.state.fstops[i + 8]}`);
      }
      newfstops.push(`${this.state.fstops[this.state.fstops.length - 1]}+`);
      // Medium Shutterspeed Band
      for (let i = 0; i < this.state.shutterspeeds.length - 2; i += 10) {
        newshutters.push(
          `${this.state.shutterspeeds[i]} - ${this.state.shutterspeeds[i + 9]}`
        );
      }
      newshutters.push(
        `${this.state.shutterspeeds[this.state.shutterspeeds.length - 2]}+`
      );
      // Medium Iso Band
      for (let i = 0; i < this.state.isos.length - 1; i += 10) {
        newisos.push(`${this.state.isos[i]} - ${this.state.isos[i + 9]}`);
      }
      newisos.push(`${this.state.isos[this.state.isos.length - 1]}+`);
    } else if (this.state.difficulty === "hard") {
      // Hard Fstop Band
      for (let i = 0; i < this.state.fstops.length - 1; i += 3) {
        newfstops.push(`${this.state.fstops[i]} - ${this.state.fstops[i + 2]}`);
      }
      newfstops.push(`${this.state.fstops[this.state.fstops.length - 1]}+`);
      // Hard Shutterspeed Band
      for (let i = 0; i < this.state.shutterspeeds.length - 2; i += 5) {
        newshutters.push(
          `${this.state.shutterspeeds[i]} - ${this.state.shutterspeeds[i + 4]}`
        );
      }
      newshutters.push(
        `${this.state.shutterspeeds[this.state.shutterspeeds.length - 2]}+`
      );
      // Hard Iso Band
      for (let i = 0; i < this.state.isos.length - 1; i += 3) {
        newisos.push(`${this.state.isos[i]} - ${this.state.isos[i + 2]}`);
      }
      newisos.push(`${this.state.isos[this.state.isos.length - 1]}+`);
    }
    this.setState({
      difficultyfstops: newfstops,
      difficultyshutters: newshutters,
      difficultyisos: newisos
    });
  };

  componentDidMount() {
    this.getPhoto();
    this.setDifficultyRange();
  }

  render() {
    console.log("Fstop: ", this.state.fstopanswer);
    console.log("Shutterspeed: ", this.state.shutteranswer);
    console.log("ISO: ", this.state.isoanswer);
    return (
      <div className="container">
        <div className="img-container">
          <img
            src={splashimage}
            alt="photoeye logo"
            className="test-logo-image"
          />
        </div>
        <div className="testContainer">
          <div className="frame">
            <div className="image">
              <img src={this.state.imageURL} alt="random photograph" className="test-image"/>
            </div>
          </div>
          <div className="imagedata">
            <div className="photographerInfo">
              <h3>
                <a
                  href={`https://unsplash.com/@${
                    this.state.username
                  }?utm_source=photoeye&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.photographer}
                </a>
              </h3>
              <p>
                Location:{" "}
                {this.state.location === null ? "Unknown" : this.state.location}
              </p>
              <p>
                Photo from{" "}
                <a
                  href="https://unsplash.com/?utm_source=photoeye&utm_medium=referral"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unsplash
                </a>
              </p>
            </div>
            <div className="difficultydropdown dropdown">
              <h5>Difficulty: </h5>
              <select
                value={this.state.difficulty}
                onChange={this.difficultyChange}
              >
                <option>Please Choose</option>
                <option key="easy" value="easy">
                  Easy
                </option>
                <option key="medium" value="medium">
                  Medium
                </option>
                <option key="hard" value="hard">
                  Hard
                </option>
              </select>
            </div>
            <br />
            <div className="answers">
              <div className="answerdropdown">
                <div className="aperturedropdown dropdown">
                  <h5>Aperture: </h5>
                  <div className="answer-right-side">
                    <div className="dropdown-container">
                      <select
                        value={this.state.selectedfstop}
                        onChange={this.fstopChange}
                      >
                        <option>Select One</option>
                        {this.state.difficultyfstops.map(fstoprange => (
                          <option key={fstoprange} value={fstoprange}>
                            {fstoprange}
                          </option>
                        ))}
                      </select>
                    </div>
                    {this.state.showanswer === false ? (
                      <div className="spaceholder" />
                    ) : this.state.fstopanswer === true ? (
                      <div className="correct">
                        <i className="fas fa-check" />
                        <p className="answer">{this.state.aperture}</p>
                      </div>
                    ) : (
                      <i className="fas fa-times" />
                    )}
                  </div>
                </div>
              </div>
              <div className="answerdropdown">
                <div className="shutterropdown dropdown">
                  <h5>Shutterspeed: </h5>
                  <div className="answer-right-side">
                    <div className="dropdown-container">
                      <select
                        value={this.state.selectedshutter}
                        onChange={this.shutterChange}
                      >
                        <option>Select One</option>
                        {this.state.difficultyshutters.map(shutter => (
                          <option key={shutter} value={shutter}>
                            {shutter}
                          </option>
                        ))}
                      </select>
                    </div>
                    {this.state.showanswer === false ? (
                      <div className="spaceholder" />
                    ) : this.state.shutteranswer === true ? (
                      <div className="correct">
                        <i className="fas fa-check" />
                        <p className="answer">{this.state.shutterspeed}</p>
                      </div>
                    ) : (
                      <i className="fas fa-times" />
                    )}
                  </div>
                </div>
              </div>
              <div className="answerdropdown">
                <div className="isodropdown dropdown">
                  <h5>ISO: </h5>
                  <div className="answer-right-side">
                    <div className="dropdown-container">
                      <select
                        value={this.state.selectediso}
                        onChange={this.isoChange}
                      >
                        <option>Select One</option>
                        {this.state.difficultyisos.map(iso => (
                          <option key={iso} value={iso}>
                            {iso}
                          </option>
                        ))}
                      </select>
                    </div>
                    {this.state.showanswer === false ? (
                      <div className="spaceholder" />
                    ) : this.state.isoanswer === true ? (
                      <div className="correct">
                        <i className="fas fa-check" />
                        <p className="answer">{this.state.iso}</p>
                      </div>
                    ) : (
                      <i className="fas fa-times" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="btn">
              {this.state.isCorrect === false ? (
                <button className="submit-button" onClick={this.checkAnswer}>
                  Submit
                </button>
              ) : (
                <button className="submit-button" onClick={this.getPhoto}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoTest;
