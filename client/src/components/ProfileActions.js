import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <section className="profileActions-container">
      <Link to="/edit-profile"><button className="action-button waves-effect waves-light btn grey darken-1">Edit Profile</button></Link>
      <Link to="/add-experience"><button className="action-button waves-effect waves-light btn grey darken-1">Add Experience</button></Link>
      <Link to="/add-education"><button className="action-button waves-effect waves-light btn grey darken-1">Add Education</button></Link>
    </section>
  );
}

export default ProfileActions;