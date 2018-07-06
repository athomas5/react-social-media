import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="component-container footer-container">
        <p className="copyright">&copy; Copyright {new Date().getFullYear()}</p>
      </footer>
    )
  }
}
