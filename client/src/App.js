import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import store from './store';

import PrivateRoute from './components/PrivateRoute';

import Landing from './components/Landing';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';

import './App.css';

const checkForToken = () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      store.dispatch(clearCurrentProfile());
      window.location.href = '/login';
    }
  }
}

checkForToken();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />

            {/* Public Routes */}
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />

            {/* Private Routes */}
            <Switch><PrivateRoute exact path='/create-profile' component={CreateProfile} /></Switch>
            <Switch><PrivateRoute exact path='/dashboard' component={Dashboard} /></Switch>
            <Switch><PrivateRoute exact path='/edit-profile' component={EditProfile} /></Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
