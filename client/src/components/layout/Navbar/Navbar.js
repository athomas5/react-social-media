import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css';

export default class Navbar extends Component {
  render() {
    return (
      <section className="navbar-container">
        <Link to='/login' className='nav-link nav-login-link'>Login</Link>
        <Link to='/register' className='nav-link nav-register-link'>Register</Link>
      </section>
    )
  }
}
