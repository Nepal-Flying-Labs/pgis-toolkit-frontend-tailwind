/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import Table, { TableHeader } from '@Components/common/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import SortingContainer from '@Components/common/SortingContainer/index';
import Button from '@Components/common/Button/index';
import { Creators, Types } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import { checkIfLoading } from '@Utils/loaderSelector';
import TableSkeleton from '@Components/common/TableSkeleton/index';

const { toggleModal } = CommonCreators;
const { getLayerAttributeRequest } = Creators;

const data = [
  {
    id: 1,
    attribute: 'Name',
    alias: 'Name',
    type: 'Text',
    source: 'OSM',
  },
  {
    id: 2,
    attribute: 'Length',
    alias: 'Length',
    type: 'Integer',
    source: 'USAFIRI',
  },
  {
    id: 3,
    attribute: 'Tot_Area',
    alias: 'Total Area',
    type: 'Float',
    source: 'Custom',
  },
];

const ManageAttributes = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector(
    state => state.projectDashboard.data.manageData.selectedData,
  );
  const attributeList = useSelector(
    state => state.projectDashboard.data.manageData.attributeList,
  );

  useEffect(() => {
    if (attributeList.length < 1)
      dispatch(getLayerAttributeRequest({ layer_template: selectedData?.id }));
  }, [dispatch, selectedData, attributeList]);

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_LAYER_ATTRIBUTE_REQUEST]),
  );
  return (
    <div className="">
      <div className="naxatw-flex naxatw-justify-end ">
        <Button
          iconLeft="add"
          className="naxatw-text-secondary-400 hover:naxatw-bg-[#F5F5F5] naxatw-group"
          onClick={() => dispatch(toggleModal('add-attributes'))}
        >
          Attribute
        </Button>
      </div>
      <div>
        {!loading ? (
          <Table
            data={attributeList || []}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            headerWidths={['50px', '200px', '150px', '150px', '50px']}
            // eslint-disable-next-line
            onRowClick={row => {}}
          >
            <TableHeader
              dataField=""
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader=""
              dataFormat={row => (
                <span className="naxatw-text-base">
                  <input type="checkbox" />
                </span>
              )}
            />
            <TableHeader
              dataField="Attribute"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Attribute"
                  className="naxatw-text-black"
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base naxatw-font-bold">
                  {row.name}
                </span>
              )}
            />
            <TableHeader
              dataField="Alias"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<span>Alias</span>}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.alias || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Type"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<span>Type</span>}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.data_type}</span>
              )}
            />
            {/* <TableHeader
            dataField="Source"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            rowcolSpan="rowSpan_2"
            dataHeader={<span>Source</span>}
            dataFormat={row => (
              <span className="naxatw-text-base">{row.source}</span>
            )}
          /> */}
            <TableHeader
              dataField="."
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
              rowcolSpan=""
              dataFormat={row => (
                <div className="naxatw-flex naxatw-gap-x-1">
                  <MaterialIcon
                    name="edit"
                    className="naxatw-text-icon-md"
                    wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md"
                  />
                  <MaterialIcon
                    name="delete"
                    className="naxatw-text-icon-md"
                    wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md"
                  />
                </div>
              )}
            />
          </Table>
        ) : (
          <TableSkeleton />
        )}
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-mt-5">
        <Button className="naxatw-btn-primary naxatw-w-[77px]">Done</Button>
      </div>
    </div>
  );
};

export default ManageAttributes;
