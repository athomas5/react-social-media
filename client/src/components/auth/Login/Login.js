import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPassword: ''
    }
  }

  onChange(e) {
    if (e.target.type === 'email') {
      this.setState({ userEmail: e.target.value });
    }
    
    if (e.target.type === 'password') {
      this.setState({ userPassword: e.target.value });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    
    console.log('Email: ', this.state.userEmail)
    console.log('Password: ', this.state.userPassword)
  }

  render() {
    return (
      <section className="login-container">
        <form 
          action="POST" 
          className="login-form" 
          onSubmit={e => this.onSubmit(e)}>
          <input 
            type="email" 
            className="input-email" 
            onChange={e => this.onChange(e)}
            value={this.state.userEmail}
            placeholder="Email address"/>
          <input 
            type="password" 
            className="input-password" 
            onChange={e => this.onChange(e)}
            value={this.state.userPassword}
            placeholder="Password"/>

          <button className="button-login" type="submit">Login</button>
          <p className="forgot-password">Forgot your password?</p>
        </form>
      </section>
    )
  }
}
