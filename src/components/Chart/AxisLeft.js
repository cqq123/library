import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as d3 from 'd3';

class AxisLeft extends Component {
  static displayName = 'AxisLeft';
  componentDidMount() {
    this.renderLeft();
  }
  componentDidUpdate(prevProps) {
    const { y } = this.props;
    if (!_.isEqual(prevProps.y.range(), y.range()) ||
        !_.isEqual(prevProps.y.domain(), y.domain())
    ) {
      this.renderLeft();
    }
  }
  renderLeft() {
    const { y, max } = this.props;
    if (max) {
      y.domain([0, max]);
    }
    const axisY = d3.axisLeft(y);
    d3.select(this.axisLeft)
      .call(axisY);
  }
  render() {
    const { className } = this.props;
    return (
      <g className={className} ref={(a) => { this.axisLeft = a; }} />
    );
  }
}

AxisLeft.propTypes = {
  y: PropTypes.func,
  max: PropTypes.number,
  className: PropTypes.string,
};

export default AxisLeft;
