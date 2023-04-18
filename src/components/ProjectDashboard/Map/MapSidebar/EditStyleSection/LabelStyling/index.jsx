import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import {
  pointTypes,
  lineTypes,
} from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import Select from '@Components/common/Select';
import Toggle from '@Components/common/Toggle';
import Input from '../../InputComponents/Input';
import RangeSlider from '../../InputComponents/RangeSlider';

const { handleStyleInput, getLabelFieldOptionsRequest } = ProjectMapCreators;

export default function LabelStyling() {
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const labelFields = useSelector(state => state.projectMap.labelFields);
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
    showLabel,
    labelField,
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

  useEffect(() => {
    if (!showLabel || labelFields) return;
    dispatch(getLabelFieldOptionsRequest({ layer: selectedLayer.id }));
  }, [dispatch, showLabel, selectedLayer, labelFields]);

  const hasIcon = !!icon.id;

  if (hasIcon) {
    return (
      <p className="naxatw-px-2 naxatw-text-delete_btn naxatw-text-body-md">
        Remove Icon to enable advance styling.
      </p>
    );
  }

  console.log(labelField, 'labelFieldx');

  return (
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-4">
      <div className="naxatw-flex naxatw-justify-between">
        <label className="naxatw-label">Show Legend</label>
        <Toggle
          checked={showLabel}
          name="showLabel"
          onChange={e => {
            const { name, checked } = e.target;
            dispatch(
              handleStyleInput({
                name,
                value: checked,
              }),
            );
          }}
        />
      </div>

      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Label Field</label>
        <Select
          options={labelFields || []}
          placeholder="Choose"
          selectedValue={
            labelFields?.find(item => item.name === labelField)?.id
          }
          labelKey="name"
          valueKey="id"
          onChange={selectedItem => {
            dispatch(
              handleStyleInput({
                name: 'labelField',
                value: selectedItem.name,
              }),
            );
          }}
        />
      </div>
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
