import Select from '@Components/common/Select/index';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators, Types } from '@Actions/bufferAnalysis';
import Table, { TableHeader } from '@Components/common/CustomTable';
import { checkIfLoading } from '@Utils/loaderSelector';
import SortingContainer from '@Components/common/SortingContainer/index';
import TableSkeleton2 from '@Components/common/TableSkeleton2/index';

const { getFeatureCollectionRequest } = Creators;

const ViewAnalysisDetails = () => {
  const dispatch = useDispatch();

  const detailsListData = useSelector(
    state => state.bufferAnalysis.detailsListData.data,
  );
  const poiLayersData = useSelector(state => state.bufferAnalysis.poiLayers);
  const poiLayersDataOptions = poiLayersData.filter(data =>
    detailsListData.map(itm => itm.layer_id).includes(data.id),
  );
  const selectedLayerId = detailsListData[0].layer_id;
  const [selectedLayer, setSelectedLayer] = useState(selectedLayerId);
  const filterData = detailsListData.filter(
    data => data.layer_id === selectedLayer,
  );
  const featureId = filterData.map(data => data.id);

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_FEATURE_COLLECTION_REQUEST]),
  );

  const featureList = useSelector(
    state => state.bufferAnalysis.featureCollectionList,
  );

  console.log(featureList, 'feature list');

  const headerKeys = useMemo(
    () => Object.keys(featureList[0] || {}),
    [featureList],
  );

  const headerWidths = [...headerKeys.map(() => '150px')];

  useEffect(() => {
    dispatch(
      getFeatureCollectionRequest({
        layer: selectedLayer,
        ids: featureId.join(','),
      }),
    );
  }, [dispatch, selectedLayer]);

  return (
    <div>
      <div>
        <Select
          options={poiLayersDataOptions}
          onChange={selected => {
            setSelectedLayer(selected.id);
          }}
          selectedValue={selectedLayer}
          labelKey="name"
          valueKey="id"
          disabled={poiLayersDataOptions.length === 1}
        />
      </div>
      <div
        className="naxa-table naxatw-overflow-x-auto scrollbar naxatw-relative 
          naxatw-w-full naxatw-max-h-[calc(100vh-19rem)] naxatw-min-h-[calc(100vh-19rem)]
          xl:naxatw-max-h-[calc(100vh-25rem)] xl:naxatw-min-h-[calc(100vh-25rem)]"
      >
        {loading ? (
          // <TableSkeleton itemNumber={5} />
          <TableSkeleton2 />
        ) : (
          <Table
            data={featureList || []}
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
                    // isActive={ordering === key}
                    // handleSort={() =>
                    //   dispatch(
                    //     handleAttributeOrdering(
                    //       ordering === key ? null : key,
                    //     ),
                    //   )
                    // }
                  />
                }
                dataFormat={row => (
                  <p
                    title={row[key]}
                    className={`naxatw-overflow-ellipsis naxatw-w-[150px] naxatw-whitespace-nowrap naxatw-overflow-hidden naxatw-cursor-default ${
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
          </Table>
        )}
      </div>
    </div>
  );
};

export default ViewAnalysisDetails;
