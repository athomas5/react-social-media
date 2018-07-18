import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  getNoProfileMessage() {
    const { user } = this.props.auth;

    return (
      <div className="text-container">
        <h2 className="welcome-message">Welcome {user.name}</h2>
        <p className="description">You haven't setup your profile yet</p>
        <Link to="/create-profile" className="create-profile">Create Profile</Link>
      </div>
    );
  }

  getDashboardContent() {
    const { profile, loading } = this.props.profile;

    if (profile === null || loading) {
      return <h4>Loading...</h4>;
    } else {
      if (Object.keys(profile).length > 0) {
        return <h4>TODO: Display Profile</h4>
      } else {
        return this.getNoProfileMessage();
      }
    }
  }

  render() {
    return (
      <section className="dashboard-container">
        <h1 className="title">Dashboard</h1>
        {this.getDashboardContent()}
      </section>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);