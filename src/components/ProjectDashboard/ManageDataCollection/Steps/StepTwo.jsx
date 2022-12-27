/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Searchbar from '@Components/common/Searchbar/index';
import { useDispatch, useSelector } from 'react-redux';
import Table, { TableHeader } from '@Components/common/Table/Table';
import Button from '@Components/common/Button/index';
import CustomCheckbox from '@Components/common/CustomCheckbox/index';
import { Creators } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import SortingContainer from '@Components/common/SortingContainer/index';

const { toggleModal } = CommonCreators;
const { getLayerTemplateRequest, patchLayerTemplateRequest, setSelectedLayer } =
  Creators;

const data = [
  {
    id: 1,
    checked: false,
    layer_name: 'Road',
    category: 'Transportation',
  },
  {
    id: 2,
    checked: false,
    layer_name: 'Road Accidents',
    category: 'Obstacle',
  },
  {
    id: 3,
    checked: false,
    layer_name: 'Street',
    category: 'Street',
  },
];

const StepTwo = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const layerTemplate = useSelector(
    state => state.projectDashboard.data.manageData.layerTemplate,
  );

  useEffect(() => {
    if (layerTemplate.length < 1) dispatch(getLayerTemplateRequest(projectId));
  }, [dispatch, projectId, layerTemplate]);

  const handleRowClick = row => {
    dispatch(
      patchLayerTemplateRequest(row.id, {
        selected: !row.selected,
      }),
    );
  };

  return (
    <div>
      <h4>Preparation for data collection</h4>
      <p className="naxatw-text-body-lg naxatw-mt-2">
        Choose the desired datasets from the two options below. You may choose
        data from both of the options below but make sure to choose the same
        data only once.
      </p>
      <div className="naxatw-mt-5 naxatw-flex naxatw-justify-between naxatw-items-center ">
        <p>List of data templates for field data collection</p>
        <div className="naxatw-py-[10px] naxatw-pr-3">
          <Searchbar />
        </div>
      </div>
      <div className="naxa-table naxatw-overflow-x-auto scrollbar">
        <Table
          data={layerTemplate || []}
          className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
          headerWidths={['50px', '200px', '150px', '150px', '50px']}
          // eslint-disable-next-line
          onRowClick={row => {
            handleRowClick(row);
          }}
        >
          <TableHeader
            dataField=""
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            rowcolSpan="rowSpan_2"
            dataFormat={row => <CustomCheckbox status={row.selected} />}
          />
          <TableHeader
            dataField="Layer Name"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
            rowcolSpan="rowSpan_2"
            dataHeader={
              <SortingContainer
                name="Layer Name"
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
            dataField="Geometry Type"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            rowcolSpan="rowSpan_2"
            dataHeader={<SortingContainer name="Geometry Type" />}
            dataFormat={row => (
              <span className="naxatw-text-base">{row.geometry_type}</span>
            )}
          />
          <TableHeader
            dataField="Data Import"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
            dataHeader={<SortingContainer name="Data Import" />}
            rowcolSpan="rowSpan_3"
            dataFormat={row => (
              <div className=" naxatw-gap-x-2 naxatw-items-center">
                {/* <Button
                  className="naxatw-btn-secondary naxatw-btn-noborder naxatw-min-w-fit"
                  onClick={() => dispatch(toggleModal('add-wms-layer'))}
                >
                  Import From OSM
                </Button> */}
                <Button
                  className="naxatw-btn-secondary naxatw-btn-noborder naxatw-min-w-fit"
                  onClick={e => {
                    e.stopPropagation();
                    dispatch(setSelectedLayer(row));
                    dispatch(toggleModal('manage-attributes'));
                  }}
                >
                  Manage Attributes
                </Button>
                {/* <Button className="naxatw-btn-secondary naxatw-btn-noborder naxatw-min-w-fit">
                  Map
                </Button> */}
              </div>
            )}
          />
        </Table>
      </div>
      <p className="naxatw-text-body-md naxatw-text-[#484848] naxatw-py-3">
        Are you confused? Please check our guide document,{' '}
        <a className="naxatw-text-body-md naxatw-text-secondary-400">
          click here to view.
        </a>
      </p>
    </div>
  );
};

export default StepTwo;
