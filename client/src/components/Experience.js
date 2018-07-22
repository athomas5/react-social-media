import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Experience extends Component {
  render() {
    const experience = this.props.experience.map(exp => {
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
        <h4>Experience</h4>
        {experience}
      </div>
    )
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default connect(null)(Experience);