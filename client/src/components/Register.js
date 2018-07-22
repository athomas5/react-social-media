import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';

import Input from './Input';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    const inputType = e.target.id.substring(0, e.target.id.indexOf('-'));
    this.setState({ [inputType]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
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
          <Input
            id="name-input"
            type="text"
            class="input input-name"
            placeholder="Full Name"
            value={this.state.name}
            error={this.state.errors.name}
            isInValid={this.state.errors.name !== undefined && this.state.errors.name !== ""}
            onChange={e => this.handleOnChange(e)}
          />

          <Input
            id="email-input"
            type="email"
            class="input input-email"
            placeholder="Email address"
            value={this.state.email}
            error={this.state.errors.email}
            isInValid={this.state.errors.email !== undefined && this.state.errors.email !== ""}
            onChange={e => this.handleOnChange(e)}
          />

          <Input
            id="password-input"
            type="password"
            class="input input-password"
            placeholder="Password"
            value={this.state.password}
            error={this.state.errors.password}
            isInValid={this.state.errors.password !== undefined && this.state.errors.password !== ""}
            onChange={e => this.handleOnChange(e)}
          />

          <Input
            id="password2-input"
            type="password"
            class="input input-password"
            placeholder="Confirm Password"
            value={this.state.password2}
            error={this.state.errors.password2}
            isInValid={this.state.errors.password2 !== undefined && this.state.errors.password2 !== ""}
            onChange={e => this.handleOnChange(e)}
          />

          <button className="submit-button" type="submit">Register</button>
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
