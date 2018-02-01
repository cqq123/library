import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Circle extends Component {
  static displayName = 'Circle';
  componentDidMount() {
    this.renderLine();
  }
  renderLine() {
    const { data, x, y, radius } = this.props;
    d3.select(this.lineCircle)
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => x(i))
      .attr('cy', d => y(d))
      .attr('r', radius);
  }
  render() {
    const { className } = this.props;
    return (
      <g
        className={className}
        ref={(a) => { this.lineCircle = a; }}
        transform={`translate(${this.props.x.bandwidth() / 2}, 0)`}
      />
    );
  }
}

Circle.propTypes = {
  className: PropTypes.string,
  radius: PropTypes.number.isRequired,
  dataKey: PropTypes.string,
  data: PropTypes.array,
  x: PropTypes.func,
  y: PropTypes.func,
};

export default Circle;
