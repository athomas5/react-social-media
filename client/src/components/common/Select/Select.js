import React from 'react';
import PropTypes from 'prop-types';

const Select = props => {

  const getOptions = options => {
    return options.map(option => (
      <option value={option.text.toLowerCase()} key={option.key}>{option.text}</option>
    ));
  }

  return (
    <div className='select-container'>
      <select 
        id={props.id}
        type={props.type}
        className={props.class + (props.isInValid ? ' isInValid' : '')}
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => props.onChange(e)} 
      >
        {getOptions(props.options)}
      </select>
      {props.error && (<p className='error-msg'>{props.error}</p>)}
    </div>
  );
}

Select.defaultProps = {
  isValid: true,
  error: ''
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default Select;