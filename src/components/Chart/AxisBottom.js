import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import _ from 'lodash';

class AxisBottom extends Component {
  static displayName = 'AxisBottom';
  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps) {
    const { x, format } = this.props;
    if (!_.isEqual(prevProps.x.range(), x.range()) ||
        !_.isEqual(prevProps.x.domain(), x.domain()) ||
        !_.isEqual(prevProps.format, format)
    ) {
      this.init();
    }
  }
  init() {
    const { svgHeight, format } = this.props;
    const axisX = d3.axisBottom(this.props.x);
    if (format) {
      axisX.tickFormat(format);
    }
    d3.select(this.axisBottom)
      .attr('transform', `translate(0, ${svgHeight})`)
      .call(axisX);
  }
  render() {
    const { className } = this.props;
    return (
      <g className={className} ref={(a) => { this.axisBottom = a; }} />
    );
  }
}

AxisBottom.propTypes = {
  x: PropTypes.func,
  svgHeight: PropTypes.number,
  format: PropTypes.func,
  className: PropTypes.string,
};
export default AxisBottom;
