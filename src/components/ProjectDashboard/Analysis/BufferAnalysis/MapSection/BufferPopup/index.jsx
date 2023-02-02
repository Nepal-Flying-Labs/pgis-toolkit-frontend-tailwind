import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/bufferAnalysis';
// import RouteAnalysisActions from '@Actions/bufferAnalysis';
import IconButton from '@Components/common/IconButton';
import RoutePopupSkeleton from '@Components/common/SkeletonLoader/RoutePopupSkeleton';
import { checkIfLoading } from '@Utils/loaderSelector';
import { VerticalBlockChart } from '@Components/common/VerticleAndHorizontalBlockChart';
import Chip from '@Components/common/Chip';
import Select from '@Components/common/Select';
import Modal from '@Components/common/Modal';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from 'recharts';
import meterToKM from '@Utils/meterToKM';

const {
  getDetailsCategoryRequest,
  getDetailsChartRequest,
  setPopupActiveTab,
  setResultsState,
  setBufferAnalysisState,
} = Creators;

export default function BufferPopup() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState([]);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const analysisResults = useSelector(
    state => state.bufferAnalysis.results.analysisResults,
  );
  const poiLayersData = useSelector(state => state.bufferAnalysis.poiLayers);
  const categoryListData = useSelector(
    state => state.bufferAnalysis.detailsCategory.data,
  );
  const popupActiveTab = useSelector(
    state => state.bufferAnalysis.popupActiveTab,
  );

  const detailsChartData = useSelector(
    state => state.bufferAnalysis.detailsChartData,
  );
  const detailsListData = useSelector(
    state => state.bufferAnalysis.detailsListData,
  );

  const selectedResultsId = useSelector(
    state => state.bufferAnalysis.results.selectedResultId,
  );

  const selectedResultData = analysisResults.find(
    result => result.id === selectedResultsId,
  );

  const originCount = selectedResultData?.buffer_areas?.reduce(
    (total, item) => total + item.origin?.length,
    0,
  );

  const poiCount = selectedResultData?.poiChartData?.length;

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ROUTE_POPUP_DATA_REQUEST]),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedLayer !== null) {
      dispatch(
        getDetailsCategoryRequest({
          analysis: selectedResultsId,
          layer: selectedLayer,
          view: 'chart',
        }),
      );
    }
    return () => {};
  }, [selectedLayer]);
  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(
        getDetailsChartRequest({
          analysis: selectedResultsId,
          layer: selectedLayer,
          view: 'chart',
          field: selectedCategory,
        }),
      );
      dispatch(
        getDetailsChartRequest({
          analysis: selectedResultsId,
          layer: selectedLayer,
          view: 'list',
          field: selectedCategory,
        }),
      );
    }
    return () => {};
  }, [selectedCategory]);

  useEffect(() => {
    if (Object.keys(detailsChartData)?.length === 0) return;
    const tempChartData = [];
    const newD = detailsChartData?.data;

    Object.entries(newD)?.map(([key, value]) => {
      tempChartData.push({ name: key, value: value });
    });

    setChartData(tempChartData);
  }, [detailsChartData]);

  const CustomXAxisTick = ({ x, y, payload }) => {
    if (payload && payload.value) {
      return (
        <Text
          fontSize={'12px'}
          width={'12px'}
          x={x}
          y={y}
          textAnchor="middle"
          verticalAnchor="start"
        >
          {payload.value}
        </Text>
      );
    }
    return null;
  };

  return (
    <div
      className="naxatw-absolute naxatw-top-4 naxatw-right-4  naxatw-z-10
        naxatw-bg-white naxatw-text-grey-800 naxatw-rounded-[20px] naxatw-border naxatw-border-grey-300 
        naxatw-shadow-3xl naxatw-w-[20.3rem]"
    >
      <div className="naxatw-px-5 naxatw-py-3.5 naxatw-flex naxatw-items-center naxatw-justify-between naxatw-rounded-t-[20px]">
        <h4>{selectedResultData?.name || '-'} </h4>
        <div className="naxatw-flex naxatw-items-center">
          <IconButton
            name="close"
            onClick={() => {
              dispatch(setResultsState({ showResultsPopup: false }));
              dispatch(
                setBufferAnalysisState({
                  popupActiveTab: 'Summary',
                  detailsCategory: [],
                  detailsChartData: {},
                  detailsListData: [],
                }),
              );
            }}
          />
        </div>
      </div>

      <div
        className="naxatw-px-5 naxatw-pb-3.5  naxatw-text-body-md"
        // style={{
        //   maxHeight: `calc(100vh - ${projectHeaderHeight}px - 14rem)`,
        // }}
      >
        {loading ? (
          <RoutePopupSkeleton />
        ) : (
          <>
            <div className="naxatw-flex naxatw-gap-1">
              <Chip
                label="Summary"
                active={popupActiveTab === 'Summary'}
                onClick={() => dispatch(setPopupActiveTab('Summary'))}
              />
              <Chip
                label="Details"
                active={popupActiveTab === 'Details'}
                onClick={() => dispatch(setPopupActiveTab('Details'))}
              />
            </div>

            <p className="naxatw-btn-text naxatw-mt-7 naxatw-mb-2">
              {popupActiveTab === 'Summary' ? (
                <div className="naxatw-flex naxatw-flex-col naxatw-px-2 naxatw-gap-3">
                  {/* <ul className="naxatw-flex naxatw-flex-col naxatw-gap-2">
                    {graphData?.map(itm => (
                      <li className="naxatw-flex naxatw-justify-between">
                        <span className="naxatw-text-body-lg">{itm?.key}</span>
                        <span className="naxatw-text-body-lg">
                          {itm?.value}
                        </span>
                      </li>
                    ))}
                  </ul> */}
                  {/* <div className="naxatw-flex naxatw-gap-0 naxatw-w-full naxatw-h-5">
                    {graphData?.map((itm, index) => {
                      const pWidth = parseInt(
                        calPercentage(itm?.[dataKey], data, dataKey),
                        10,
                      );
                      return (
                        <span
                          className="naxatw-h-full naxatw-border-0 first:naxatw-rounded-tl-lg first:naxatw-rounded-bl-lg last:naxatw-rounded-tr-lg last:naxatw-rounded-br-lg "
                          style={{
                            width: `${pWidth}%`,
                            backgroundColor: `${colorCode[index]}`,
                          }}
                        />
                      );
                    })}
                  </div> */}
                  <div className="naxatw-flex naxatw-justify-between naxatw-py-2">
                    <div className="naxatw-basis-1/2">
                      <p className="naxatw-text-body-lg naxatw-text-center">
                        Origin Count
                      </p>
                      <p className="naxatw-text-body-lg naxatw-font-bold naxatw-text-center">
                        {originCount || '-'}
                      </p>
                    </div>
                    <div className="naxatw-basis-1/2">
                      <p className="naxatw-text-body-lg naxatw-text-center">
                        POI Count
                      </p>
                      <p className="naxatw-text-body-lg naxatw-font-bold naxatw-text-center">
                        {poiCount || '-'}
                      </p>
                    </div>
                  </div>
                  <hr className="naxatw-mb-3" />
                  <VerticalBlockChart
                    data={
                      analysisResults.filter(
                        result => result.id === selectedResultsId,
                      )[0]?.poiChartData
                    }
                    dataKey="count"
                  />
                </div>
              ) : (
                <>
                  <div className="naxatw-space-y-3">
                    <div className="naxatw-space-y-2">
                      <label className="naxatw-label">Select Layer*</label>
                      <Select
                        options={poiLayersData}
                        onChange={selected => {
                          setSelectedLayer(selected.id);
                          setSelectedCategory(null);
                          dispatch(
                            setBufferAnalysisState({
                              detailsCategory: [],
                              detailsChartData: {},
                              detailsListData: [],
                            }),
                          );
                        }}
                        selectedValue={selectedLayer}
                        labelKey="name"
                        valueKey="id"
                      />
                    </div>
                    <div className="naxatw-space-y-2">
                      <label className="naxatw-label">Select Category*</label>
                      <Select
                        options={categoryListData}
                        onChange={selected =>
                          setSelectedCategory(selected.name)
                        }
                        selected={selectedCategory}
                        labelKey="name"
                        valueKey="name"
                      />
                    </div>
                  </div>

                  <div className="naxatw-mt-5 naxatw-max-h-[10rem] naxatw-overflow-y-auto scrollbar naxatw-pr-2 naxatw-shadow-inner">
                    {/* <div>{selectedCategory}</div> */}
                    {detailsListData?.data?.map(itm => (
                      <div className="naxatw-py-2 naxatw-border-b-2">
                        <div className="naxatw-flex naxatw-justify-between">
                          <p className="naxatw-text-body-btn">
                            {itm?.name || itm?.id}
                          </p>
                          <span>{itm[selectedCategory]}</span>
                        </div>
                        <div className="naxatw-flex naxatw-gap-x-3 naxatw-mt-2">
                          <div className="naxatw-basis-1/2">
                            <p className="naxatw-text-body-md">
                              Buffer Distance
                            </p>
                            <p className="naxatw-text-body-lg naxatw-mt-1">
                              {meterToKM(itm?.buffer_distance?.toFixed(2))}
                            </p>
                          </div>
                          <div className="naxatw-basis-1/2">
                            <p className="naxatw-text-body-md">Origin Point</p>
                            <p className="naxatw-text-body-lg naxatw-mt-1">-</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="naxatw-flex naxatw-justify-end naxatw-mt-4">
                    <span
                      className="naxatw-text-gray-800  naxatw-px-1 naxatw-cursor-pointer naxatw-border-white naxatw-border-b-[1px] hover:naxatw-border-gray-800"
                      onClick={() => setShowChart(true)}
                    >
                      Chart View
                    </span>
                  </div>
                </>
              )}
            </p>

            <Modal
              show={showChart}
              title="Chart"
              onClose={() => setShowChart(false)}
              zIndex="111111"
              className="naxatw-w-[62rem]"
            >
              <div className="naxatw-w-full naxatw-h-full naxatw-flex naxatw-justify-center">
                <BarChart
                  width={800}
                  height={560}
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 40,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="name" interval={0} tick={CustomXAxisTick} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]} />
                </BarChart>
              </div>
            </Modal>

            {/* <div className="naxatw-grid naxatw-grid-cols-3 naxatw-items-center naxatw-gap-2.5">
              {routePopupData?.obstacles?.map(item => (
                <React.Fragment key={item.layer_id}>
                  <p>{item.layer_name}</p>
                  <p>{item.count}</p>
                  <Toggle
                    isSm
                    className="naxatw-ml-auto"
                    checked={item.checked}
                    onChange={e => {
                      dispatch(
                        handleObstaclesToggle({
                          layerId: item.layer_id,
                          checked: e.target.checked,
                        }),
                      );
                    }}
                  />
                </React.Fragment>
              ))}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
