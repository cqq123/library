/* eslint jsx-a11y/label-has-for:0 */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './Checkbox.scss';

const Checkbox = ({
  label,
  checked,
  className,
  onChange,
  ...other
}) => (
  <label className={cn(style.main, className)} {...other}>
    <span
      className={cn(style.checkbox, {
        [style.checked]: checked,
      })}
    >
      <input
        className={style.input}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </span>
    <span className={style.label}>{label}</span>
  </label>
);

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
