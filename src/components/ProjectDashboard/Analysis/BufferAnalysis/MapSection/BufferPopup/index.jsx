/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/bufferAnalysis';
import { Creators as CommonCreators } from '@Actions/common';
import { useParams } from 'react-router';
import IconButton from '@Components/common/IconButton';
import RoutePopupSkeleton from '@Components/common/SkeletonLoader/RoutePopupSkeleton';
import { checkIfLoading } from '@Utils/loaderSelector';
import { VerticalBlockChart } from '@Components/common/VerticleAndHorizontalBlockChart';
import Chip from '@Components/common/Chip';
import Select from '@Components/common/Select';
import Button from '@Components/common/Button';
import meterToKM from '@Utils/meterToKM';
import { isEmpty } from '@Utils/commonUtils';
import { saveAs } from 'file-saver';
import XLSX from 'sheetjs-style';
import Spinner from '@Components/common/Spinner/index';
import { chartDataSelector } from '@Selectors/bufferAnalysis';

const calTotalCount = (data, dataKey) => {
  const values = data.map(d => +d?.[dataKey]);
  return values.reduce((item, value) => item + value, 0);
};

function getOriginPoint(origin) {
  const [lat, long] = origin;
  return `${lat.toFixed(3)} - ${long.toFixed(3)}`;
}

const {
  getDetailsCategoryRequest,
  getDetailsChartRequest,
  setPopupActiveTab,
  setResultsState,
  setBufferAnalysisState,
} = Creators;

const { toggleModal } = CommonCreators;

export default function BufferPopup() {
  const { analysisType } = useParams();
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
  const selectedLayer = useSelector(
    state => state.bufferAnalysis.selectedLayer,
  );
  const selectedCategory = useSelector(
    state => state.bufferAnalysis.selectedCategory,
  );

  const isListLoading = useSelector(state =>
    checkIfLoading(state, [Types.GET_DETAILS_CHART_REQUEST]),
  );

  const verticalChartData = useSelector(chartDataSelector);

  // const originPoints = selectedResultData?.inputQuery.origins;
  const bufferRadius = selectedResultData?.inputQuery.radius;
  const selectedPOI = selectedResultData?.inputQuery.selectedPOIName;

  const poiLayersDataOptions = poiLayersData.filter(data =>
    selectedResultData?.poiChartData.map(itm => itm.name).includes(data.name),
  );

  // const originCount = selectedResultData?.buffer_areas?.reduce(
  //   (total, item) => total + item.origin?.length,
  //   0,
  // );

  const poiCount = calTotalCount(verticalChartData.poiChartData, 'count');

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ROUTE_POPUP_DATA_REQUEST]),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (popupActiveTab === 'Details' && isEmpty(detailsListData)) {
      dispatch(
        getDetailsChartRequest({
          analysis: selectedResultsId,
          view: 'list',
        }),
      );
    }
    return () => {};
  }, [detailsListData, dispatch, popupActiveTab, selectedResultsId]);

  useEffect(() => {
    if (selectedLayer !== null) {
      dispatch(
        getDetailsCategoryRequest({
          layer: selectedLayer,
        }),
      );
    }
    return () => {};
  }, [dispatch, selectedLayer]);

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
    }
    return () => {};
  }, [dispatch, selectedCategory, selectedLayer, selectedResultsId]);

  useEffect(() => {
    if (isEmpty(poiLayersDataOptions)) return;
    if (poiLayersDataOptions.length === 1) {
      dispatch(
        setBufferAnalysisState({ selectedLayer: poiLayersDataOptions[0].id }),
      );
    }
  }, [dispatch, poiLayersDataOptions]);

  const handleExcelExport = async () => {
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
      saveAs(newData, `results${fileExtension}`);
    }
  };

  function displayArrayList(list) {
    const listData = list.map(item => item);
    const finalName = listData?.pop();
    return listData.length
      ? `${listData.join(', ')} & ${finalName}`
      : finalName;
  }

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
                  selectedCategory: null,
                  selectedLayer: null,
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
              {analysisType === 'proximity-analysis' && (
                <>
                  <Chip
                    label="Charts"
                    active={popupActiveTab === 'Charts'}
                    onClick={() => dispatch(setPopupActiveTab('Charts'))}
                  />
                  <Chip
                    label="Details"
                    active={popupActiveTab === 'Details'}
                    onClick={() => dispatch(setPopupActiveTab('Details'))}
                  />
                </>
              )}
            </div>

            <div className="naxatw-btn-text naxatw-mt-7 naxatw-mb-2">
              {popupActiveTab === 'Summary' ? (
                analysisType === 'proximity-analysis' ? (
                  <div className="naxatw-flex naxatw-flex-col naxatw-px-2 naxatw-gap-3">
                    <div className="naxatw-flex naxatw-justify-between naxatw-py-2">
                      <div className="naxatw-basis-1/2">
                        <p className="naxatw-text-body-lg naxatw-text-center">
                          Origin Count
                        </p>
                        <p className="naxatw-text-body-lg naxatw-font-bold naxatw-text-center">
                          {verticalChartData.originCount || '-'}
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
                    {!isEmpty(verticalChartData.poiChartData) && (
                      <>
                        <hr className="naxatw-mb-3" />
                        <VerticalBlockChart
                          data={verticalChartData.poiChartData}
                          dataKey="count"
                        />

                        <hr className="naxatw-mb-3" />
                      </>
                    )}

                    <div className="naxatw-flex naxatw-flex-col  naxatw-space-y-2">
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
                          {displayArrayList(selectedPOI) || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="naxatw-flex naxatw-flex-col naxatw-px-2 naxatw-gap-3">
                    <div className="naxatw-flex naxatw-justify-between naxatw-py-2">
                      <div className="naxatw-basis-1/2">
                        <p className="naxatw-text-body-lg naxatw-text-center">
                          Origin Count
                        </p>
                        <p className="naxatw-text-body-lg naxatw-font-bold naxatw-text-center">
                          {verticalChartData.originCount || '-'}
                        </p>
                      </div>
                      <div className="naxatw-basis-1/2">
                        <p className="naxatw-text-body-lg naxatw-text-center">
                          Buffer Radius
                        </p>
                        <p className="naxatw-text-body-lg naxatw-font-bold naxatw-text-center">
                          {meterToKM(bufferRadius) || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ) : popupActiveTab === 'Charts' ? (
                <>
                  <div className="naxatw-space-y-3">
                    <div className="naxatw-space-y-2">
                      <label className="naxatw-label">Select Layer*</label>
                      <Select
                        options={poiLayersDataOptions}
                        onChange={selected => {
                          dispatch(
                            setBufferAnalysisState({
                              selectedLayer: selected.id,
                            }),
                          );
                          dispatch(
                            setBufferAnalysisState({ selectedCategory: null }),
                          );
                          dispatch(
                            setBufferAnalysisState({
                              detailsCategory: [],
                              detailsChartData: {},
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
                          dispatch(
                            setBufferAnalysisState({
                              selectedCategory: selected.name,
                            }),
                          )
                        }
                        selected={selectedCategory}
                        labelKey="name"
                        valueKey="name"
                      />
                    </div>
                  </div>

                  {!isEmpty(detailsChartData) && (
                    <div className="naxatw-flex naxatw-justify-end naxatw-gap-x-3 naxatw-items-center naxatw-mt-4">
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder"
                        onClick={() =>
                          dispatch(toggleModal('view-buffer-chart'))
                        }
                      >
                        View Chart
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <div className="naxatw-mt-5 naxatw-max-h-[15rem] naxatw-overflow-y-auto scrollbar naxatw-pr-2 naxatw-shadow-inner">
                    {isListLoading ? (
                      <div className="naxatw-h-[15rem] naxatw-flex naxatw-justify-center naxatw-items-center">
                        <Spinner className="!naxatw-w-10 !naxatw-h-10 naxatw-fill-grey-800" />
                      </div>
                    ) : (
                      detailsListData?.data
                        ?.sort((a, b) => a.buffer_distance - b.buffer_distance)
                        .map(itm => (
                          <div className="naxatw-py-2 naxatw-border-b-2">
                            <div className="naxatw-flex naxatw-gap-x-3 naxatw-items-center">
                              <p className="naxatw-text-body-btn naxatw-basis-1/2">
                                {itm?.name || itm?.id}
                              </p>
                              <span
                                className="naxatw-font-bold naxatw-basis-1/2 naxatw-truncate"
                                title={itm.layer}
                              >
                                {itm.layer}
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
                                <p className="naxatw-text-body-md">
                                  Origin Point
                                </p>
                                <p className="naxatw-text-body-md naxatw-mt-1">
                                  {getOriginPoint(itm.origin[0])}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                  {!isEmpty(detailsListData) && (
                    <div className="naxatw-flex naxatw-justify-between naxatw-gap-x-3 naxatw-items-center naxatw-mt-4">
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder"
                        onClick={() => handleExcelExport()}
                      >
                        Export Excel
                      </Button>

                      <Button
                        className="naxatw-btn-secondary naxatw-btn-noborder"
                        onClick={() =>
                          dispatch(toggleModal('view-analysis-details'))
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
