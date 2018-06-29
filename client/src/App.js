import React, { Component } from 'react';
import './App.css';

import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Login /> */}
        <Register />
      </div>
    );
  }
}

export default App;
