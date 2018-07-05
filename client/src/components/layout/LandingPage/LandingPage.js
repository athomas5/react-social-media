import React, { Component } from 'react'

import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <section className="component-container landingpage-container">
        <div className="text-container">
          <h1 className="title">Social Media App</h1>
          <p className="description">
            Create and share your own developer profile with like-minded professionals. Start discussions, share thoughts, and get help!
          </p>
        </div>
      </section>
    )
  }
}
