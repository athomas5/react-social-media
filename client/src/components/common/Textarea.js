import React from 'react';
import PropTypes from 'prop-types';

const Textarea = props => {
  return (
    <div className='textarea-container'>
      <textarea 
        id={props.id}
        type={props.type}
        className={props.class + (props.isInValid ? ' isInValid' : '')}
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => props.onChange(e)} >
      </textarea>
      {props.error && (<p className='error-msg'>{props.error}</p>)}
    </div>
  )
}

Textarea.defaultProps = {
  isValid: true,
  error: ''
};

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default Textarea;