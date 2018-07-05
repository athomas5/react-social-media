import React, { Component } from 'react';

import './Input.css';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  onChange(e) {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  render() {
    return (
      <input
        id={this.props.id}
        type={this.props.type}
        className={this.props.class}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={e => this.onChange(e)}
      />
    )
  }
}
