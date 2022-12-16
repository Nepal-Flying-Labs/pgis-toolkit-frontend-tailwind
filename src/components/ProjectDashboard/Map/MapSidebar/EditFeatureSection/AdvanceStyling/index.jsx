import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import {
  lineTypes,
  pointTypes,
} from '@Components/common/OpenLayersComponent/Legend/LegendItem';
import Input from '../../InputComponents/Input';
import RangeSlider from '../../InputComponents/RangeSlider';

const { handleStyleInput } = ProjectMapCreators;

export default function AdvanceStyling() {
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const dispatch = useDispatch();
  const [layerStyle, handleChange] = useDebouncedInput({
    ms: 70,
    init: selectedLayer.style,
    onChange: debouncedEvent => {
      const { name, value } = debouncedEvent.target;
      dispatch(
        handleStyleInput({
          name,
          value,
        }),
      );
    },
  });

  const {
    lineColor,
    fillColor,
    lineOpacity,
    fillOpacity,
    lineThickness,
    dashline,
    circleRadius,
    geometryType,
  } = layerStyle;

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-4">
      {lineTypes.includes(geometryType) && (
        <Input
          type="color"
          name="fillColor"
          label="Fill Color"
          value={fillColor}
          onChange={handleChange}
        />
      )}

      <Input
        type="color"
        name="lineColor"
        label="Line Color"
        value={lineColor}
        onChange={handleChange}
      />

      {lineTypes.includes(geometryType) && (
        <RangeSlider
          name="fillOpacity"
          label="Fill Opacity"
          value={fillOpacity}
          onChange={handleChange}
        />
      )}

      <RangeSlider
        name="lineOpacity"
        label="Line Opacity"
        value={lineOpacity}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="lineThickness"
        label="Line thickness"
        value={lineThickness}
        onChange={handleChange}
      />

      {pointTypes.includes(geometryType) && (
        <RangeSlider
          name="dashline"
          label="Dash Line"
          value={dashline}
          onChange={handleChange}
        />
      )}

      {pointTypes.includes(geometryType) && (
        <Input
          type="number"
          name="circleRadius"
          label="Radius"
          value={circleRadius}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
