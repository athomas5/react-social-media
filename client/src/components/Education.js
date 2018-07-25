import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../actions/profileActions';

class Education extends Component {
  deleteEducation(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => {
      return (
        <div key={edu._id}>
          <p>{edu.school}</p>
          <p>{edu.degree + ' ' + edu.fieldOfStudy}</p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? ' Present' : <Moment format="YYYY/MM/DD">{' ' + edu.to}</Moment>}
          <p>{edu.description}</p>
          <button onClick={this.deleteEducation.bind(this, edu._id)} className="delete-account waves-effect waves-light btn red">
            Delete
          </button>
        </div>
      );
    });

    return (
      <div>
        <h4>Education</h4>
        {education}
      </div>
    )
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);