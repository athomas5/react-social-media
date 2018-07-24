import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Education extends Component {
  render() {
    const education = this.props.education.map(edu => {
      return (
        <div key={edu._id}>
          <p>{edu.school}</p>
          <p>{edu.degree + ' ' + edu.fieldOfStudy}</p>
          <p>{edu.from} - {edu.to}</p>
          <p>{edu.description}</p>
          {/* <button>Delete</button> */}
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
  education: PropTypes.array.isRequired
};

export default connect(null)(Education);