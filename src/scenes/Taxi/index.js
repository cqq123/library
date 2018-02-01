import React, { Component } from 'react';
/* eslint-disable */
import Subpage from 'components/Subpage';
import Chart, { AxisBottom, AxisLeft, LineChart, AxisRight, Circle } from 'components/Chart';
/* eslint-enable */
import OperateIndexSubpage from './components/OperateIndexSubpage';
import OperateSubpage from './components/OperateSubpage';
import ResourceSubpage from './components/ResourceSubpage';
import ChartToolTips from './components/ChartToolTips';
import style from './taxi.scss';


class Taxi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: -1,
    };
    this.handleOpen = this.handleOpen.bind(this);
  }
  componentDidUpdate() {
    console.log('xixixi');
  }
  handleOpen(page) {
    this.setState({
      page,
    });
  }
  render() {
    return (
      <div>
        <span onClick={() => this.handleOpen(0)}>Taxi_page0</span>
        <span onClick={() => this.handleOpen(1)}>Taxi_page1</span>
        <span onClick={() => this.handleOpen(2)}>Taxi_page2</span>
        <Subpage
          name="出租车"
          page={this.state.page}
          onClose={() => { this.setState({ page: -1 }); }}
          onChangePage={(idx) => { this.setState({ page: idx }); }}
        >
          <OperateSubpage
            name="营运"
          />
          <OperateIndexSubpage
            name="营运指标"
          />
          <ResourceSubpage
            name="资源指标"
          />
        </Subpage>
        <div className={style.chart}>
          <div className={style.test1} />
          <Chart
            className={style.test2}
            height={200}
            data={[
              { label: '0-10', value: 23, rate: 12, speed: 30 },
              { label: '10-20', value: 33, rate: 23, speed: 50 },
              { label: '20-30', value: 54, rate: 74, speed: 23 },
              { label: '30-40', value: 12, rate: 23, speed: 41 },
              { label: '40-50', value: 76, rate: 23, speed: 21 },
            ]}
            dataKeys={['value', 'rate', 'speed']}
            toolTips
            margin={{
              left: 100,
              right: 100,
              top: 50,
              bottom: 50,
            }}
          >
            <AxisBottom
              className={style.axisBottom}
            />
            <LineChart
              className={style.lineChartValue}
              dataKey="value"
              axis="value"
            />
            <Circle
              dataKey="value"
              className={style.circleValue}
              radius={3}
            />
            <LineChart
              className={style.lineChartRate}
              dataKey="rate"
              axis="value"
            />
            <Circle
              dataKey="rate"
              radius={3}
            />
            <LineChart
              className={style.lineChartSpeed}
              dataKey="speed"
              axis="speed"
            />
            <ChartToolTips />
            <AxisLeft
              dataKey="value"
              className={style.axisLeft}
            />
            <AxisRight
              dataKey="speed"
              className={style.axisRight}
            />
          </Chart>
        </div>

      </div>
    );
  }
}

export default Taxi;
