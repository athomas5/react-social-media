import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProfiles } from '../actions/profileActions';
import { PropTypes } from 'prop-types';

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
        profileItems = <h1>Profiles Here</h1>;
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles-container component-container">
        <h1>Developer Profiles</h1>
        <p>Browse and connect with developers</p>
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
