import React from 'react';
import PropTypes from 'prop-types';
// import DropdownSelect from '../DropdownSelect/DropdownSelect';

export default function Pagination({
  // rowPerPage,
  // setRowPerPage,
  paginatedCounts,
  paginatedCountsTotal,
  nextPage,
  previousPage,
  currentPage,
  jumpTo,
}) {
  return (
    <div className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-mt-8">
      <div className="naxatw-flex naxatw-items-start">
        <span className="row-text">Row per page</span>
        {/* <DropdownSelect
          isNotForm
          arrayList={rowPerPage}
          setArrayList={setRowPerPage}
          chooseKey="value"
        />
      */}
      </div>
      <div className="naxatw-flex naxatw-justify-end naxatw-items-center">
        <p className="naxatw-flex naxatw-items-start">
          <span className="show-row">{paginatedCounts}</span>
          <span>of</span>
          <span className="total-row">{paginatedCountsTotal}</span>
        </p>
        <p className="naxatw-flex naxatw-items-start">
          <span
            className="prev"
            tabIndex={0}
            style={{ outline: 0 }}
            role="button"
            onKeyPress={() => previousPage()}
            onClick={() => previousPage()}
          >
            <i className="material-icons">chevron_left</i>
          </span>
          <span
            className="next"
            tabIndex={0}
            role="button"
            onKeyPress={() => nextPage()}
            onClick={() => nextPage()}
          >
            <i className="material-icons">chevron_right</i>
          </span>
        </p>
        <p className="naxatw-flex naxatw-justify-end naxatw-items-center">
          <span>Jumps to</span>
          <input
            type="number"
            className="form-control naxatw-w-32"
            value={currentPage}
            onChange={e => jumpTo(e.target.value)}
          />
        </p>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  // rowPerPage: PropTypes.array.isRequired,
  // setRowPerPage: PropTypes.func.isRequired,
  paginatedCounts: PropTypes.string.isRequired,
  paginatedCountsTotal: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  jumpTo: PropTypes.func.isRequired,
};
