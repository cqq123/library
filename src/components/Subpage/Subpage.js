import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clickOutside from 'react-click-outside';
import cn from 'classnames';
import style from './subpage.scss';
import DatePicker from '../DatePicker';

class Subpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateType: 0,
      dateRange: null,
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.page !== -1 && this.props.page !== prevProps.page) {
      this.datePicker.init();
    }
  }
  get isShow() {
    const { page } = this.props;
    return page !== -1;
  }
  handleChangeDate(type, dateRange) {
    this.setState({
      dateType: type,
      dateRange,
    });
  }
  handleClickOutside() {
    const { page } = this.props;
    if (page !== -1) {
      this.props.onClose();
    }
  }
  handleChangePage(idx) {
    this.props.onChangePage(idx);
  }
  renderHeader() {
    const { children, onClose, page } = this.props;
    return (
      <div>
        <div
          className={style.subpageName}
          onClick={onClose}
        >
          {this.props.name}
        </div>
        <div className={style.header}>
          <div className={style.headerTitle}>
            {
              React.Children.toArray(children).map((child, index) => (
                <div
                  key={child.props.name}
                  className={cn(style.name, {
                    [style.pageActive]: index === page,
                  })}
                  onClick={() => this.handleChangePage(index)}
                >
                  {child.props.name}
                </div>
              ))
            }
          </div>
          <DatePicker
            onChangeDaterange={this.handleChangeDate}
            ref={(a) => (this.datePicker = a)}
          />
        </div>
      </div>
    );
  }
  render() {
    const { children, page } = this.props;
    const { dateRange, dateType } = this.state;
    return (
      <div className={cn(style.main, {
        [style.open]: this.isShow,
      })}
      >
        { this.isShow && this.renderHeader() }
        { this.isShow &&
          React.cloneElement(
            React.Children.toArray(children)[page],
            {
              dateType,
              dateRange,
            },
          )
        }
      </div>
    );
  }
}
Subpage.propTypes = {
  page: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  name: PropTypes.string,
};
export default clickOutside(Subpage);
