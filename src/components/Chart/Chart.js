import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import cn from 'classnames';
import _ from 'lodash';
import style from './chart.scss';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      toolTipIndex: -1,
    };
    this.renderChildren = this.renderChildren.bind(this);
  }
  componentDidMount() {
    this.init();
    window.addEventListener('resize', () => {
      this.init();
    });
  }

  get margin() {
    const { margin = {} } = this.props;
    return {
      top: 20,
      right: 50,
      bottom: 40,
      left: 90,
      ...margin,
    };
  }
  get axisRight() {
    const { children } = this.props;
    const isAxisRight = !_.isEmpty(React.Children.toArray(children).find(child => child.type.displayName === 'AxisRight'));
    return isAxisRight;
  }
  get svgHeight() {
    const { height } = this.props;
    return height - this.margin.bottom - this.margin.top;
  }
  get svgWidth() {
    const { width } = this.props;
    if (width) {
      return width - this.margin.left - this.margin.right;
    }
    const _width = this.chart.clientWidth;
    return _width - this.margin.left - this.margin.right;
  }
  get max() {
    const { children, data, dataKeys } = this.props;
    let maxValue = null;
    const axisLeft = React.Children.toArray(children).find(child => child.type.displayName === 'AxisLeft');
    if (axisLeft && axisLeft.props.max) {
      maxValue = axisLeft.props.max;
    } else {
      maxValue = d3.max(dataKeys.map(a => d3.max(data.map(b => b[a]))));
    }
    return maxValue;
  }
  get x() {
    const { data } = this.props;
    return d3.scaleBand()
      .range([0, this.svgWidth])
      .domain(d3.range(0, data.length));
  }
  init() {
    this.setState({
      show: true,
    });
    const { height } = this.props;
    const width = this.chart.clientWidth;
    d3.select('svg')
      .attr('width', 0);
    this.svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height)
      .select('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  handleMouseEnter(index) {
    this.setState({
      toolTipIndex: index,
    });
    this.svg.append('g')
      .attr('class', 'tipLine')
      .attr('transform', `translate(${this.x.bandwidth() / 2}, 0)`)
      .append('line')
      .attr('x1', this.x(index))
      .attr('y1', this.svgHeight)
      .attr('x2', this.x(index))
      .attr('y2', 0)
      .attr('stroke', '#fff');
  }
  handleMouseLeave() {
    this.setState({
      toolTipIndex: -1,
    });
    this.svg.select('.tipLine').remove();
  }

  renderToolTip() {
    const { children, data } = this.props;
    const ToolTips = React.Children.toArray(children).find(a => a.type.displayName === 'ToolTips');
    return React.cloneElement(ToolTips, {
      data,
      index: this.state.toolTipIndex,
      dataKeys: this.props.dataKeys,
      style: {
        left: this.x(this.state.toolTipIndex) + this.margin.left,
        top: 0,
      },
    });
  }

  renderChildren() {
    console.log('renderChildren');
    const { children, data } = this.props;
    return React.Children.map(children, (child) => {
      const y = d3.scaleLinear()
        .range([this.svgHeight, 0])
        .domain([0, this.max]);
      if (child.type.displayName === 'AxisBottom') {
        const format = d => data.map(a => a.label)[d];
        return React.cloneElement(child, {
          x: this.x,
          format,
          svgHeight: this.svgHeight,
        });
      }
      if (child.type.displayName === 'Line') {
        const { dataKey, axis } = child.props;
        if (this.axisRight) {
          y.domain([0, d3.max(data.map(a => a[axis]))]);
        }
        return React.cloneElement(child, {
          x: this.x,
          y,
          data: data.map(a => a[dataKey]),
        });
      }
      if (child.type.displayName === 'Circle') {
        const { dataKey } = child.props;
        return React.cloneElement(child, {
          x: this.x,
          y,
          data: data.map(a => a[dataKey]),
        });
      }
      if (child.type.displayName === 'AxisLeft') {
        const { dataKey } = child.props;
        if (this.axisRight) {
          y.domain([0, d3.max(data.map(a => a[dataKey]))]);
        }
        return React.cloneElement(child, {
          y,
        });
      }
      if (child.type.displayName === 'AxisRight') {
        const { dataKey } = child.props;
        if (dataKey) {
          y.domain([0, d3.max(data.map(a => a[dataKey]))]);
        }
        return React.cloneElement(child, {
          y,
          svgWidth: this.svgWidth,
        });
      }
    });
  }
  renderTips() {
    this.tips = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    this.tipsContent = d3.select(this.chart)
      .append('div');
  }

  render() {
    const { style: _style = {}, className, toolTips, data } = this.props;
    console.log('render');
    return (
      <div
        style={_style}
        className={cn(className, style.main)}
        ref={(a) => { this.chart = a; }}
      >
        <svg>
          <g>
            {this.state.show && this.renderChildren()}
            {
              toolTips &&
              <g className={style.toolRect}>
                { this.state.show && toolTips && data.map((a, i) => (
                  <rect
                    key={i}
                    x={this.x(i)}
                    y={0}
                    width={this.x.bandwidth()}
                    height={this.svgHeight}
                    onMouseEnter={() => { this.handleMouseEnter(i); }}
                    onMouseLeave={() => { this.handleMouseLeave(); }}
                  />
                ))}
              </g>
            }
          </g>
        </svg>
        {
          this.state.show && this.state.toolTipIndex > -1 && toolTips && this.renderToolTip()
        }
      </div>
    );
  }
}

Chart.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  margin: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
  data: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  toolTips: PropTypes.bool,
};

export default Chart;
