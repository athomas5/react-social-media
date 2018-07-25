import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../actions/profileActions';

import Input from './common/Input';
import Textarea from './common/Textarea';

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: '',
      degree: '',
      fieldOfStudy: '',
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

    const education = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }

    this.props.addEducation(education, this.props.history);
  }

  onCheck = e => {

  }

  render() {
    const { errors } = this.state;

    return (
      <section className="add-education-container component-container">
        <Link to="/dashboard"><button className="waves-effect waves-light btn grey darken-1">Go Back</button></Link>
        <div className="header">
          <h1>Add Education</h1>
          <p>Add any job position that you have had</p>
        </div>

        <form
          action='POST'
          className='add-education-form'
          onSubmit={this.onSubmit} >
          <Input
            id='school-input'
            type='school'
            class='input input-school'
            placeholder='* School'
            value={this.state.school}
            error={errors.school}
            isInValid={errors.school !== undefined && errors.school !== ''}
            onChange={this.handleOnChange}
          />

          <Input
            id='degree-input'
            type='degree'
            class='input input-degree'
            placeholder='* Degree'
            value={this.state.degree}
            error={errors.degree}
            isInValid={errors.degree !== undefined && errors.degree !== ''}
            onChange={this.handleOnChange}
          />

          <Input
            id='fieldOfStudy-input'
            type='fieldOfStudy'
            class='input input-fieldOfStudy'
            placeholder='* Field of study'
            value={this.state.fieldOfStudy}
            error={errors.fieldOfStudy}
            isInValid={errors.fieldOfStudy !== undefined && errors.fieldOfStudy !== ''}
            onChange={this.handleOnChange}
          />

           <Input
            id='from-input'
            type='from'
            class='input input-from'
            placeholder='From date'
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
            placeholder='Description'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));