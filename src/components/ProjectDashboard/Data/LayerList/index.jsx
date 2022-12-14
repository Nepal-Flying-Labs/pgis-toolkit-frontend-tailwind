/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import { Creators as ProjectDashboardCreators } from '@Actions/projectDashboard';
import Table, { TableHeader } from '@Components/common/Table/Table';
import SortingContainer from '@Components/common/SortingContainer';
import DropdownOptions from '@Components/common/DropdownOptions';
import Button from '@Components/common/Button';
import Toggle from '@Components/common/Toggle';
import Spinner from '@Components/common/Spinner';
import MaterialIcon from '@Components/common/MaterialIcon';

const currentPage = 1;
const dataPerPage = 10;

const { setDeleteLayer } = ProjectMapCreators;
const { setDataState } = ProjectDashboardCreators;
const { togglePromptDialog } = CommonCreators;

export default function LayerList() {
  const layers = useSelector(state => state.projectDashboard.data.layers);
  const dispatch = useDispatch();

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
      onClick: data => {
        dispatch(setDeleteLayer({ ...data, deleteType: 'data' }));
        dispatch(togglePromptDialog('delete-layer'));
      },
    },
  ];

  return (
    <div className="naxatw-space-y-10 naxatw-mt-5">
      <div className="naxatw-flex naxatw-justify-end">
        {/*
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm"
            iconLeft="download"
          >
            Download All
          </Button>
        */}
      </div>

      <Table
        rowClassName="naxatw-py-1 naxatw-px-3"
        noColumnCondition={{ key: 'upload_status', value: 'uploading' }}
        data={layers || []}
        className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
        headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
        onBtnClick={row => {
          dispatch(setDataState({ selectedData: row }));
          dispatch(togglePromptDialog('upload-failed'));
        }}
        // headerWidths={['50px', '200px', '150px', '150px', '50px']}
        onRowClick={row => {
          // history.push(`/organizations/${row.id}/projects`);
        }}
      >
        <TableHeader
          dataField="SN"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
          rowcolSpan="rowSpan_2"
          dataHeader={<SortingContainer name="S.N" />}
          dataFormat={(row, _, index) => (
            <span className="naxatw-text-base">
              {(currentPage - 1) * dataPerPage + (index + 1)}
            </span>
          )}
        />
        <TableHeader
          dataField="Data"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
          rowcolSpan="rowSpan_2"
          dataFormat={row => (
            <span className="naxatw-text-base naxatw-font-bold naxatw-flex naxatw-gap-2">
              {row.name}
              {row.upload_status === 'uploading' && (
                <p className="naxatw-flex naxatw-gap-5 naxatw-text-secondary-400">
                  <MaterialIcon name="rotate_right" />
                  Uploading <Spinner className="naxatw-fill-primary-400" />
                </p>
              )}
            </span>
          )}
        />
        <TableHeader
          dataField="Category"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
          rowcolSpan="rowSpan_2"
          dataFormat={row => (
            <span className="naxatw-text-base">{row.theme || '-'}</span>
          )}
        />
        <TableHeader
          dataField="Geometry"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
          rowcolSpan="rowSpan_2"
          dataFormat={row => (
            <span className="naxatw-text-base">{row.geom_type}</span>
          )}
        />
        <TableHeader
          dataField="Features"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
          rowcolSpan="rowSpan_2"
          dataFormat={row => (
            <span className="naxatw-text-base">{row.features}</span>
          )}
        />
        <TableHeader
          dataField="Source"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
          rowcolSpan="rowSpan_2"
          dataFormat={row => (
            <span className="naxatw-text-base">{row.source}</span>
          )}
        />
        <TableHeader
          dataField="Status"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
          rowcolSpan="rowSpan_2"
          dataHeader={<SortingContainer name="Status" />}
          dataFormat={row => (
            <span className="naxatw-text-base">{row.status}</span>
          )}
        />
        <TableHeader
          dataField="Add to map"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
          rowcolSpan="rowSpan_2"
          dataFormat={row => (
            <span className="naxatw-flex">
              <Toggle checked={row.display_on_map} />
            </span>
          )}
        />
        <TableHeader
          dataField="add_field_data"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
          rowcolSpan="rowSpan_2"
          dataFormat={row => (
            <span className="naxatw-text-base">
              <Button className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder">
                Add Field Data
              </Button>
            </span>
          )}
        />
        <TableHeader
          dataField="recheck"
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
          rowcolSpan="rowSpan_2"
          dataFormat={row => (
            <span className="naxatw-text-base">
              <Button className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder">
                Recheck
              </Button>
            </span>
          )}
        />
        <TableHeader
          dataField=""
          headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
          rowcolSpan="rowSpan_3"
          dataFormat={row => (
            <DropdownOptions options={dropdownOptions} data={row} />
          )}
        />
      </Table>
    </div>
  );
}
