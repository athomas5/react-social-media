import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
// import axios from 'axios';

import Input from '../Input/Input';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
      userPassword: '',
      userPassword2: '',
      errors: { name: '', email: '', password: '', password2: '' }
    }
  }

  handleOnChange(e) {
    if (e.target.id === 'name-input') {
      this.setState({ userName: e.target.value });
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

    this.props.registerUser(user);

    // axios.post('/api/users/register', user)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    return (
      <section className="register-container">
        <h1 className="header-title">Register</h1>
        <form
          action="POST"
          className="register-form"
          onSubmit={e => this.onSubmit(e)}>

          <div className="input-container">
            <Input
              id="name-input"
              type="text"
              class="input input-name"
              placeholder="Full Name"
              isInValid={this.state.errors.name !== undefined && this.state.errors.name !== ''}
              onChange={e => this.handleOnChange(e)} />
              
            {this.state.errors.name && <p className="error-msg">{this.state.errors.name}</p>}
          </div>

          <div className="input-container">
            <Input
              id="email-input"
              type="email"
              class="input input-email"
              placeholder="Email address"
              isInValid={this.state.errors.email !== undefined && this.state.errors.email !== ''}
              onChange={e => this.handleOnChange(e)} />

            {this.state.errors.email && <p className="error-msg">{this.state.errors.email}</p>}
          </div>

          <div className="input-container">
            <Input
              id="password-input"
              type="password"
              class="input input-password"
              placeholder="Password"
              isInValid={this.state.errors.password !== undefined && this.state.errors.password !== ''}
              onChange={e => this.handleOnChange(e)} />

            {this.state.errors.password && <p className="error-msg">{this.state.errors.password}</p>}
          </div>

          <div className="input-container">
            <Input
              id="password2-input"
              type="password"
              class="input input-password"
              placeholder="Confirm Password"
              isInValid={this.state.errors.password2 !== undefined && this.state.errors.password2 !== ''}
              onChange={e => this.handleOnChange(e)} />

            {this.state.errors.password2 && <p className="error-msg">{this.state.errors.password2}</p>}
          </div>

          <button className="button-login-register" type="submit">Register</button>
        </form>
      </section>
    )
  }
}

Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(Register);
