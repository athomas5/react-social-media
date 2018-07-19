import React from 'react';

const Input = props => {
  return (
    <div className='input-container'>
      <input
        id={props.id}
        type={props.type}
        className={props.class + (props.isInValid ? ' isInValid' : '')}
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => props.onChange(e)} 
      />
      {props.error && (<p className='error-msg'>{props.error}</p>)}
    </div>
  )
}

export default  Input;