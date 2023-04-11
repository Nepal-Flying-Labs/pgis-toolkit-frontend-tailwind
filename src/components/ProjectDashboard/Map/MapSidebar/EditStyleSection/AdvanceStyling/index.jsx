import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import {
  pointTypes,
  lineTypes,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
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
    icon,
  } = layerStyle;

  const hasIcon = !!icon.id;

  if (hasIcon) {
    return (
      <p className="naxatw-px-2 naxatw-text-delete_btn naxatw-text-body-md">
        Remove Icon to enable advance styling
      </p>
    );
  }

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-4">
      {!lineTypes.includes(geometryType) && (
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

      {!lineTypes.includes(geometryType) && (
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
        min={1}
        max={100}
        label="Line thickness"
        value={lineThickness}
        onChange={handleChange}
      />

      {!pointTypes.includes(geometryType) && (
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
          min={1}
          max={100}
          value={circleRadius}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
