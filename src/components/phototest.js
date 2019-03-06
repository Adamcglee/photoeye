import React, { Component } from "react";
import axios from "axios";
import "./phototest.css";

class PhotoTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      imageURL: "",
      htmlURL: "",
      photographer: "",
      location: "",
      shutterspeed: "",
      aperture: "",
      iso: "",
      selectedfstop: "",
      selectedshutter: "",
      selectediso: "",
      fstops: [
        1.0,
        1.1,
        1.2,
        1.4,
        1.6,
        1.8,
        2.0,
        2.2,
        2.4,
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
        42,
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
        "1/0.3",
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
      ],
      isCorrect: false,
      showAnswer: false
    };
  }

  checkAnswer = () => {
    if (this.state.selectedfstop === this.state.aperture) {
      this.setState({ isCorrect: true });
      console.log("That's right!");
    } else {
      this.setState({ showAnswer: true });
      console.log("Nope, try again!");
    }
  };

  photoCheck = () => {
    if (
      this.state.aperture !== null &&
      this.state.shutterspeed !== null &&
      this.state.iso !== null
    ) {
      console.log("all good");
    } else {
      console.log("let's try again");
      this.getPhoto();
    }
  };

  getPhoto = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/random/?client_id=${
          process.env.REACT_APP_API_ACCESS_TOKEN
        }`
        //   , {params: {count: 10}}
      )
      .then(res => {
        this.setState({
          // photos: res.data,
          imageURL: res.data.urls.regular,
          htmlURL: res.data.links.html,
          photographer: res.data.user.name,
          location: res.data.user.location,
          shutterspeed: res.data.exif.exposure_time,
          aperture: res.data.exif.aperture,
          iso: res.data.exif.iso,
          isCorrect: false
        });
        this.photoCheck();
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log("Fstop: ", this.state.fstops.length)
    console.log("Shutterspeed: ", this.state.shutterspeeds.length)
    console.log("ISO: ", this.state.isos.length)
    return (
      <div className="testContainer">
        <div className="image">
          <img src={this.state.imageURL} alt="random photograph" />
          <button onClick={this.getPhoto}>Get Photo</button>
        </div>
        <div className="imagedata">
          <div className="photographerInfo">
            <h3>{this.state.photographer}</h3>
            <p>Location: {this.state.location}</p>
            <p>Photographers URL: {this.state.htmlURL}</p>
          </div>
          <br />
          <p>Shutter Speed: {this.state.shutterspeed}</p>
          <p>Aperture: {this.state.aperture}</p>
          <p>ISO: {this.state.iso}</p>
          <br />
          <div className="aperturedropdown">
            f-stop
            <select
              value={this.state.selectedfstop}
              onChange={e => this.setState({ selectedfstop: e.target.value })}
            >
              {this.state.fstops.map(fstop => (
                <option key={fstop} value={fstop}>
                  {fstop}
                </option>
              ))}
            </select>
          </div>
          <div className="shutterropdown">
            shutter speed
            <select
              value={this.state.selectedshutter}
              onChange={e => this.setState({ selectedshutter: e.target.value })}
            >
              {this.state.shutterspeeds.map(fstop => (
                <option key={fstop} value={fstop}>
                  {fstop}
                </option>
              ))}
            </select>
          </div>
          <div className="isodropdown">
            iso
            <select
              value={this.state.selectediso}
              onChange={e => this.setState({ selectediso: e.target.value })}
            >
              {this.state.isos.map(iso => (
                <option key={iso} value={iso}>
                  {iso}
                </option>
              ))}
            </select>
          </div>
          <div>
            {this.state.isCorrect === false ? (
              <button onClick={this.checkAnswer}>Submit</button>
            ) : (
              <button onClick={this.getPhoto}>Next</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoTest;
