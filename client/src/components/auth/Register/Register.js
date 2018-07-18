import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';

import Input from '../../common/Input/Input';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      userName: "",
      userEmail: "",
      userPassword: "",
      userPassword2: "",
      errors: { name: "", email: "", password: "", password2: "" }
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleOnChange(e) {
    if (e.target.id === "name-input") {
      this.setState({ userName: e.target.value });
    }

    if (e.target.id === "email-input") {
      this.setState({ userEmail: e.target.value });
    }

    if (e.target.id === "password-input") {
      this.setState({ userPassword: e.target.value });
    }

    if (e.target.id === "password2-input") {
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
    };

    this.props.registerUser(user, this.props.history);
  }

  render() {
    return (
      <section className="register-container">
        <h1 className="header-title">Register</h1>
        <form
          action="POST"
          className="register-form"
          onSubmit={e => this.onSubmit(e)}
        >
          <div className="input-container">
            <Input
              id="name-input"
              type="text"
              class="input input-name"
              placeholder="Full Name"
              value={this.state.userName}
              isInValid={
                this.state.errors.name !== undefined &&
                this.state.errors.name !== ""
              }
              onChange={e => this.handleOnChange(e)}
            />

            {this.state.errors.name && (
              <p className="error-msg">{this.state.errors.name}</p>
            )}
          </div>

          <div className="input-container">
            <Input
              id="email-input"
              type="email"
              class="input input-email"
              placeholder="Email address"
              value={this.state.userEmail}
              isInValid={
                this.state.errors.email !== undefined &&
                this.state.errors.email !== ""
              }
              onChange={e => this.handleOnChange(e)}
            />

            {this.state.errors.email && (
              <p className="error-msg">{this.state.errors.email}</p>
            )}
          </div>

          <div className="input-container">
            <Input
              id="password-input"
              type="password"
              class="input input-password"
              placeholder="Password"
              value={this.state.userPassword}
              isInValid={
                this.state.errors.password !== undefined &&
                this.state.errors.password !== ""
              }
              onChange={e => this.handleOnChange(e)}
            />

            {this.state.errors.password && (
              <p className="error-msg">{this.state.errors.password}</p>
            )}
          </div>

          <div className="input-container">
            <Input
              id="password2-input"
              type="password"
              class="input input-password"
              placeholder="Confirm Password"
              value={this.state.userPassword2}
              isInValid={
                this.state.errors.password2 !== undefined &&
                this.state.errors.password2 !== ""
              }
              onChange={e => this.handleOnChange(e)}
            />

            {this.state.errors.password2 && (
              <p className="error-msg">{this.state.errors.password2}</p>
            )}
          </div>

          <button className="button-login-register" type="submit">
            Register
          </button>
        </form>
      </section>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
