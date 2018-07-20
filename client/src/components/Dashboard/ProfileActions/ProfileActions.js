import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <section className="profileActions-container">
      <Link to="/edit-profile"><button className="profileAction-button">Edit Profile</button></Link>
      <Link to="/add-experience"><button className="profileAction-button">Add Experience</button></Link>
      <Link to="/add-education"><button className="profileAction-button">Add Education</button></Link>
    </section>
  );
}

export default ProfileActions;