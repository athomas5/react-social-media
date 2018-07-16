import React, { Component } from 'react';

const Input = (props) => {
  return (
    <input
      id={props.id}
      type={props.type}
      className={props.class + (props.isInValid ? ' isInValid' : '')}
      placeholder={props.placeholder}
      value={props.value}
      onChange={e => props.onChange(e)}
    />
  )
}

export default  Input;