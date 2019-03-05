import React, { Component } from 'react';
import PhotoTest from './components/phototest';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <PhotoTest />
        </header>
      </div>
    );
  }
}

export default App;
