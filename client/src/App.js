import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Landing from './components/layout/Landing/Landing';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path='/' component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
