/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toastActions from '@Actions/toast';
import PropTypes from 'prop-types';
import { checkIfLoading } from '@Utils/loaderSelector';
import DropdownSelect from './DropdownSelect';
import MaterialIcon from '../MaterialIcon/index';

export default function Pagination({
  // rowPerPage,
  // setRowPerPage,
  // paginatedCounts,
  // paginatedCountsTotal,
  // nextPage,
  // previousPage,
  // currentPage,
  // jumpTo,
  paginatedCounts,
  count,
  nextPage,
  previousPage,
  currentPage,
  jumpTo,
  maxPage,
  rowSelect,
  handleSelect,
}) {
  const dispatch = useDispatch();
  const [jump, setJump] = useState(1);

  const loadingActions = useSelector(state => state.loader.loader.actions);

  return (
    <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-mt-3">
      <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
        <span className="naxatw-text-body-lg">Row per page</span>
        <DropdownSelect
          options={[
            { id: 1, value: 10 },
            { id: 2, value: 25 },
            { id: 3, value: 30 },
          ]}
          selected={rowSelect}
          placeholder="10"
          onChange={item => handleSelect(item.value)}
        />
      </div>
      <div className="naxatw-flex naxatw-gap-x-2 naxatw-justify-end naxatw-items-center">
        <p className="naxatw-flex naxatw-items-start naxatw-gap-x-2">
          <span className="naxatw-text-body-lg naxatw-font-bold">
            {paginatedCounts}
          </span>
          <span className="naxatw-text-body-lg">of</span>
          <span className="naxatw-text-body-lg naxatw-font-bold">{count}</span>
        </p>
        <p className="naxatw-flex naxatw-gap-x-2 naxatw-items-start">
          <span
            className="prev"
            title="Previous"
            tabIndex={0}
            style={{ outline: 0 }}
            role="button"
            onKeyPress={() => previousPage()}
            onClick={
              loadingActions.length > 0 ? () => {} : () => previousPage()
            }
          >
            <MaterialIcon
              name="chevron_left"
              className="naxatw-text-icon-md"
              wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md"
            />
          </span>
          <span
            className="next"
            title="Next"
            tabIndex={0}
            role="button"
            onKeyPress={() => nextPage()}
            onClick={loadingActions.length > 0 ? () => {} : () => nextPage()}
          >
            <MaterialIcon
              name="chevron_right"
              className="naxatw-text-icon-md"
              wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md"
            />
          </span>
        </p>
        <p className="naxatw-flex naxatw-gap-x-2 naxatw-justify-end naxatw-items-center">
          <span className="naxatw-text-body-lg">Jumps to</span>
          <input
            type="number"
            className="naxatw-input naxatw-w-[60px]"
            value={jump}
            // eslint-disable-next-line consistent-return
            onChange={e => {
              const { value } = e.target;
              if (value <= maxPage) {
                return setJump(e.target.value);
              }
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const { value } = e.target;
                if (parseInt(value, 10) > parseInt(maxPage, 10)) {
                  dispatch(
                    toastActions.error({ message: 'Page out of range' }),
                  );
                } else {
                  jumpTo(e.target.value);
                }
              }
            }}
            min="1"
            max={`${maxPage}`}
          />
        </p>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  // rowPerPage: PropTypes.array.isRequired,
  // setRowPerPage: PropTypes.func.isRequired,
  // paginatedCounts: PropTypes.string.isRequired,
  // paginatedCountsTotal: PropTypes.number.isRequired,
  // nextPage: PropTypes.func.isRequired,
  // previousPage: PropTypes.func.isRequired,
  // currentPage: PropTypes.number.isRequired,
  // jumpTo: PropTypes.func.isRequired,
  paginatedCounts: PropTypes.string,
  count: PropTypes.number,
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
  currentPage: PropTypes.number,
  jumpTo: PropTypes.func,
  maxPage: PropTypes.string,
  rowSelect: PropTypes.number,
  handleSelect: PropTypes.func,
};

Pagination.defaultProps = {
  paginatedCounts: '1',
  count: 1,
  nextPage: () => {},
  previousPage: () => {},
  currentPage: 1,
  jumpTo: () => {},
  maxPage: '1',
  rowSelect: 10,
  handleSelect: () => {},
};
