import React from 'react';
import spinner from './spinner.gif';

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