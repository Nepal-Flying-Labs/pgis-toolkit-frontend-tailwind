import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import MaterialIcon from '@Components/common/MaterialIcon';
import Button from '@Components/common/Button/index';

const { setSelectedLayer, handleStyleInput } = ProjectMapCreators;

const colorClassName = 'naxatw-input naxatw-h-12 naxatw-w-12 naxatw-p-[3px]';

export default function EditFeatureSection() {
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
    opacity,
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
            value={selectedLayer.name}
            // onChange={handleChange}
          />
        </div>
      </div>

      <div className="naxatw-flex naxatw-items-center">
        <div className="naxatw-w-full naxatw-space-y-2">
          <label className="naxatw-label">Fill color</label>
          <input
            type="color"
            className={colorClassName}
            name="fillColor"
            value={fillColor}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="naxatw-flex naxatw-items-center">
        <div className="naxatw-w-full naxatw-space-y-2">
          <label className="naxatw-label">Line color</label>
          <input
            type="color"
            className={colorClassName}
            name="lineColor"
            value={lineColor}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="naxatw-flex naxatw-items-center">
        <div className="naxatw-w-full naxatw-space-y-2">
          <label className="naxatw-label">Fill Opacity</label>
          <input
            type="range"
            className={colorClassName}
            name="fillOpacity"
            value={fillOpacity}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="naxatw-flex naxatw-items-center">
        <div className="naxatw-w-full naxatw-space-y-2">
          <label className="naxatw-label">Line Opacity</label>
          <input
            type="range"
            className={colorClassName}
            name="lineOpacity"
            value={lineOpacity}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Button className="naxatw-btn-primary" onClick={() => {}}>
          Save
        </Button>
      </div>
    </div>
  );
}
