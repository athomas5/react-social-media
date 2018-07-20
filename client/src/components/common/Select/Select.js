import React from 'react';

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

export default Select;