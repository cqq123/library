import React, { Component } from 'react';
/* eslint-disable */
import Subpage from 'components/Subpage';
/* eslint-enable */
import OperateIndexSubpage from './components/OperateIndexSubpage';
import OperateSubpage from './components/OperateSubpage';
import ResourceSubpage from './components/ResourceSubpage';

class Taxi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: -1,
    };
    this.handleOpen = this.handleOpen.bind(this);
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
      </div>
    );
  }
}

export default Taxi;
