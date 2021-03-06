import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../actions/profileActions';

import Input from './common/Input';
import Textarea from './common/Textarea';
import Select from './common/Select';

class CreateProfile extends Component{
  constructor(props) {
    super(props);

    this.state = {
      handle: '',
      status: '',
      company: '',
      website: '',
      location: '',
      skills: '',
      github: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleOnChange = e => {
    const inputType = e.target.id.substring(0, e.target.id.indexOf('-'));
    this.setState({ [inputType]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const profile = {
      handle: this.state.handle,
      status: this.state.status,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      github: this.state.github,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }

    this.props.createProfile(profile, this.props.history);
  }

  render() {
    const statusOptions = [
      {text: '* Select Professional Status', key: 0},
      {text: 'Developer', key: 1},
      {text: 'Junior Developer', key: 2},
      {text: 'Senior Developer', key: 3},
      {text: 'Manager', key: 4},
      {text: 'Student', key: 5},
      {text: 'Instructor/Teacher', key: 6},
      {text: 'Intern', key: 7},
      {text: 'Other', key: 8},
    ];

    return (
      <section className="create-profile-container component-container">
        <h1 className="header-title">Create Your Profile</h1>
        <p className="kicker">Let's get some information to make your profile stand out</p>
        <form
          action='POST'
          className='create-profile-form'
          onSubmit={this.onSubmit} >

          <Input
            id='handle-input'
            type='text'
            class='input input-handle'
            placeholder='* Profile handle'
            value={this.state.handle}
            error={this.state.errors.handle}
            isInValid={this.state.errors.handle !== undefined && this.state.errors.handle !== ''}
            onChange={this.handleOnChange}
          />

          <p className="input-description">A unique handle for your profile URL. Your full name, company name etc (Can't be changed later)</p>

          <Select
            id='status-input'
            type='text'
            class='select select-status'
            placeholder='* Profile status'
            options={statusOptions}
            value={this.state.status}
            error={this.state.errors.status}
            isInValid={this.state.errors.status !== undefined && this.state.errors.status !== ''}
            onChange={this.handleOnChange}
          />

          <Input
            id='company-input'
            type='text'
            class='input input-company'
            placeholder='Company'
            value={this.state.company}
            error={this.state.errors.company}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.company !== undefined && this.state.errors.company !== ''}
          />

          <Input
            id='website-input'
            type='text'
            class='input input-website'
            placeholder='Website'
            value={this.state.website}
            error={this.state.errors.website}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.website !== undefined && this.state.errors.website !== ''}
          />

          <Input
            id='location-input'
            type='text'
            class='input input-location'
            placeholder='Location'
            value={this.state.location}
            error={this.state.errors.location}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.location !== undefined && this.state.errors.location !== ''}
          />

          <Input
            id='skills-input'
            type='text'
            class='input input-skills'
            placeholder='* Skills'
            value={this.state.skills}
            error={this.state.errors.skills}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.skills !== undefined && this.state.errors.skills !== ''}
          />

          <p className="input-description">Please use comma seperated values (eg. HTML, CSS, JavaScript...)</p>

          <Input
            id='github-input'
            type='text'
            class='input input-github'
            placeholder='Github'
            value={this.state.github}
            error={this.state.errors.github}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.github !== undefined && this.state.errors.github !== ''}
          />

          <Input
            id='twitter-input'
            type='text'
            class='input input-twitter'
            placeholder='Twitter'
            value={this.state.twitter}
            error={this.state.errors.twitter}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.twitter !== undefined && this.state.errors.twitter !== ''}
          />

          <Input
            id='facebook-input'
            type='text'
            class='input input-facebook'
            placeholder='Facebook'
            value={this.state.facebook}
            error={this.state.errors.facebook}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.facebook !== undefined && this.state.errors.facebook !== ''}
          />

          <Input
            id='linkedin-input'
            type='text'
            class='input input-linkedin'
            placeholder='LinkedIn'
            value={this.state.linkedin}
            error={this.state.errors.linkedin}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.linkedin !== undefined && this.state.errors.linkedin !== ''}
          />

          <Input
            id='youtube-input'
            type='text'
            class='input input-youtube'
            placeholder='Youtube'
            value={this.state.youtube}
            error={this.state.errors.youtube}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.youtube !== undefined && this.state.errors.youtube !== ''}
          />

          <Input
            id='instagram-input'
            type='text'
            class='input input-instagram'
            placeholder='Instagram'
            value={this.state.instagram}
            error={this.state.errors.instagram}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.instagram !== undefined && this.state.errors.instagram !== ''}
          />

          <Textarea
            id='bio-input'
            type='textarea'
            class='textarea textarea-bio'
            placeholder='Short bio of yourself'
            value={this.state.bio}
            error={this.state.errors.bio}
            onChange={e => this.handleOnChange(e)}
            isInValid={this.state.errors.bio !== undefined && this.state.errors.bio !== ''}
          />

          <p className="required">*required</p>

          <button className='submit-button' type='submit'>Submit</button>
        </form>
      </section>
    )
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));