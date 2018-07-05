import React, { Component } from 'react'

import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <p className="copyright">&copy; Copyright {new Date().getFullYear()}</p>
      </footer>
    )
  }
}
