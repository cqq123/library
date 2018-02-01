import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import style from './chart.scss';

class Tooltips extends Component {
  static displayName = 'ToolTips';
  handleMouseEnter(index) {
    const {
      x, tips, svgHeight, type,
      tipsContent, margin, data,
    } = this.props;
    tips.attr('display', 'block');
    tips.selectAll('text').remove();
    tips.selectAll('line').remove();
    tips.selectAll('rect').remove();
    tipsContent.selectAll('div').remove();
    if (type === 'line' || !type) {
      console.log('line');
      tips.append('line')
        .transition()
        .duration(500)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', svgHeight);
    }
    if (type === 'rect') {
      tips.append('rect')
        .attr('class', style.tipsRect)
        .attr('x', -x.bandwidth() * 0.1)
        .attr('y', 0)
        .attr('width', x.bandwidth() * 0.2)
        .attr('height', svgHeight);
    }
    const tipsLabelArray = Object.keys(data[index]);
    tips.attr('transform', `translate(${x(index) + x.bandwidth() / 2}, 0)`);
    tipsContent
      .attr('class', style.toolTipContent)
      .style('display', 'block')
      .style('position', 'absolute')
      .style('left', 0)
      .style('top', `${margin.top}px`)
      .style('transform', `translate(${x(index) + x.bandwidth() / 2}px, 0)`);
    tipsContent
      .selectAll('div')
      .data(tipsLabelArray)
      .enter()
      .append('div')
      .html(d => `${d}: ${data[index][d]}`);
  }
  handleMouseLeave() {
    const { tips, tipsContent } = this.props;
    tips.attr('display', 'none');
    tipsContent.style('display', 'none');
  }

  render() {
    const {
      data, x, svgHeight,
    } = this.props;
    console.log('renderToolTip');
    return (
      <g
        className={style.toolTipRect}
        transform="translate(0, 0)"
      >
        {
          data.map((a, i) => (
            <rect
              key={i}
              x={x(i)}
              y={0}
              width={x.bandwidth()}
              height={svgHeight}
              onMouseEnter={() => { this.handleMouseEnter(i); }}
              onMouseLeave={() => { this.handleMouseLeave(); }}
            />
          ))
        }
      </g>
    );
  }
}

Tooltips.propTypes = {
  data: PropTypes.array,
  x: PropTypes.func,
  svgHeight: PropTypes.number,
  tips: PropTypes.any,
  tipsContent: PropTypes.any,
  type: PropTypes.oneOf(['line', 'rect']),
  margin: PropTypes.object,
};

export default Tooltips;
