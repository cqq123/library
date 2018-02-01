import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as d3 from 'd3';

class LineChart extends Component {
  static displayName = 'Line';
  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps) {
    const {
      x,
      y,
      data,
    } = this.props;
    if (!_.isEqual(prevProps.x.domain(), x.domain()) ||
      !_.isEqual(prevProps.x.range(), x.range()) ||
      !_.isEqual(prevProps.y.domain(), y.domain()) ||
      !_.isEqual(prevProps.y.range(), y.range()) ||
      !_.isEqual(prevProps.data, data)) {
      this.renderLine();
    }
  }
  init() {
    this.line = d3.select(this.lineChart)
      .append('path');
    this.renderLine();
  }
  renderLine() {
    const { data, x, y } = this.props;
    const valueLine = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveNatural);
    this.line
      .attr('d', valueLine(data));
    const totalLength = this.line.node().getTotalLength();
    this.line
      .attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);
  }
  render() {
    const { className } = this.props;
    return (
      <g
        className={className}
        ref={(a) => { this.lineChart = a; }}
        transform={`translate(${this.props.x.bandwidth() / 2}, 0)`}
      />
    );
  }
}

LineChart.propTypes = {
  className: PropTypes.string,
  axis: PropTypes.string,
  dataKey: PropTypes.string,
  x: PropTypes.func,
  y: PropTypes.func,
  data: PropTypes.array,
};

export default LineChart;
