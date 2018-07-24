import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <section className="landing-container component-container">
        <div className="text-container">
          <h1 className="title">Social Media App</h1>
          <p className="description">
            Create and share your own developer profile with like-minded professionals. Start discussions, share thoughts, and get help!
          </p>
        </div>
      </section>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);