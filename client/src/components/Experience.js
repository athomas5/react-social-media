import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../actions/profileActions';

class Experience extends Component {
  deleteExperience(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => {
      return (
        <div key={exp._id}>
          <p>{exp.company}</p>
          <p>{exp.title}</p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? ' Present' : <Moment format="YYYY/MM/DD">{' ' + exp.to}</Moment>}
          <p>{exp.description}</p>
          <button onClick={this.deleteExperience.bind(this, exp._id)}>Delete</button>
        </div>
      );
    });

    return (
      <div>
        <h4>Experience</h4>
        {experience}
      </div>
    )
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);