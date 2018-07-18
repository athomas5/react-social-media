import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../common/Input/Input';

class CreateProfile extends Component{
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubUsername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }

  handleOnChange = e => {
    if (e.target.id === 'email-input') {
      this.setState({ userEmail: e.target.value });
    }

    if (e.target.id === 'password-input') {
      this.setState({ userPassword: e.target.value });
    }
  }

  render() {
    return (
      <section className="create-profile-container">
        <h1 className="header-title">Create Your Profile</h1>
        <p className="kicker">Let's get some information to make your profile stand out</p>
        <form
          action='POST'
          className='create-profile-form'
          onSubmit={this.onSubmit}
        >
          <div className='input-container'>
            <Input
              id='handle-input'
              type='text'
              class='input input-handle'
              placeholder='* Profile handle'
              value={this.state.handle}
              isInValid={this.state.errors.handle !== undefined && this.state.errors.handle !== ''}
              onChange={this.handleOnChange}
            />
          </div>

          <div className='input-container'>
            <Input
              id='company-input'
              type='text'
              class='input input-company'
              placeholder='Company'
              value={this.state.company}
              isInValid={this.state.errors.company !== undefined && this.state.errors.company !== ''}
              onChange={e => this.handleOnChange(e)}
            />
          </div>
        </form>
      </section>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, null)(CreateProfile);