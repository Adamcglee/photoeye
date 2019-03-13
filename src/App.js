import React, { Component } from 'react';
import PhotoTest from './components/phototest';
import Splash from './components/splash'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: true
    }
  };

  splashButton = () => {
    this.setState({ splash: false})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.splash === true ? <Splash splashButton={this.splashButton}/> : <PhotoTest />}
        </header>
      </div>
    );
  }
}

export default App;
