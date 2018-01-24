import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';
import style from './datePicker.scss';
import {
  DATE_TYPE_DAY,
  DATE_TYPE_WEEK,
  DATE_TYPE_MONTH,
  DATE_TYPE_YEAR,
  DATE_TYPE_CUSTOM,
  format,
} from './../../constants';
/* eslint-disable */
import { momentFormat } from 'utils';
/* eslint-enable */
import DayPicker from '../DayPicker';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateType: DATE_TYPE_DAY,
      dateRange: {
        begin: momentFormat(moment(), format),
        end: momentFormat(moment(), format),
      },
    };
  }
  componentDidMount() {
    this.props.onChangeDaterange(this.state.dateType, this.state.dateRange);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.dateType !== this.state.dateType) {
      this.props.onChangeDaterange(this.state.dateType, this.state.dateRange);
    }
  }

  getDateRange(type) {
    if (type === DATE_TYPE_WEEK) {
      return {
        begin: momentFormat(moment().day('Monday'), format),
        end: momentFormat(moment(), format),
      };
    }
    if (type === DATE_TYPE_MONTH) {
      return {
        begin: momentFormat(moment().date(1), format),
        end: momentFormat(moment(), format),
      };
    }
    if (type === DATE_TYPE_YEAR) {
      return {
        begin: momentFormat(moment().dayOfYear(1), format),
        end: momentFormat(moment(), format),
      };
    }
    if (type === DATE_TYPE_CUSTOM) {
      return {
        begin: momentFormat(moment(), 'YYYY-MM-DD'),
        end: momentFormat(moment(), 'YYYY-MM-DD'),
      };
    }
    return {
      begin: momentFormat(moment(), format),
      end: momentFormat(moment(), format),
    };
  }
  init() {
    this.setState({
      dateType: DATE_TYPE_DAY,
      dateRange: {
        begin: momentFormat(moment(), format),
        end: momentFormat(moment(), format),
      },
    });
  }
  handleChangeDate(type) {
    this.setState({
      dateType: type,
      dateRange: this.getDateRange(type),
    });
  }
  render() {
    const { dateType } = this.state;
    return (
      <div>
        {
          dateType === DATE_TYPE_CUSTOM && (
            <div className={style.dayPicker}>
              <DayPicker />
            </div>
          )
        }
        <span
          className={cn(style.tab, style.customTab, {
            [style.active]: dateType === DATE_TYPE_CUSTOM,
          })}
          onClick={() => this.handleChangeDate(DATE_TYPE_CUSTOM)}
        >
          自定义
        </span>
        <div className={style.main}>
          <span
            className={cn(style.tab, {
              [style.active]: dateType === DATE_TYPE_DAY,
            })}
            onClick={() => this.handleChangeDate(DATE_TYPE_DAY)}
          >
            日
          </span>
          <span
            className={cn(style.tab, {
              [style.active]: dateType === DATE_TYPE_WEEK,
            })}
            onClick={() => this.handleChangeDate(DATE_TYPE_WEEK)}
          >
            周
          </span>
          <span
            className={cn(style.tab, {
              [style.active]: dateType === DATE_TYPE_MONTH,
            })}
            onClick={() => this.handleChangeDate(DATE_TYPE_MONTH)}
          >
            月
          </span>
          <span
            className={cn(style.tab, {
              [style.active]: dateType === DATE_TYPE_YEAR,
            })}
            onClick={() => this.handleChangeDate(DATE_TYPE_YEAR)}
          >
            年
          </span>

        </div>
      </div>
    );
  }
}
DatePicker.propTypes = {
  onChangeDaterange: PropTypes.func.isRequired,
};
export default DatePicker;
