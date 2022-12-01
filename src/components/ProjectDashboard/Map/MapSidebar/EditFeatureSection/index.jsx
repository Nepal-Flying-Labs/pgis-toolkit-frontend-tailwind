import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import MaterialIcon from '@Components/common/MaterialIcon';
import Button from '@Components/common/Button/index';
import { checkIfLoading } from '@Utils/loaderSelector';
import RangeSlider from '../InputComponents/RangeSlider';
import Input from '../InputComponents/Input';

const { setSelectedLayer, handleStyleInput, updateLayerRequest } =
  ProjectMapCreators;

export default function EditFeatureSection() {
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_LAYER_REQUEST]),
  );
  const dispatch = useDispatch();
  const [layerName, setLayerName] = useState(selectedLayer.name);
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

  const handleSave = () => {
    const data = {
      name: layerName,
      style: selectedLayer.style,
    };
    dispatch(updateLayerRequest(selectedLayer.id, data));
  };

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
    <div className="naxatw-flex naxatw-flex-col naxatw-gap-5">
      <div className="naxatw-flex naxatw-items-center">
        <a
          className="naxatw-flex naxatw-p-2"
          onClick={() => {
            dispatch(setSelectedLayer(null));
          }}
        >
          <MaterialIcon name="arrow_back" />
        </a>
        <h4>Edit Feature</h4>
      </div>

      <div className="naxatw-flex naxatw-items-center">
        <div className="naxatw-w-full naxatw-space-y-2">
          <label className="naxatw-label">Layer</label>
          <input
            type="text"
            className="naxatw-input"
            name="layerName"
            placeholder="Layer Name"
            value={layerName}
            onChange={e => setLayerName(e.target.value)}
          />
        </div>
      </div>

      <div className="naxatw-overflow-auto scrollbar naxatw-h-[26rem] naxatw-flex naxatw-flex-col naxatw-gap-4">
        {geometryType !== 'LineString' && (
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

        {geometryType !== 'LineString' && (
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

        {geometryType !== 'Point' && (
          <RangeSlider
            name="dashline"
            label="Dash Line"
            value={dashline}
            onChange={handleChange}
          />
        )}

        {geometryType === 'Point' && (
          <Input
            type="number"
            name="circleRadius"
            label="Radius"
            value={circleRadius}
            onChange={handleChange}
          />
        )}
      </div>

      <div>
        <Button
          className="naxatw-btn-primary"
          onClick={handleSave}
          isLoading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
