import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

class Header extends Component {
  onLogoutUser = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authHeader = (
      <section className="component-container header-container">
        <img 
          className="profile-image"
          src={user.avatar} 
          alt="user-avatar" 
          title="Must have Gravatar connected to email" />
        <a href="#" className="nav-link nav-link-logout" onClick={this.onLogoutUser}>Logout</a>
      </section>
    );

    const guestHeader = (
      <section className="component-container header-container">
        <Link to="/login" className="nav-link nav-link-login">Login</Link>
        <Link to="/register" className="nav-link nav-link-register">Register</Link>
      </section>
    );

    return (
      <React.Fragment>
        {isAuthenticated ? authHeader : guestHeader}
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);