import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './chartToolTips.scss';

class ChartToolTips extends Component {
  static displayName = 'ToolTips';
  init() {

  }
  render() {
    const {
      className, index, data, dataKeys, style: _style,
    } = this.props;
    return (
      <div style={_style} className={cn(style.main, className)}>
        <span>{data[index].label}</span>
        {
          dataKeys.map(a => (
            <div key={a}>
              <span>{a}:</span>
              <span>{data[index][a]}</span>
            </div>
          ))
        }
      </div>
    );
  }
}
ChartToolTips.propTypes = {
  index: PropTypes.number,
  dataKeys: PropTypes.array,
  data: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
};
export default ChartToolTips;
