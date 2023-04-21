import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import { pointTypes } from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import {
  fontOptions,
  labelAlignOptions,
  labelBaselineOptions,
  labelFontWeightOptions,
  labelMaxAngleDegreeOptions,
  labelOverflowOptions,
  labelPlacementOptions,
  maxResolutionOptions,
  textOptions,
} from '@Components/common/OpenLayersComponent/helpers/options-data';
import Select from '@Components/common/Select';
import Toggle from '@Components/common/Toggle';
import Input from '../../InputComponents/Input';
import RangeSlider from '../../InputComponents/RangeSlider';

const {
  handleStyleInput,
  getLabelFieldOptionsRequest,
  updateLabelFieldRequest,
} = ProjectMapCreators;

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
    geometryType,
    showLabel,
    labelField,
    labelFont,
    labelFontSize,
    labelColor,
    labelOpacity,
    labelOutlineColor,
    labelOutlineWidth,
    labelOffsetX,
    labelOffsetY,
    labelText,
    labelMaxResolution,
    labelAlign,
    labelBaseline,
    labelRotationDegree,
    labelFontWeight,
    labelPlacement,
    labelMaxAngleDegree,
    labelOverflow,
    labelLineHeight,
  } = layerStyle;

  useEffect(() => {
    if (!showLabel || labelFields) return;
    dispatch(getLabelFieldOptionsRequest({ layer: selectedLayer.id }));
  }, [dispatch, showLabel, selectedLayer, labelFields]);

  const handleLabelFieldSelect = selectedItem => {
    dispatch(
      handleStyleInput({
        name: 'labelField',
        value: selectedItem.name,
        // value: 'label',
      }),
    );
    const data = {
      style: selectedLayer.style,
      show_label: true,
      label_field: selectedItem.name,
    };
    dispatch(updateLabelFieldRequest(selectedLayer.id, data));
  };

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

      {showLabel && (
        <>
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
              onChange={handleLabelFieldSelect}
            />
          </div>

          {labelField && (
            <>
              <RangeSlider
                name="labelOpacity"
                label="Opacity"
                value={labelOpacity}
                onChange={handleChange}
              />

              <div className="naxatw-space-y-2">
                <label className="naxatw-label">Font</label>
                <Select
                  options={fontOptions}
                  placeholder="Choose"
                  selectedValue={labelFont}
                  labelKey="label"
                  valueKey="value"
                  onChange={({ value }) => {
                    dispatch(
                      handleStyleInput({
                        name: 'labelFont',
                        value,
                      }),
                    );
                  }}
                />
              </div>

              <Input
                type="number"
                name="labelFontSize"
                label="Font Size"
                value={labelFontSize}
                onChange={handleChange}
              />

              <Input
                name="labelColor"
                className="color-select"
                type="color"
                label="Font Color"
                value={labelColor}
                onChange={handleChange}
              />

              <Input
                type="number"
                name="labelOutlineWidth"
                label="Halo"
                value={labelOutlineWidth}
                onChange={handleChange}
              />

              <Input
                type="color"
                name="labelOutlineColor"
                className="color-select"
                label="Halo Color"
                value={labelOutlineColor}
                onChange={handleChange}
              />

              <Input
                type="number"
                name="labelOffsetX"
                label="Offset X"
                value={labelOffsetX}
                onChange={handleChange}
              />

              <Input
                type="number"
                name="labelOffsetY"
                label="Offset Y"
                value={labelOffsetY}
                onChange={handleChange}
              />

              <div className="naxatw-space-y-2">
                <label className="naxatw-label">Text</label>
                <Select
                  options={textOptions}
                  placeholder="Text"
                  selectedValue={labelText}
                  labelKey="label"
                  valueKey="value"
                  onChange={({ value }) => {
                    dispatch(
                      handleStyleInput({
                        name: 'labelText',
                        value,
                      }),
                    );
                  }}
                />
              </div>

              <div className="naxatw-space-y-2">
                <label className="naxatw-label">Max. Resolution</label>
                <Select
                  options={maxResolutionOptions}
                  placeholder="Max.Reso"
                  selectedValue={labelMaxResolution}
                  labelKey="label"
                  valueKey="value"
                  onChange={({ value }) => {
                    dispatch(
                      handleStyleInput({
                        name: 'labelMaxResolution',
                        value,
                      }),
                    );
                  }}
                />
              </div>

              <div className="naxatw-space-y-2">
                <label className="naxatw-label">Align</label>
                <Select
                  options={labelAlignOptions}
                  placeholder="Align"
                  labelKey="label"
                  valueKey="value"
                  selectedValue={labelAlign}
                  onChange={({ value }) => {
                    dispatch(
                      handleStyleInput({
                        name: 'labelAlign',
                        value,
                      }),
                    );
                  }}
                />
              </div>

              <div className="naxatw-space-y-2">
                <label className="naxatw-label">Baseline</label>
                <Select
                  options={labelBaselineOptions}
                  placeholder="Baseline"
                  labelKey="label"
                  valueKey="value"
                  selectedValue={labelBaseline}
                  onChange={({ value }) => {
                    dispatch(
                      handleStyleInput({
                        name: 'labelBaseline',
                        value,
                      }),
                    );
                  }}
                />
              </div>

              <Input
                type="number"
                name="labelRotationDegree"
                label="Rotation"
                value={labelRotationDegree}
                onChange={handleChange}
              />

              <div className="naxatw-space-y-2">
                <label className="naxatw-label">Font Weight</label>
                <Select
                  options={labelFontWeightOptions}
                  placeholder="Font Weight"
                  labelKey="label"
                  valueKey="value"
                  selectedValue={labelFontWeight}
                  onChange={({ value }) => {
                    dispatch(
                      handleStyleInput({
                        name: 'labelFontWeight',
                        value,
                      }),
                    );
                  }}
                />
              </div>

              {!pointTypes.includes(geometryType) && (
                <>
                  <div className="naxatw-space-y-2">
                    <label className="naxatw-label">Placement</label>
                    <Select
                      options={labelPlacementOptions}
                      placeholder="Placement"
                      labelKey="label"
                      valueKey="value"
                      selectedValue={labelPlacement}
                      onChange={({ value }) => {
                        dispatch(
                          handleStyleInput({
                            name: 'labelPlacement',
                            value,
                          }),
                        );
                      }}
                    />
                  </div>

                  <div className="naxatw-space-y-2">
                    <label className="naxatw-label">Max. Angle</label>
                    <Select
                      options={labelMaxAngleDegreeOptions}
                      placeholder="Max. Angle"
                      labelKey="label"
                      valueKey="value"
                      selectedValue={labelMaxAngleDegree}
                      onChange={({ value }) => {
                        dispatch(
                          handleStyleInput({
                            name: 'labelMaxAngleDegree',
                            value,
                          }),
                        );
                      }}
                    />
                  </div>

                  <div className="naxatw-space-y-2">
                    <label className="naxatw-label">Exceed Length</label>
                    <Select
                      options={labelOverflowOptions}
                      placeholder="Exceed Length"
                      labelKey="label"
                      valueKey="value"
                      selectedValue={labelOverflow}
                      onChange={({ value }) => {
                        dispatch(
                          handleStyleInput({
                            name: 'labelOverflowOptions',
                            value,
                          }),
                        );
                      }}
                    />
                  </div>
                </>
              )}

              <Input
                type="number"
                name="labelLineHeight"
                label="Line Height"
                value={labelLineHeight}
                onChange={handleChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
