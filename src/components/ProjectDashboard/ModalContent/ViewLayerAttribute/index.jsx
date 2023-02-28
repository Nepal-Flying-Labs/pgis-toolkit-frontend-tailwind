/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Searchbar from '@Components/common/Searchbar/index';
import { Creators, Types } from '@Actions/projectMap';
import { Creators as CommonCreators } from '@Actions/common';
import Table, { TableHeader } from '@Components/common/CustomTable';
import SortingContainer from '@Components/common/SortingContainer/index';
import DropdownOptions from '@Components/common/DropdownOptions/index';
import { checkIfLoading } from '@Utils/loaderSelector';
import '@Components/OrganizationDashboard/User/Users/index.css';
import TableSkeleton from '@Components/common/TableSkeleton/index';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import {
  getSelectedRange,
  getMaxPage,
} from '@Components/common/Pagination/getSelectedItem';
import Pagination from '@Components/common/Pagination';
import { isEmpty } from '@Utils/commonUtils';
import { boundaryLayerName } from '@src/constants/map';

const {
  getLayerAttributeRequest,
  getQueryAttributeRequest,
  setAttributeTableSearchTerm,
  handleAttributeNextClick,
  handleAttributePreviousClick,
  handleAttributeJumpsTo,
  handleAttributeRowSelect,
  handleAttributeOrdering,
  resetLayerAttributeListState,
  setSelectedLayerAttribute,
  setProjectMapState,
} = Creators;

const { toggleModalTwo, togglePromptDialog } = CommonCreators;

export default function ViewLayerAttribute() {
  const dispatch = useDispatch();
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const selectedData = useSelector(
    state => state.projectMap.dataQuery.selectedData,
  );
  const showModal = useSelector(state => state.common.showModal);
  const modalContent = useSelector(state => state.common.modalContent);
  const attributeList = useSelector(
    state => state.projectMap.layerAttributesList.attributeList,
  );
  const searchText = useSelector(
    state => state.projectMap.layerAttributesList.searchTerm,
  );
  const ordering = useSelector(
    state => state.projectMap.layerAttributesList.ordering,
  );
  const currentPage = useSelector(
    state => state.projectMap.layerAttributesList.pagination.page,
  );
  const rowPerPage = useSelector(
    state => state.projectMap.layerAttributesList.pagination.rowSelect,
  );
  const totalCount = useSelector(
    state => state.projectMap.layerAttributesList.pagination.count,
  );
  const nextPage = useSelector(
    state => state.projectMap.layerAttributesList.pagination.next,
  );
  const previousPage = useSelector(
    state => state.projectMap.layerAttributesList.pagination.previous,
  );

  const next = () => {
    if (nextPage !== null) dispatch(handleAttributeNextClick());
  };
  const previous = () => {
    if (previousPage !== null) dispatch(handleAttributePreviousClick());
  };

  const jump = data => {
    dispatch(handleAttributeJumpsTo(data));
  };

  const [value, handleSearch] = useDebouncedInput({
    ms: 300,
    init: searchText,
    onChange: debouncedEvent => {
      dispatch(setAttributeTableSearchTerm(debouncedEvent.target.value));
    },
  });
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_LAYER_ATTRIBUTE_REQUEST]),
  );

  useEffect(() => {
    if (modalContent !== 'view-layer-attribute') return;
    if (selectedLayer) {
      dispatch(
        getLayerAttributeRequest({
          layer: selectedLayer?.id,
          search: searchText,
          page: currentPage,
          limit: rowPerPage,
          ordering,
        }),
      );
    }
  }, [
    dispatch,
    selectedLayer,
    searchText,
    currentPage,
    rowPerPage,
    ordering,
    modalContent,
  ]);

  useEffect(() => {
    if (modalContent !== 'view-query-attribute') return;
    if (selectedData) {
      dispatch(
        getQueryAttributeRequest({
          layer: selectedData.id,
          search: searchText,
          page: currentPage,
          limit: rowPerPage,
          ordering,
        }),
      );
    }
  }, [
    dispatch,
    selectedData,
    searchText,
    currentPage,
    rowPerPage,
    ordering,
    modalContent,
  ]);

  useEffect(() => {
    if (showModal && modalContent === 'view-layer-attribute') return;
    dispatch(setProjectMapState({ selectedLayer: null }));
    dispatch(resetLayerAttributeListState());
  }, [dispatch, showModal, modalContent]);

  const headerKeys = useMemo(
    () => Object.keys(attributeList[0] || {}),
    [attributeList],
  );

  const dropdownOptions = [
    {
      id: 1,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Edit</p>
        </span>
      ),
      onClick: data => {
        dispatch(setSelectedLayerAttribute(data));
        dispatch(toggleModalTwo('edit-layer-attribute'));
      },
    },
    {
      id: 2,
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
        </span>
      ),
      onClick: data => {
        dispatch(setSelectedLayerAttribute(data));
        dispatch(togglePromptDialog('delete-layer-attribute'));
      },
    },
  ];

  const isBoundaryLayer = selectedLayer?.name !== boundaryLayerName;

  const headerWidths = isBoundaryLayer
    ? [...headerKeys.map(() => '150px')]
    : [...headerKeys.map(() => '150px'), '10px'];

  if (!loading && isEmpty(attributeList))
    return (
      <div className="naxatw-py-8 naxatw-flex naxatw-justify-center">
        <h4>No attributes found.</h4>
      </div>
    );

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-y-2 naxatw-w-full naxatw-h-full">
      <div>
        <Searchbar
          className="naxatw-w-[15rem] naxatw-bg-grey-100"
          value={value}
          onChange={handleSearch}
        />
      </div>

      <div
        className="naxa-table naxatw-overflow-x-auto scrollbar naxatw-relative
          naxatw-w-full naxatw-max-h-[calc(100vh-19rem)] naxatw-min-h-[calc(100vh-19rem)] 
          xl:naxatw-max-h-[calc(100vh-25rem)] xl:naxatw-min-h-[calc(100vh-25rem)]"
      >
        {loading ? (
          <TableSkeleton itemNumber={5} />
        ) : (
          <Table
            data={attributeList || []}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            headerWidths={headerWidths}
            // eslint-disable-next-line
            // onRowClick={row => {}}
          >
            {headerKeys.map(key => (
              <TableHeader
                key={key}
                dataField={key}
                headerClassName="naxatw-py-[0.8125rem] "
                rowcolSpan="rowSpan_2"
                rowClassName=""
                dataHeader={
                  <SortingContainer
                    name={key}
                    isActive={ordering === key}
                    handleSort={() =>
                      dispatch(
                        handleAttributeOrdering(ordering === key ? null : key),
                      )
                    }
                  />
                }
                dataFormat={row => (
                  <p
                    className={`naxatw-overflow-ellipsis naxatw-w-[150px] naxatw-whitespace-nowrap naxatw-overflow-hidden ${
                      ordering === key
                        ? 'naxatw-text-body-btn'
                        : 'naxatw-text-body-lg'
                    } naxatw-p-2.5 `}
                  >
                    {!Array.isArray(row[key]) &&
                    typeof row[key] === 'object' &&
                    row[key]
                      ? Object.keys(row[key]).map(item => (
                          <p>{`${row[key][item]},`}</p>
                        ))
                      : row[key] || '-'}
                  </p>
                )}
              />
            ))}
            {isBoundaryLayer && (
              <TableHeader
                dataField=""
                headerClassName=""
                rowClassName="sticky-menu"
                rowcolSpan="rowSpan_3"
                dataFormat={row => (
                  <div className="naxatw-w-fit naxatw-shadow-xl naxatw-relative">
                    <DropdownOptions options={dropdownOptions} data={row} />
                  </div>
                )}
              />
            )}
          </Table>
        )}
      </div>
      <Pagination
        nextPage={next}
        previousPage={previous}
        jumpTo={jump}
        currentPage={currentPage}
        count={totalCount || 0}
        paginatedCounts={getSelectedRange(totalCount, rowPerPage, currentPage)}
        maxPage={getMaxPage(totalCount, rowPerPage)}
        rowSelect={rowPerPage}
        handleSelect={data => dispatch(handleAttributeRowSelect(data))}
      />
    </div>
  );
}
