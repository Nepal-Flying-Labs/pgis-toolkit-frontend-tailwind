/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import {
  Types,
  Creators as ProjectDashboardCreators,
} from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import toastActions from '@Actions/toast';
import Table, { TableHeader } from '@Components/common/Table/Table';
import SortingContainer from '@Components/common/SortingContainer';
import DropdownOptions from '@Components/common/DropdownOptions';
import Button from '@Components/common/Button';
import Toggle from '@Components/common/Toggle';
import TableSkeleton from '@Components/common/TableSkeleton/index';
import { checkIfLoading } from '@Utils/loaderSelector';

const currentPage = 1;
const dataPerPage = 10;

const { setDeleteLayer } = ProjectMapCreators;
const {
  setDataState,
  permanentDataDeleteRequest,
  handleAddToMap,
  updateDataRequest,
} = ProjectDashboardCreators;
const { togglePromptDialog, toggleModal } = CommonCreators;

export default function LayerList() {
  const layers = useSelector(state => state.projectDashboard.data.layers);
  const projectAreaLayerId = useSelector(
    state => state.projectDashboard.data.projectAreaLayerId,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_PROJECT_LAYERS_REQUEST]),
  );

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
      onClick: data => {
        dispatch(setDataState({ selectedData: data }));
        dispatch(toggleModal('edit-layer'));
      },
    },
    {
      id: 2,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">download</i>
          <p className="naxatw-text-body-lg">Download</p>
        </span>
      ),
      onClick: data => {
        dispatch(setDataState({ selectedData: data }));
        dispatch(toggleModal('download-layer'));
      },
    },
    {
      id: 3,
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-[#FF0F0F]">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-[#FF0F0F]">Delete</p>
        </span>
      ),
      onClick: data => {
        if (data.id === projectAreaLayerId) {
          dispatch(
            toastActions.error({ message: 'Project Area cannot be removed.' }),
          );
          return;
        }
        dispatch(setDeleteLayer({ ...data, deleteType: 'data' }));
        dispatch(togglePromptDialog('delete-layer'));
      },
    },
  ];

  return (
    <div className="naxatw-space-y-10 xl:naxatw-mt-5">
      {/* <div className="naxatw-flex naxatw-justify-end"> */}
      {/*
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm"
            iconLeft="download"
          >
            Download All
          </Button>
        */}
      {/* </div> */}
      <div className="naxa-table xl:naxatw-h-[calc(100vh-26rem)] naxatw-h-[calc(100vh-20rem)] naxatw-overflow-x-auto  scrollbar naxatw-relative naxatw-shadow-inner">
        {!loading ? (
          <Table
            rowClassName="naxatw-py-1 naxatw-px-3"
            noColumnCondition={{ key: 'upload_status', value: 'uploading' }}
            data={layers || []}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-1 naxatw-px-3"
            headerWidths={[
              '1%',
              '350px',
              '220px',
              '150px',
              '120px',
              '120px',
              '120px',
              '100px',
              '50px',
            ]}
            onBtnClick={row => {
              dispatch(setDataState({ selectedData: row }));
              dispatch(togglePromptDialog('upload-failed'));
            }}
            onDeleteBtnClick={row => {
              dispatch(permanentDataDeleteRequest(row.id));
              // dispatch(togglePromptDialog('upload-failed'));
            }}
            // headerWidths={['50px', '200px', '150px', '150px', '50px']}
            onRowClick={row => {
              // history.push(`/organizations/${row.id}/projects`);
            }}
          >
            <TableHeader
              dataField="SN"
              headerClassName="naxatw-py-1 naxatw-px-3"
              rowcolSpan="rowSpan_0"
              dataHeader={<SortingContainer name="S.N" />}
              dataFormat={(row, _, index) => (
                <span className="naxatw-text-body-lg">
                  {(currentPage - 1) * dataPerPage + (index + 1)}
                </span>
              )}
            />
            <TableHeader
              dataField="Data"
              headerClassName="naxatw-py-1 naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <span className="naxatw-text-body-lg naxatw-font-bold naxatw-flex naxatw-gap-2">
                  {row.name}
                </span>
              )}
            />
            <TableHeader
              dataField="Category"
              headerClassName="naxatw-py-1 naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <span className="naxatw-text-body-lg">{row.theme || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Geometry"
              headerClassName="naxatw-py-1 naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <span className="naxatw-text-body-lg">{row.geom_type}</span>
              )}
            />
            <TableHeader
              dataField="Features"
              headerClassName="naxatw-py-1 naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <span className="naxatw-text-body-lg">{row.features}</span>
              )}
            />
            <TableHeader
              dataField="Source"
              headerClassName="naxatw-py-1 naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <span className="naxatw-text-body-lg">{row.source}</span>
              )}
            />
            {/* <TableHeader
              dataField="Status"
              headerClassName="naxatw-py-1 naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataHeader={<SortingContainer name="Status" />}
              dataFormat={row => (
                <span className="naxatw-text-body-lg">{row.status}</span>
              )}
            /> */}
            <TableHeader
              dataField="Add to map"
              headerClassName="naxatw-py-1 naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <span className="naxatw-flex">
                  <Toggle
                    isSm
                    checked={row.display_on_map}
                    onChange={e => {
                      const { checked } = e.target;
                      dispatch(handleAddToMap({ id: row.id, checked }));
                      dispatch(
                        updateDataRequest(row.id, {
                          display_on_map: checked,
                        }),
                      );
                    }}
                  />
                </span>
              )}
            />
            {/* <TableHeader
              dataField="add_field_data"
              headerClassName="naxatw-py-1 naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <span className="naxatw-text-body-lg">
                  <Button className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder !naxatw-min-w-fit">
                    Add Field Data
                  </Button>
                </span>
              )}
            />
            <TableHeader
              dataField="Data Quality"
              headerClassName="naxatw-py-1 naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <span className="naxatw-text-body-lg">
                  <Button className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder">
                    Recheck
                  </Button>
                </span>
              )}
            /> */}
            <TableHeader
              dataField=""
              headerClassName="naxatw-py-1 naxatw-px-3 naxatw-text-right"
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
    </div>
  );
}
