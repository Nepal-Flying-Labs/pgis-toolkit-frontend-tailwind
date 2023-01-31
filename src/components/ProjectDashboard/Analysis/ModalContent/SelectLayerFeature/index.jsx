/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Searchbar from '@Components/common/Searchbar';
import {
  Creators as AnalysisCreators,
  Types as AnalysisTypes,
} from '@Actions/analysis';
import {
  Creators as RouteAnalysisCreators,
  Types as RouteAnalysisTypes,
} from '@Actions/routeAnalysis';
import Table, { TableHeader } from '@Components/common/CustomTable';
import SortingContainer from '@Components/common/SortingContainer';
import { checkIfLoading } from '@Utils/loaderSelector';
import '@Components/OrganizationDashboard/User/Users/index.css';
import TableSkeleton from '@Components/common/TableSkeleton';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import {
  getSelectedRange,
  getMaxPage,
} from '@Components/common/Pagination/getSelectedItem';
import Pagination from '@Components/common/Pagination';
import Button from '@Components/common/Button';

const {
  getLayerAttributeRequest,
  setAttributeTableSearchTerm,
  handleAttributeNextClick,
  handleAttributePreviousClick,
  handleAttributeJumpsTo,
  handleAttributeRowSelect,
  handleAttributeOrdering,
  resetLayerAttributeListState,
  handleTableCheckbox,
} = AnalysisCreators;

const { getSelectedLayerFeatureRequest } = RouteAnalysisCreators;

export default function SelectLayerFeature() {
  const dispatch = useDispatch();
  const selectedLayer = useSelector(state => state.analysis.selectedLayer);
  const showModal = useSelector(state => state.common.showModal);
  const modalContent = useSelector(state => state.common.modalContent);
  const attributeList = useSelector(
    state => state.analysis.layerAttributesList.attributeList,
  );
  const searchText = useSelector(
    state => state.analysis.layerAttributesList.searchTerm,
  );
  const ordering = useSelector(
    state => state.analysis.layerAttributesList.ordering,
  );
  const currentPage = useSelector(
    state => state.analysis.layerAttributesList.pagination.page,
  );
  const rowPerPage = useSelector(
    state => state.analysis.layerAttributesList.pagination.rowSelect,
  );
  const totalCount = useSelector(
    state => state.analysis.layerAttributesList.pagination.count,
  );
  const nextPage = useSelector(
    state => state.analysis.layerAttributesList.pagination.next,
  );
  const previousPage = useSelector(
    state => state.analysis.layerAttributesList.pagination.previous,
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
    checkIfLoading(state, [AnalysisTypes.GET_LAYER_ATTRIBUTE_REQUEST]),
  );
  const isPosting = useSelector(state =>
    checkIfLoading(state, [
      RouteAnalysisTypes.GET_SELECTED_LAYER_FEATURE_REQUEST,
    ]),
  );

  useEffect(() => {
    if (!selectedLayer) return;
    dispatch(
      getLayerAttributeRequest({
        layer: selectedLayer?.id,
        search: searchText,
        page: currentPage,
        limit: rowPerPage,
        ordering,
      }),
    );
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
    if (showModal && modalContent === 'view-layer-attribute') return;

    dispatch(resetLayerAttributeListState());
  }, [dispatch, showModal, modalContent]);

  const headerKeys = useMemo(
    () => Object.keys(attributeList[0] || {}),
    [attributeList],
  );

  const handleSave = () => {
    dispatch(getSelectedLayerFeatureRequest());
  };

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-y-2 naxatw-w-full naxatw-h-full">
      <div>
        <Searchbar
          className="naxatw-w-[15rem] naxatw-bg-grey-100"
          value={value}
          onChange={handleSearch}
        />
      </div>

      <div className="naxa-table naxatw-overflow-x-auto  scrollbar naxatw-relative  naxatw-w-full naxatw-max-h-[calc(100vh-19rem)]  xl:naxatw-max-h-[calc(100vh-25rem)] xl:naxatw-min-h-[calc(100vh-25rem)]">
        {!loading && headerKeys.length > 0 ? (
          <Table
            data={attributeList || []}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            headerWidths={['50px', ...headerKeys.map(() => '150px'), '10px']}
            onRowClick={row => {
              dispatch(handleTableCheckbox(row.attrId));
            }}
          >
            <TableHeader
              dataField=" "
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              rowClassName=""
              dataFormat={row => (
                <input
                  type="checkbox"
                  className="naxatw-w-5 naxatw-h-5 naxatw-accent-grey-800 naxatw-m-2"
                  checked={row.checked}
                  onChange={() => dispatch(handleTableCheckbox(row.attrId))}
                />
              )}
            />
            {headerKeys.map(key => (
              <TableHeader
                key={key}
                dataField={key}
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
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
                    } `}
                  >
                    {row[key] || '-'}
                  </p>
                )}
              />
            ))}
          </Table>
        ) : (
          <TableSkeleton itemNumber={5} />
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

      <div className="naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          isLoading={isPosting}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
