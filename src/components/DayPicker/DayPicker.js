import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-day-picker';
import ClickOutside from 'react-click-outside';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import style from './dayPicker.scss';
import {
  format,
} from './../../constants';

class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: undefined,
      showDayPicker: false,
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedDay !== prevState.selectedDay) {
      this.props.onChange(moment(this.state.selectedDay).format(format));
    }
  }
  handleClickOutside() {
    if (this.state.showDayPicker) {
      this.setState({
        showDayPicker: false,
      });
    }
  }
  handleDayClick(day, { selected, disabled }) {
    if (!disabled && !selected) {
      this.setState({ selectedDay: day, showDayPicker: false });
    }
  }
  render() {
    const { value } = this.props;
    return (
      <div className={style.main}>
        <input
          value={value}
          className={style.input}
          onFocus={() => { this.setState({ showDayPicker: true }); }}
          readOnly
        />
        {
          this.state.showDayPicker &&
          <div className={style.dayPicker}>
            <Picker
              locale="zh-cn"
              localeUtils={MomentLocaleUtils}
              selectedDays={this.state.selectedDay}
              onDayClick={this.handleDayClick}
              disabledDays={[
                {
                  after: new Date(),
                },
              ]}
            />
          </div>
        }

      </div>
    );
  }
}

DayPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default ClickOutside(DayPicker);
