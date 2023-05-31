/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '@Components/common/Select/index';
import { useCurrentPng } from 'recharts-to-png';
import Button from '@Components/common/Button';
import { Creators } from '@Actions/proximityAnalysis';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Text,
} from 'recharts';
import { saveAs } from 'file-saver';

const { setProximityAnalysisState } = Creators;

const ViewBufferChart = () => {
  const dispatch = useDispatch();
  const [getPng, { ref }] = useCurrentPng();

  const [chartData, setChartData] = useState([]);

  const analysisResults = useSelector(
    state => state.proximityAnalysis.results.analysisResults,
  );
  const poiLayersData = useSelector(state => state.proximityAnalysis.poiLayers);
  const categoryListData = useSelector(
    state => state.proximityAnalysis.detailsCategory.data,
  );

  const detailsChartData = useSelector(
    state => state.proximityAnalysis.detailsChartData,
  );

  const selectedResultsId = useSelector(
    state => state.proximityAnalysis.results.selectedResultId,
  );

  const selectedResultData = analysisResults.results.find(
    result => result.id === selectedResultsId,
  );
  const poiLayersDataOptions = poiLayersData.filter(data =>
    selectedResultData?.poiChartData.map(itm => itm.name).includes(data.name),
  );
  const selectedLayer = useSelector(
    state => state.proximityAnalysis.selectedLayer,
  );
  const selectedCategory = useSelector(
    state => state.proximityAnalysis.selectedCategory,
  );

  const selectedPOIName = poiLayersDataOptions.filter(
    data => data.id === selectedLayer,
  )?.[0]?.name;

  useEffect(() => {
    if (Object.keys(detailsChartData)?.length === 0) return;
    const tempChartData = [];
    const newD = detailsChartData?.data;

    Object.entries(newD)?.map(([key, value]) => {
      tempChartData.push({ name: key, value });
    });

    setChartData(tempChartData);
  }, [detailsChartData]);

  const CustomXAxisTick = ({ x, y, payload }) => {
    if (payload && payload.value) {
      return (
        <Text
          fontSize="12px"
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

  const handleChartExport = React.useCallback(async () => {
    const png = await getPng();
    if (png) {
      saveAs(png, `${selectedPOIName}.png`);
    }
  }, [getPng, selectedPOIName]);

  return (
    <div>
      <div className="naxatw-flex naxatw-justify-end naxatw-items-center naxatw-gap-x-2">
        <div className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
          <div className="naxatw-space-y-2">
            <Select
              options={poiLayersDataOptions}
              onChange={selected => {
                dispatch(
                  setProximityAnalysisState({
                    selectedLayer: selected.id,
                  }),
                );
                dispatch(setProximityAnalysisState({ selectedCategory: null }));
                dispatch(
                  setProximityAnalysisState({
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
            <Select
              options={categoryListData}
              onChange={selected =>
                dispatch(
                  setProximityAnalysisState({
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
        <Button
          className="naxatw-btn-secondary naxatw-btn-noborder"
          onClick={handleChartExport}
        >
          Export Chart
        </Button>
      </div>

      <div className="naxatw-w-full naxatw-h-full naxatw-flex naxatw-justify-center">
        <BarChart
          ref={ref}
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
            <Label
              value="Category"
              offset={10}
              position="bottom"
              style={{
                textAnchor: 'middle',
                fontSize: '120%',
                fill: 'rgba(0, 0, 0, 0.87)',
              }}
            />
          </XAxis>
          <YAxis allowDecimals={false}>
            <Label
              value={`No of ${selectedPOIName}`}
              angle={-90}
              position="insideLeft"
              style={{
                textAnchor: 'middle',
                fontSize: '120%',
                fill: 'rgba(0, 0, 0, 0.87)',
              }}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default ViewBufferChart;
