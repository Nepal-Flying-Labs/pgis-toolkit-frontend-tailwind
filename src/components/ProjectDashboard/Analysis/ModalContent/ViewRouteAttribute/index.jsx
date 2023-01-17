/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/routeAnalysis';
import Table, { TableHeader } from '@Components/common/CustomTable';
import '@Components/OrganizationDashboard/User/Users/index.css';
import TableSkeleton from '@Components/common/TableSkeleton';
import { checkIfLoading } from '@Utils/loaderSelector';

const { getAnalysisDataRequest } = Creators;

export default function ViewRouteAttribute() {
  const dispatch = useDispatch();
  const selectedAnalysis = useSelector(
    state => state.routeAnalysis.results.selectedAnalysis,
  );
  const individualAnalysisData = useSelector(
    state => state.routeAnalysis.results.individualAnalysisData,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ANALYSIS_DATA_REQUEST]),
  );

  useEffect(() => {
    if (!selectedAnalysis) return;
    dispatch(getAnalysisDataRequest({ analysis: selectedAnalysis.id }));
  }, [dispatch, selectedAnalysis]);

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-y-2 naxatw-w-full naxatw-h-full">
      <div className="naxa-table naxatw-overflow-x-auto  scrollbar naxatw-relative  naxatw-w-full naxatw-max-h-[calc(100vh-25rem)] naxatw-min-h-[calc(100vh-25rem)]">
        {loading ? (
          <TableSkeleton itemNumber={5} />
        ) : (
          <Table
            data={individualAnalysisData || []}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            headerWidths={['10px']}
          >
            <TableHeader
              dataField="SN"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataFormat={(row, _, index) => (
                <p className="naxatw-overflow-ellipsis naxatw-w-[150px] naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg naxatw-p-3">
                  {index + 1}
                </p>
              )}
            />
            <TableHeader
              dataField="Name"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <p className="naxatw-overflow-ellipsis naxatw-w-[150px] naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg">
                  {`Route ${row.route_no}` || '-'}
                </p>
              )}
            />
            <TableHeader
              dataField="Length (in meter)"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-2.5"
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <p className="naxatw-overflow-ellipsis naxatw-w-[150px] naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg">
                  {row.length || '-'}
                </p>
              )}
            />
            <TableHeader
              dataField="Travel Time (in seconds)"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <p className="naxatw-overflow-ellipsis naxatw-w-[150px] naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg">
                  {row.travel_time || '-'}
                </p>
              )}
            />
            <TableHeader
              dataField="Is Optimal?"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <p className="naxatw-overflow-ellipsis naxatw-w-[150px] naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg">
                  <i
                    className="material-symbols-outlined"
                    style={{ color: row.is_optimum ? '#40B449' : '#FF0F0F' }}
                  >
                    {row.is_optimum ? 'check_circle' : 'cancel'}
                  </i>
                </p>
              )}
            />
          </Table>
        )}
      </div>
    </div>
  );
}
