import React, { Component } from 'react'

import './Footer.css';

export default class Footer extends Component {
  render() {
    const date = new Date();
    
    return (
      <section className="component-container footer-container">
        <p class="copyright">&copy; Copyright {date.getUTCFullYear()}</p>
      </section>
    )
  }
}
