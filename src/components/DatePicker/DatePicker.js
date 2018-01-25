import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';
import _ from 'lodash';
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
import Checkbox from '../Checkbox';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateType: DATE_TYPE_DAY,
      begin: momentFormat(moment(), format),
      end: momentFormat(moment(), format),
    };
    this.handleChangeOnToggleCosutom = this.handleChangeOnToggleCosutom.bind(this);
  }
  componentDidMount() {
    this.props.onChangeDaterange(this.state.dateType, {
      begin: this.state.begin,
      end: this.state.end,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.dateType !== this.state.dateType || !_.isEqual(this.state.begin, prevState.begin) || !_.isEqual(this.state.end, prevState.end) ) {
      this.props.onChangeDaterange(this.state.dateType, {
        begin: this.state.begin,
        end: this.state.end,
      });
    }
  }
  get isCustom() {
    return this.state.dateType === DATE_TYPE_CUSTOM;
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
      begin: momentFormat(moment(), format),
      end: momentFormat(moment(), format),
    });
  }
  handleChangeDate(type) {
    this.setState({
      dateType: type,
      begin: this.getDateRange(type).begin,
      end: this.getDateRange(type).end,
    });
  }
  handleChangeCustomBegin() {
    this.setState({
    });
  }
  handleChangeOnToggleCosutom() {
    if (this.isCustom) {
      this.setState({ dateType: -1 });
    } else {
      this.setState({ dateType: DATE_TYPE_CUSTOM });
    }
  }
  render() {
    const { dateType } = this.state;
    return (
      <div className={style.content}>
        {
          this.isCustom ? (
            <div className={style.dayPicker}>
              <DayPicker
                value={this.state.begin}
                onChange={a => this.setState({ begin: a })}
              />
              <span className={style.split}>--</span>
              <DayPicker
                value={this.state.end}
                onChange={a => this.setState({ end: a })}
              />
            </div>
          ) : (
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
          )
        }
        <Checkbox
          className={style.customTab}
          label="自定义"
          checked={this.isCustom}
          onChange={this.handleChangeOnToggleCosutom}
        />
      </div>
    );
  }
}
DatePicker.propTypes = {
  onChangeDaterange: PropTypes.func.isRequired,
};
export default DatePicker;
