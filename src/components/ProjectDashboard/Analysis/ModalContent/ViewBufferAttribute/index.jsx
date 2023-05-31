/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/bufferAnalysis';
import Table, { TableHeader } from '@Components/common/CustomTable';
import '@Components/OrganizationDashboard/User/Users/index.css';
import TableSkeleton from '@Components/common/TableSkeleton';
import { checkIfLoading } from '@Utils/loaderSelector';

const { getAnalysisDataRequest } = Creators;

export default function ViewBufferAttribute() {
  const { analysisType } = useParams();
  const dispatch = useDispatch();
  const selectedAnalysis = useSelector(
    state => state.bufferAnalysis.results.selectedAnalysis,
  );
  const individualAnalysisData = useSelector(
    state => state.bufferAnalysis.results.individualAnalysisData,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ANALYSIS_DATA_REQUEST]),
  );

  useEffect(() => {
    if (!selectedAnalysis) return;
    dispatch(
      getAnalysisDataRequest({ buffer_analysis_id: selectedAnalysis.id }),
    );
  }, [dispatch, selectedAnalysis]);

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-y-2 naxatw-w-full naxatw-h-full">
      <div
        className="naxa-table naxatw-overflow-x-auto scrollbar naxatw-relative
          naxatw-w-full naxatw-max-h-[calc(100vh-25rem)] naxatw-min-h-[14rem]"
      >
        {loading ? (
          <TableSkeleton itemNumber={5} />
        ) : (
          <Table
            data={individualAnalysisData?.results || []}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            headerWidths={['100px', '200px', '200px']}
          >
            <TableHeader
              dataField="ID"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <p className="naxatw-overflow-ellipsis naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg naxatw-p-3">
                  {row.id || '-'}
                </p>
              )}
            />
            <TableHeader
              dataField="Area (meter square)"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <p className="naxatw-overflow-ellipsis naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg">
                  {row.area?.toFixed(2) || '-'}
                </p>
              )}
            />
            {/* <TableHeader
              dataField="Id"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-2.5"
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <p className="naxatw-overflow-ellipsis naxatw-w-[150px] naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg">
                  {row.id || '-'}
                </p>
              )}
            />
            <TableHeader
              dataField="Origin"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataFormat={row => (
                <p className="naxatw-overflow-ellipsis naxatw-w-[150px] naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg">
                  {row.origin || '-'}
                </p>
              )}
            /> */}
            {analysisType === 'proximity-analysis' && (
              <TableHeader
                dataField="No. of POI"
                headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
                rowcolSpan="rowSpan_2"
                dataFormat={row => {
                  const totalPoi = row.poi.reduce(
                    (sum, item) => sum + item.count,
                    0,
                  );
                  return (
                    <p className="naxatw-overflow-ellipsis naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-text-body-lg">
                      {totalPoi}
                    </p>
                  );
                }}
              />
            )}
          </Table>
        )}
      </div>
    </div>
  );
}
