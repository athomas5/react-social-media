import React, { Component } from 'react';
import axios from 'axios';

import Input from '../Input/Input';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPassword: ''
    }
  }

  handleOnChange(e) {
    if (e.target.id === 'email-input') {
      this.setState({ userEmail: e.target.value });
    }

    if (e.target.id === 'password-input') {
      this.setState({ userPassword: e.target.value });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.userEmail,
      password: this.state.userPassword
    }
  }

  render() {
    return (
      <section className="login-container">
        <h1 className="header-title">Social Media App</h1>
        <form 
          action="POST" 
          className="login-form" 
          onSubmit={e => this.onSubmit(e)}>

          <Input
            id="email-input"
            type="email"
            class="input input-email"
            placeholder="Email address"
            onChange={e => this.handleOnChange(e)} />

          <Input
            id="password-input"
            type="password"
            class="input input-password"
            placeholder="Password"
            onChange={e => this.handleOnChange(e)} />

          <button className="button-login-register" type="submit">Login</button>
          <p className="forgot-password">Forgot your password?</p>
        </form>
      </section>
    )
  }
}
