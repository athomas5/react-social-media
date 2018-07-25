import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../actions/profileActions';

import Input from './common/Input';
import Textarea from './common/Textarea';

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }
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

    const experience = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }

    this.props.addExperience(experience, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <section className="add-experience-container component-container">
        <Link to="/dashboard"><button className="waves-effect waves-light btn grey darken-1">Go Back</button></Link>
        <div className="header">
          <h1>Add Experience</h1>
          <p>Add any job position that you have had</p>
        </div>

        <form
          action='POST'
          className='add-experience-form'
          onSubmit={this.onSubmit} >
          <Input
            id='company-input'
            type='company'
            class='input input-company'
            placeholder='* Company'
            value={this.state.company}
            error={errors.company}
            isInValid={errors.company !== undefined && errors.company !== ''}
            onChange={this.handleOnChange}
          />

          <Input
            id='title-input'
            type='title'
            class='input input-title'
            placeholder='* Job title'
            value={this.state.title}
            error={errors.title}
            isInValid={errors.title !== undefined && errors.title !== ''}
            onChange={this.handleOnChange}
          />

          <Input
            id='location-input'
            type='location'
            class='input input-location'
            placeholder='Location'
            value={this.state.location}
            error={errors.location}
            isInValid={errors.location !== undefined && errors.location !== ''}
            onChange={this.handleOnChange}
          />

           <Input
            id='from-input'
            type='from'
            class='input input-from'
            placeholder='* From date'
            value={this.state.from}
            error={errors.from}
            isInValid={errors.from !== undefined && errors.from !== ''}
            onChange={this.handleOnChange}
          />

           <Input
            id='to-input'
            type='to'
            class='input input-to'
            placeholder='To date'
            value={this.state.to}
            error={errors.to}
            isInValid={errors.to !== undefined && errors.to !== ''}
            onChange={this.handleOnChange}
          />

          <Textarea
            id='description-input'
            type='textarea'
            class='textarea textarea-description'
            placeholder='Job Description'
            value={this.state.description}
            error={errors.description}
            onChange={e => this.handleOnChange(e)}
            isInValid={errors.description !== undefined && errors.description !== ''}
          />

          <button className='submit-button' type='submit'>Submit</button>
        </form>
      </section>
    )
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));