import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Education extends Component {
  render() {
    const education = this.props.education.map(exp => {
      return (
        <div key={exp._id}>
          <p>{exp.company}</p>
          <p>{exp.title}</p>
          <p>{exp.from} - {exp.to}</p>
          <button>Delete</button>
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