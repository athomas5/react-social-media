import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import HomePage from './components/layout/HomePage/HomePage';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
