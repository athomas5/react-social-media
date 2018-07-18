import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/authActions';

import Input from '../../common/Input/Input';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPassword: '',
      errors: { email: '', password: '' }
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleOnChange = e => {
    if (e.target.id === 'email-input') {
      this.setState({ userEmail: e.target.value });
    }
    
    if (e.target.id === 'password-input') {
      this.setState({ userPassword: e.target.value });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.userEmail,
      password: this.state.userPassword
    }

    this.props.loginUser(user, this.props.history);
  }

  render() {
    return (
      <section className='login-container'>
        <h1 className='header-title'>Login</h1>
        <form
          action='POST'
          className='login-form'
          onSubmit={this.onSubmit}
        >
          <div className='input-container'>
            <Input
              id='email-input'
              type='email'
              class='input input-email'
              placeholder='Email address'
              value={this.state.userEmail}
              isInValid={ this.state.errors.email !== undefined && this.state.errors.email !== ''}
              onChange={this.handleOnChange}
            />

            {this.state.errors.email && (
              <p className='error-msg'>{this.state.errors.email}</p>
            )}
          </div>

          <div className='input-container'>
            <Input
              id='password-input'
              type='password'
              class='input input-password'
              placeholder='Password'
              value={this.state.userPassword}
              isInValid={this.state.errors.password !== undefined && this.state.errors.password !== ''}
              onChange={this.handleOnChange}
            />

            {this.state.errors.password && (
              <p className='error-msg'>{this.state.errors.password}</p>
            )}
          </div>

          <button className='button-login-register' type='submit'>
            Login
          </button>
          <p className='forgot-password'>Forgot your password?</p>
        </form>
      </section>
    );
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