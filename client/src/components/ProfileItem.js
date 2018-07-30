import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-item-container">
        {profile.handle}
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;