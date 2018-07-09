import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/authActions';

import Input from '../Input/Input';

class Login extends Component {
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

    this.props.loginUser(user, this.props.history);
  }

  render() {
    return (
      <section className="login-container">
        <h1 className="header-title">Login</h1>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));