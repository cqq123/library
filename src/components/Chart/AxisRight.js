import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import _ from 'lodash';

class AxisRight extends Component {
  static displayName = 'AxisRight';
  componentDidMount() {
    this.renderRight();
  }
  componentDidUpdate(prevProps) {
    const { y } = this.props;
    if (!_.isEqual(prevProps.y.range(), y.range()) ||
        !_.isEqual(prevProps.y.domain(), y.domain())
    ) {
      this.renderRight();
    }
  }
  renderRight() {
    const { y, max } = this.props;
    if (max) {
      y.domain([0, max]);
    }

    const axisY = d3.axisRight(y);
    d3.select(this.axisRight)
      .call(axisY);
  }

  render() {
    const { svgWidth, className } = this.props;
    return (
      <g
        className={className}
        ref={(a) => { this.axisRight = a; }}
        transform={`translate(${svgWidth}, 0)`}
      />
    );
  }
}

AxisRight.propTypes = {
  y: PropTypes.func,
  max: PropTypes.number,
  svgWidth: PropTypes.number,
  className: PropTypes.string,
};

export default AxisRight;
