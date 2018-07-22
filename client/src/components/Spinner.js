import React from 'react';
import spinner from '../img/spinner.gif';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img
        className="spinner-gif"
        src={spinner}
        alt="Loading"
      />
    </div>
  )
}

export default Spinner;