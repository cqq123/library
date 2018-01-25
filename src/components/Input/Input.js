import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 'this is value',
  //   };
  //   this.handleChangeValue = this.handleChangeValue.bind(this);
  // }
  // handleChangeValue(e) {
  //   this.setState({
  //     value: e.target.value,
  //   });
  // }
  handleFocus(e) {
    console.log('onfocus');
  }
  handleBlur() {
    console.log('onBlur');
  }
  render() {
    const { className, value, onChange } = this.props;
    return (
      <input
        className={className}
        value={value}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={onChange}
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
