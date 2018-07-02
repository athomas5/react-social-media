import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Navbar.css';

export default class Navbar extends Component {
  render() {
    return (
      <section className="navbar-container">
        <Link to='/login' className='nav-link nav-link-login'>Login</Link>
        <Link to='/register' className='nav-link nav-link-register'>Register</Link>
      </section>
    )
  }
}
