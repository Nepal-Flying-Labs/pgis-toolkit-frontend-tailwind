import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/bufferAnalysis';
import { useParams } from 'react-router';
// import RouteAnalysisActions from '@Actions/bufferAnalysis';
import IconButton from '@Components/common/IconButton';
import RoutePopupSkeleton from '@Components/common/SkeletonLoader/RoutePopupSkeleton';
import { checkIfLoading } from '@Utils/loaderSelector';
import { VerticalBlockChart } from '@Components/common/VerticleAndHorizontalBlockChart';
import Chip from '@Components/common/Chip';
import Select from '@Components/common/Select';
import Modal from '@Components/common/Modal';
import Button from '@Components/common/Button';
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
  Label,
  Text,
} from 'recharts';
import meterToKM from '@Utils/meterToKM';
import { isEmpty } from '@Utils/commonUtils';
import { saveAs } from 'file-saver';
import XLSX from 'sheetjs-style';

const calTotalCount = (data, dataKey) => {
  const values = data.map(d => +d?.[dataKey]);
  return values.reduce((item, value) => item + value, 0);
};

const {
  getDetailsCategoryRequest,
  getDetailsChartRequest,
  setPopupActiveTab,
  setResultsState,
  setBufferAnalysisState,
} = Creators;

export default function BufferPopup() {
  const { analysisType } = useParams();
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

  const originPoints = selectedResultData?.inputQuery.origins;
  const bufferRadius = selectedResultData?.inputQuery.radius;
  const selectedPOI = selectedResultData?.inputQuery.selectedPOIName;

  const poiLayersDataOptions = poiLayersData.filter(data =>
    selectedResultData?.poiChartData.map(itm => itm.name).includes(data.name),
  );

  const originCount = selectedResultData?.buffer_areas?.reduce(
    (total, item) => total + item.origin?.length,
    0,
  );

  const poiCount = calTotalCount(selectedResultData?.poiChartData, 'count');

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

  useEffect(() => {
    if (isEmpty(poiLayersDataOptions)) return;
    if (poiLayersDataOptions.length === 1) {
      setSelectedLayer(poiLayersDataOptions[0].id);
    }
  }, [poiLayersDataOptions]);

  const selectedPOIName = poiLayersDataOptions.filter(
    data => data.id === selectedLayer,
  )?.[0]?.name;

  const CustomXAxisTick = ({ x, y, payload }) => {
    if (payload && payload.value) {
      return (
        <Text
          fontSize={'12px'}
          width={120}
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

  const handleExcelExport = async fileName => {
    if (!isEmpty(detailsListData)) {
      const { data } = detailsListData;
      // const excelData = JSON.stringify(data);

      const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const newData = new Blob([excelBuffer], { type: fileType });
      saveAs(newData, fileName + fileExtension);
    }
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

            <div className="naxatw-btn-text naxatw-mt-7 naxatw-mb-2">
              {popupActiveTab === 'Summary' ? (
                <div className="naxatw-flex naxatw-flex-col naxatw-px-2 naxatw-gap-3">
                  {/* data input */}

                  {/* count */}
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

                  <hr className="naxatw-mb-3" />

                  <div className="naxatw-flex naxatw-flex-col  naxatw-space-y-2">
                    {/* <h6>Data Input</h6> */}
                    {/* <div className="naxatw-flex naxatw-mt-2">
                      <p className="naxatw-text-body-lg naxatw-basis-1/2">
                        Origin Points
                      </p>
                      <p className="naxatw-text-body-lg naxatw-font-bold naxatw-text-center naxatw-basis-1/2">
                        {originPoints.map(item => {
                          const [long, lat] = item;

                          return (
                            <span
                              key={item}
                              className="naxatw-text-body-lg naxatw-font-bold"
                            >{`(${long.toFixed(2)}, ${lat.toFixed(2)})`}</span>
                          );
                        }) || '-'}
                      </p>
                    </div> */}
                    <div className="naxatw-flex">
                      <p className="naxatw-text-body-lg naxatw-basis-1/2">
                        {analysisType === 'proximity-analysis'
                          ? 'Proximity Radius'
                          : 'Buffer Radius'}
                      </p>
                      <p className="naxatw-text-body-lg naxatw-font-bold naxatw-basis-1/2">
                        {meterToKM(bufferRadius) || '-'}
                      </p>
                    </div>
                    <div className="naxatw">
                      <p className="naxatw-text-body-lg ">Selected POI</p>
                      <p className="naxatw-text-body-lg naxatw-font-bold">
                        {selectedPOI.join(', ') || '-'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="naxatw-space-y-3">
                    <div className="naxatw-space-y-2">
                      <label className="naxatw-label">Select Layer*</label>
                      <Select
                        options={poiLayersDataOptions}
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
                        disabled={poiLayersDataOptions.length === 1}
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
                        <div className="naxatw-flex naxatw-gap-x-3 naxatw-items-center">
                          <p className="naxatw-text-body-btn naxatw-basis-1/2">
                            {itm?.name || itm?.id}
                          </p>
                          <span
                            className="naxatw-font-bold naxatw-basis-1/2 naxatw-truncate"
                            title={itm[selectedCategory]}
                          >
                            {itm[selectedCategory]}
                          </span>
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
                  {!isEmpty(detailsListData) && (
                    <div className="naxatw-flex naxatw-justify-between naxatw-gap-x-3 naxatw-items-center naxatw-mt-4">
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder"
                        onClick={() =>
                          handleExcelExport(
                            poiLayersDataOptions.filter(
                              data => data.id === selectedLayer,
                            )[0].name,
                          )
                        }
                      >
                        Excel Export
                      </Button>

                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder"
                        onClick={() => setShowChart(true)}
                      >
                        Chart View
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            <Modal
              show={showChart}
              title={`${selectedPOIName} Chart`}
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
                  barSize={100}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" interval={0} tick={<CustomXAxisTick />}>
                    <Label value="Category" offset={8} position="bottom" />
                  </XAxis>
                  <YAxis
                    allowDecimals={false}
                    label={{
                      value: `No of ${selectedPOIName}`,
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
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
