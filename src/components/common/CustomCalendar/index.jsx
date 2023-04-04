/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';

import {
  isEqual,
  isBefore,
  isAfter,
  subDays,
  addDays,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
  subMonths,
} from 'date-fns';

function dateFormat(date) {
  return typeof date.getMonth === 'function'
    ? date.toLocaleDateString('en-GB')
    : new Date(date).toLocaleDateString('en-GB');
}

class CustomCalendar extends PureComponent {
  staticDateRangeOptions = [
    { label: ' Tomorrow', value: 'tomorrow' },
    { label: ' Yesterday', value: 'yesterday' },
    { label: 'This Week', value: 'thisWeek' },
    { label: ' Last Week', value: 'lastWeek' },
    { label: ' This Month', value: 'thisMonth' },
    { label: 'Last Month', value: 'lastMonth' },
  ];

  constructor(props) {
    super(props);
    const {
      props: { startDate, endDate, selectRange },
    } = this;
    this.state = {
      showCalendar: false,
      date: selectRange
        ? [startDate, endDate || new Date()]
        : startDate || new Date(),
    };
  }

  componentDidUpdate(prevProps) {
    this.updateStateHandler(prevProps);
  }

  updateStateHandler = prevProps => {
    const {
      props: { startDate, endDate },
    } = this;
    if (startDate && endDate) {
      if (JSON.stringify(endDate) !== JSON.stringify(prevProps.endDate)) {
        this.setState({
          date: [startDate, endDate],
          showCalendar: false,
        });
      }
    }

    if (startDate && !endDate) {
      if (JSON.stringify(startDate) !== JSON.stringify(prevProps.startDate)) {
        this.setState({
          date: startDate,
        });
      }
    }
  };

  toggleCalendar = () => {
    this.setState(prevState => ({ showCalendar: !prevState.showCalendar }));
  };

  closeCalendarHandler = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({
        showCalendar: false,
      });
    }
  };

  onChangeHandler = selectedDate => {
    this.setState({ date: selectedDate }, () => {
      const {
        state: { date },
        props: { onChange },
      } = this;
      onChange(date);
      this.toggleCalendar();
    });
  };

  staticDateRangeHandler = range => {
    const {
      props: { minDate, maxDate, onChange },
    } = this;
    const current = new Date();
    let start;
    let end;

    if (range === 'thisWeek') {
      start = startOfWeek(current);
      end = endOfWeek(current);
    }

    if (range === 'lastWeek') {
      const lastWeekDate = subWeeks(current, 1);
      start = startOfWeek(lastWeekDate);
      end = endOfWeek(lastWeekDate);
    }

    if (range === 'thisMonth') {
      start = startOfMonth(current);
      end = endOfMonth(current);
    }

    if (range === 'lastMonth') {
      const lastMonthDate = subMonths(current, 1);
      start = startOfMonth(lastMonthDate);
      end = endOfMonth(lastMonthDate);
    }

    this.setState(
      () => {
        if (
          isBefore(start, minDate) ||
          isEqual(start, minDate) ||
          isAfter(end, maxDate) ||
          isEqual(end, maxDate)
        ) {
          return null;
        }
        if (range === 'yesterday') {
          if (
            isBefore(subDays(current, 1), minDate) ||
            isEqual(subDays(current, 1), minDate) ||
            isAfter(subDays(current, 1), maxDate) ||
            isEqual(subDays(current, 1), maxDate)
          ) {
            return null;
          }

          return { date: subDays(current, 1) };
        }

        if (range === 'tomorrow') {
          if (
            isBefore(addDays(current, 1), minDate) ||
            isEqual(addDays(current, 1), minDate) ||
            isAfter(addDays(current, 1), maxDate) ||
            isEqual(addDays(current, 1), maxDate)
          ) {
            return null;
          }
          return { date: addDays(current, 1) };
        }
        return { date: [start, end] };
      },
      () => {
        const {
          state: { date },
        } = this;
        onChange(date);
      },
    );
  };

  renderDates = () => {
    const {
      state: { date },
    } = this;
    if (!Array.isArray(date)) {
      return <span className="start-date">{dateFormat(date)}</span>;
    }
    return (
      <>
        <span
          className="start-date"
          // style={{ position: 'absolute', left: '34px' }}
        >
          {dateFormat(date[0])}
        </span>
        <span className="end-date" style={{ margin: '22px' }}>
          {dateFormat(date[1])}
        </span>
      </>
    );
  };

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      state: { date, showCalendar },
      // eslint-disable-next-line no-unused-vars
      props: {
        endDate,
        minDate,
        maxDate,
        showStaticDateRange,
        selectRange,
        errorClassName,
        placeholder,
        selected,
        className,
        disabled,
      },
      staticDateRangeOptions,
      renderDates,
      closeCalendarHandler,
      toggleCalendar,
      staticDateRangeHandler,
      onChangeHandler,
    } = this;

    return (
      <div
        className="input-in naxatw-relative"
        tabIndex="0"
        onBlur={closeCalendarHandler}
        style={{ outline: 'none' }}
        role="button"
      >
        <div
          className={`naxatw-flex naxatw-justify-between ${className} naxatw-items-center ${
            showCalendar && 'naxatw-bg-grey-100'
          } ${
            disabled
              ? 'naxatw-bg-grey-100 naxatw-text-grey-400 naxatw-cursor-not-allowed'
              : ''
          } hover:naxatw-bg-grey-100 naxatw-border naxatw-border-[#D7D7D7] naxatw-h-[48px]  naxatw-px-3 naxatw-py-[15px] naxatw-w-full naxatw-rounded-md  is-date ${
            errorClassName ? 'errorInput' : ''
          }`}
          tabIndex="0"
          onClick={disabled ? () => {} : toggleCalendar}
          onKeyUp={disabled ? () => {} : toggleCalendar}
          role="button"
        >
          <div className="naxatw-flex naxatw-items-center">
            <i className="material-icons naxatw-font-normal naxatw-mr-2">
              calendar_today
            </i>

            {/* {renderDates()} */}
            <span
              className={`naxatw-text-body-lg ${
                disabled ? 'naxatw-text-grey-400' : ''
              }`}
            >
              {' '}
              {selected || placeholder}
            </span>
          </div>
          <i className="material-icons naxatw-font-normal">{`arrow_drop_${
            !showCalendar ? 'down' : 'up'
          }`}</i>
        </div>
        {showCalendar && (
          <div
            className=" naxatw-absolute naxatw-z-50 naxatw-mt-2"
            // style={{ display: 'block', top: '66px' }}
          >
            <div className="calendar-wrapper">
              {showStaticDateRange && (
                <ul className="calendar-sidebar">
                  {staticDateRangeOptions.map(option => (
                    <li
                      key={option.value}
                      onClick={() => staticDateRangeHandler(option.value)}
                      onKeyUp={() => staticDateRangeHandler(option.value)}
                      role="menuitem"
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}

              <Calendar
                onChange={onChangeHandler}
                value={date}
                selectRange={selectRange}
                calendarType="US"
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

CustomCalendar.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  showStaticDateRange: PropTypes.bool,
  selectRange: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  errorClassName: PropTypes.bool,
  placeholder: PropTypes.string,
  selected: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

CustomCalendar.defaultProps = {
  endDate: null,
  minDate: null,
  maxDate: null,
  showStaticDateRange: false,
  selectRange: false,
  errorClassName: false,
  placeholder: 'Choose',
  selected: null,
  className: '',
  disabled: false,
};

export default CustomCalendar;
