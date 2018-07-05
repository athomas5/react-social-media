import React, { Component } from 'react';
import axios from 'axios';
import './Register.css';

import Input from '../Input/Input';

export default class Register extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
      userPassword: '',
      userPassword2: ''
    }
  }

  handleOnChange(e) {
    if (e.target.id === 'name-input') {
      this.setState({ userEmail: e.target.value });
    }

    if (e.target.id === 'email-input') {
      this.setState({ userEmail: e.target.value });
    }
    
    if (e.target.id === 'password-input') {
      this.setState({ userPassword: e.target.value });
    }

    if (e.target.id === 'password2-input') {
      this.setState({ userPassword2: e.target.value });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.userName,
      email: this.state.userEmail,
      password: this.state.userPassword,
      password2: this.state.userPassword2
    }

    axios.post('/api/users/register', user)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section className="register-container">
        <h1 className="header-title">Social Media App</h1>
        <form
          action="POST"
          className="login-form"
          onSubmit={e => this.onSubmit(e)}>

          <Input
            id="name-input"
            type="text"
            class="input input-name"
            placeholder="Full Name"
            onChange={e => this.handleOnChange(e)} />

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

          <Input
            id="password2-input"
            type="password"
            class="input input-password"
            placeholder="Confirm Password"
            onChange={e => this.handleOnChange(e)} />

          <button className="button-login-register" type="submit">Register</button>
        </form>
      </section>
    )
  }
}
