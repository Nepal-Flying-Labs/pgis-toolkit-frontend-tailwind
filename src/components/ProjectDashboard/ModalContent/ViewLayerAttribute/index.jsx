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
// import Pagination from '@Components/common/Pagination';

const { getLayerAttributeRequest, setAttributeTableSearchTerm } = Creators;

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
  const attributeList = useSelector(
    state => state.projectMap.layerAttributesList.attributeList,
  );
  const searchText = useSelector(
    state => state.projectMap.layerAttributesList.searchTerm,
  );
  // const currentPage = useSelector(
  //   state => state.projectMap.layerAttributesList.pagination.page,
  // );
  // const rowPerPage = useSelector(
  //   state => state.projectMap.layerAttributesList.pagination.rowSelect,
  // );
  // const totalCount = useSelector(
  //   state => state.projectMap.layerAttributesList.pagination.count,
  // );
  // const nextPage = useSelector(
  //   state => state.projectMap.layerAttributesList.pagination.next,
  // );
  // const previousPage = useSelector(
  //   state => state.projectMap.layerAttributesList.pagination.previous,
  // );
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
      getLayerAttributeRequest({ layer: selectedLayer.id, search: searchText }),
    );
  }, [dispatch, selectedLayer, searchText]);
  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-y-2 naxatw-mt-2">
      <div>
        <Searchbar
          className="naxatw-w-[15rem] naxatw-bg-grey-100"
          value={value}
          onChange={handleSearch}
        />
      </div>

      <div className="naxa-table naxatw-overflow-x-auto  scrollbar naxatw-relative  naxatw-w-full">
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
                  className="naxatw-text-black"
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
              dataHeader={<SortingContainer name="Road" />}
              dataFormat={row => (
                <span className="text-base">{row.Road_2 || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Access"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Access" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.access || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Bridge"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Bridge" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.bridge || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Embankment"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Embankment" />}
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
              dataHeader={<SortingContainer name="Foot" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.foot || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Footway"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Footway" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.footway || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Full Id"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Full Id" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.full_id || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Highway"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Highway" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.highway || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Id"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Id" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.id || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Int Name"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Int Name" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.int_name || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Junction"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Junction" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.junction || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Layer"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Layer" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.layer || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Name"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Name" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.name || '-'}</span>
              )}
            />
            <TableHeader
              dataField="No Name"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="No Name" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.noname || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Oneway"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Oneway" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.oneway || '-'}</span>
              )}
            />
            <TableHeader
              dataField="OSM Id"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="OSM Id" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.osm_id || '-'}</span>
              )}
            />
            <TableHeader
              dataField="OSM Type"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="OSM Type" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.osm_type || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Difficulty"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Difficulty" />}
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
              dataHeader={<SortingContainer name="Ref" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.ref || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Road"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Road" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.road || '-'}</span>
              )}
            />
            <TableHeader
              dataField="SAC Scale"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="SAC Scale" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.sac_scale || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Service"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Service" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.service || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Sidewalk"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Sidewalk" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.sidewalk || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Smoothness"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Smoothness" />}
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
              dataHeader={<SortingContainer name="Surface" />}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.surface || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Tunnel"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Tunnel" />}
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
      {/* <Pagination
        nextPage={next}
        previousPage={previous}
        jumpTo={jump}
        currentPage={currentPage}
        count={totalCount || 0}
        paginatedCounts={getSelectedRange(totalCount, rowPerPage, currentPage)}
        maxPage={getMaxPage(totalCount, rowPerPage)}
        rowSelect={rowPerPage}
        handleSelect={data => dispatch(handleRowSelect(data))}
      /> */}
    </div>
  );
}
