import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../actions/profileActions';

import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  getNoProfileMessage() {
    const { user } = this.props.auth;

    return (
      <div className="text-container">
        <h2 className="welcome-message">Welcome <span className="user-name">{user.name}</span></h2>
        <p className="description">You haven't setup your profile yet</p>
        <Link to="/create-profile" className="create-profile">Create Profile</Link>
      </div>
    );
  }

  getDashboardContent() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;

    if (profile === null || loading) {
      return <h4>Loading...</h4>;
    } else {
      if (Object.keys(profile).length > 0) {
        return (
          <React.Fragment>
            <h2 className="welcome-message">Welcome <Link to={`/profile/${profile.handle}`}><span className="user-name">{user.name}</span></Link></h2>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <ProfileActions />
            <button className="delete-account" onClick={this.onDeleteAccound}>Delete Account</button>
          </React.Fragment>
        );
      } else {
        return this.getNoProfileMessage();
      }
    }
  }

  onDeleteAccound = () => {
    this.props.deleteAccount();
  }

  render() {
    return (
      <section className="dashboard-container component-container">
        <h1 className="title">Dashboard</h1>
        {this.getDashboardContent()}
        {/* TODO: exp and edu */}
      </section>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);