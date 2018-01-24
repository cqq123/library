import React, { Component } from 'react';
import Picker from 'react-day-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';

class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: undefined,
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  handleDayClick(day, { selected, disabled }) {
    if (!disabled && !selected) {
      this.setState({ selectedDay: day });
    }
  }
  render() {
    console.log(moment(this.state.selectedDay).format('YYYY-MM-DD'), '-------------');
    return (
      <div>
        <Picker
          onDayClick={this.handleDayClick}
          selectedDays={this.state.selectedDay}
          localeUtils={MomentLocaleUtils}
          locale="zh-cn"
          disabledDays={[
            {
              after: new Date(),
            },
          ]}
        />
      </div>
    );
  }
}

export default DayPicker;
