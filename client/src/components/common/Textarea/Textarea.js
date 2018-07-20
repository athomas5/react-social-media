import React from 'react';

const Textarea = props => {
  return (
    <div className='textarea-container'>
      <textarea 
        rows='4'
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

export default Textarea;