/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Searchbar from '@Components/common/Searchbar/index';
import { Creators, Types } from '@Actions/projectMap';
import Table, { TableHeader } from '@Components/common/Table/Table';
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

const {
  getLayerAttributeRequest,
  setAttributeTableSearchTerm,
  handleAttributeNextClick,
  handleAttributePreviousClick,
  handleAttributeJumpsTo,
  handleAttributeRowSelect,
  handleAttributeOrdering,
  resetLayerAttributeListState,
} = Creators;

const dropdownOptions = [
  {
    id: 1,
    label: (
      <span className="naxatw-flex naxatw-items-center">
        <i className="material-icons naxatw-mr-2">edit</i>
        <p className="naxatw-text-body-lg">Edit</p>
      </span>
    ),
    onClick: () => {},
  },
  {
    id: 2,
    label: (
      <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
        <i className="material-icons naxatw-mr-2">delete_outline</i>
        <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
      </span>
    ),
    onClick: () => {},
  },
];

export default function ViewLayerAttribute() {
  const dispatch = useDispatch();
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
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
    dispatch(
      getLayerAttributeRequest({
        layer: selectedLayer.id,
        search: searchText,
        page: currentPage,
        limit: rowPerPage,
        ordering,
      }),
    );
  }, [dispatch, selectedLayer, searchText, currentPage, rowPerPage, ordering]);

  useEffect(() => {
    if (showModal && modalContent === 'view-layer-attribute') return;

    dispatch(resetLayerAttributeListState());
  }, [dispatch, showModal, modalContent]);

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-y-2 naxatw-mt-2 naxatw-w-full naxatw-h-full">
      <div>
        <Searchbar
          className="naxatw-w-[15rem] naxatw-bg-grey-100"
          value={value}
          onChange={handleSearch}
        />
      </div>

      <div className="naxa-table naxatw-overflow-x-auto  scrollbar naxatw-relative  naxatw-w-full naxatw-max-h-[calc(100vh-25rem)] naxatw-min-h-[calc(100vh-25rem)]">
        {!loading ? (
          <Table
            data={attributeList || []}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            headerWidths={[
              '100px',
              '100px',
              '100px',
              '100px',
              '100px',
              '100px',
              '100px',
              '100px',
              '100px',
              '100px',
              '100px',
              '100px',
              '100px',
            ]}
            // eslint-disable-next-line
            // onRowClick={row => {}}
          >
            <TableHeader
              dataField="Auto ID"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Auto ID"
                  isActive={ordering === 'AUTO_ID'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'AUTO_ID' ? null : 'AUTO_ID',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
                  <span className="naxatw-text-base naxatw-font-bold">
                    {row.AUTO_ID || '-'}
                  </span>
                </div>
              )}
            />
            <TableHeader
              dataField="Road"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Road"
                  isActive={ordering === 'Road_2'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'Road_2' ? null : 'Road_2',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="text-base">{row.Road_2 || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Access"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Access"
                  isActive={ordering === 'access'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'access' ? null : 'access',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.access || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Bridge"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Bridge"
                  isActive={ordering === 'bridge'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'bridge' ? null : 'bridge',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.bridge || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Embankment"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Embankment"
                  isActive={ordering === 'embankment'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'embankment' ? null : 'embankment',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">
                  {row.embankment || '-'}
                </span>
              )}
            />
            <TableHeader
              dataField="Foot"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Foot"
                  isActive={ordering === 'foot'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'foot' ? null : 'foot',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.foot || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Footway"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Footway"
                  isActive={ordering === 'footway'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'footway' ? null : 'footway',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.footway || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Full Id"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Full Id"
                  isActive={ordering === 'full_id'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'full_id' ? null : 'full_id',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.full_id || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Highway"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Highway"
                  isActive={ordering === 'highway'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'highway' ? null : 'highway',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.highway || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Id"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Id"
                  isActive={ordering === 'id'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(ordering === 'id' ? null : 'id'),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.id || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Int Name"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Int Name"
                  isActive={ordering === 'int_name'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'int_name' ? null : 'int_name',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.int_name || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Junction"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Junction"
                  isActive={ordering === 'junction'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'junction' ? null : 'junction',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.junction || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Layer"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Layer"
                  isActive={ordering === 'layer'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'layer' ? null : 'layer',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.layer || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Name"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Name"
                  isActive={ordering === 'name'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'name' ? null : 'name',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.name || '-'}</span>
              )}
            />
            <TableHeader
              dataField="No Name"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="No Name"
                  isActive={ordering === 'noname'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'noname' ? null : 'noname',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.noname || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Oneway"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Oneway"
                  isActive={ordering === 'oneway'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'oneway' ? null : 'oneway',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.oneway || '-'}</span>
              )}
            />
            <TableHeader
              dataField="OSM Id"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="OSM Id"
                  isActive={ordering === 'osm_id'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'osm_id' ? null : 'osm_id',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.osm_id || '-'}</span>
              )}
            />
            <TableHeader
              dataField="OSM Type"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="OSM Type"
                  isActive={ordering === 'type'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'type' ? null : 'type',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.osm_type || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Difficulty"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Difficulty"
                  isActive={ordering === 'difficulty'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'difficulty' ? null : 'difficulty',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">
                  {row.difficulty || '-'}
                </span>
              )}
            />
            <TableHeader
              dataField="Ref"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Ref"
                  isActive={ordering === 'ref'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'ref' ? null : 'ref',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.ref || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Road"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Road"
                  isActive={ordering === 'road'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'road' ? null : 'road',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.road || '-'}</span>
              )}
            />
            <TableHeader
              dataField="SAC Scale"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="SAC Scale"
                  isActive={ordering === 'sac_scale'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'sac_scale' ? null : 'sac_scale',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.sac_scale || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Service"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Service"
                  isActive={ordering === 'service'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'service' ? null : 'service',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.service || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Sidewalk"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Sidewalk"
                  isActive={ordering === 'sidewalk'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'sidewalk' ? null : 'sidewalk',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.sidewalk || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Smoothness"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Smoothness"
                  isActive={ordering === 'smoothness'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'smoothness' ? null : 'smoothness',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">
                  {row.smoothness || '-'}
                </span>
              )}
            />
            <TableHeader
              dataField="Surface"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Surface"
                  isActive={ordering === 'surface'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'surface' ? null : 'surface',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.surface || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Tunnel"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Tunnel"
                  isActive={ordering === 'tunnel'}
                  handleSort={() =>
                    dispatch(
                      handleAttributeOrdering(
                        ordering === 'tunnel' ? null : 'tunnel',
                      ),
                    )
                  }
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base">{row.tunnel || '-'}</span>
              )}
            />

            <TableHeader
              dataField=""
              headerClassName="dropdownMenu"
              rowClassName="dropdownMenu"
              rowcolSpan="rowSpan_3"
              dataFormat={row => (
                <DropdownOptions options={dropdownOptions} data={row} />
              )}
            />
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
    </div>
  );
}
