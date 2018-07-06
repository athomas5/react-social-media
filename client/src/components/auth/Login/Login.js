import React, { Component } from 'react';
import axios from 'axios';

import Input from '../Input/Input';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPassword: '',
      errors: { email: '', password: '' }
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

    // TODO: Handle private login route

    axios.post('/api/users/login', user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    return (
      <section className="login-container">
        <h1 className="header-title">Social Media App</h1>
        <form 
          action="POST" 
          className="login-form" 
          onSubmit={e => this.onSubmit(e)}>

          <div className="input-container">
            <Input
              id="email-input"
              type="email"
              class="input input-email"
              placeholder="Email address"
              isInValid={this.state.errors.name !== undefined && this.state.errors.email !== ''}
              onChange={e => this.handleOnChange(e)} />

              {this.state.errors.email && <p className="error-msg">{this.state.errors.email}</p>}
            </div>

          <div className="input-container">
            <Input
              id="password-input"
              type="password"
              class="input input-password"
              placeholder="Password"
              isInValid={this.state.errors.name !== undefined && this.state.errors.password !== ''}
              onChange={e => this.handleOnChange(e)} />

              {this.state.errors.password && <p className="error-msg">{this.state.errors.password}</p>}
          </div>

          <button className="button-login-register" type="submit">Login</button>
          <p className="forgot-password">Forgot your password?</p>
        </form>
      </section>
    )
  }
}
