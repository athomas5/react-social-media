import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProfiles } from '../actions/profileActions';
import { PropTypes } from 'prop-types';

import ProfileItem from './ProfileItem';

class Profiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      // TODO: Show spinner
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />);
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles-container component-container">
        <h1>Developer Profiles</h1>
        <p>Browse and connect with developers</p>
        {profileItems}
      </div>
    )
  }
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
