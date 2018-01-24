import React, { Component } from 'react';
/* eslint-disable */
import Subpage from 'components/Subpage';
/* eslint-enable */

class Bus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleOpen() {
    this.setState({
      open: true,
    });
  }
  render() {
    return (
      <div>
        <span onClick={this.handleOpen}>Bus</span>
        <Subpage
          isOpen={this.state.open}
          changeOpen={() => { this.setState({ open: false }); }}
        >
          this is bus subpage
        </Subpage>
      </div>
    );
  }
}

export default Bus;
