import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import style from './sider.scss';

const Sider = ({ isOpen }) => (
  <div className={cn(style.main, {
    [style.open]: isOpen,
  })}
  >
    hahahahha
  </div>
);

Sider.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
export default Sider;
