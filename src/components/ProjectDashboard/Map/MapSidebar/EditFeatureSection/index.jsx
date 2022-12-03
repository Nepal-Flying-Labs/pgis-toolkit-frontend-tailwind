/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import MaterialIcon from '@Components/common/MaterialIcon';
import Button from '@Components/common/Button/index';
import useCustomUpload from '@Hooks/useCustomUpload';
import { checkIfLoading } from '@Utils/loaderSelector';
import Spinner from '@Components/common/Spinner';
import RangeSlider from '../InputComponents/RangeSlider';
import Input from '../InputComponents/Input';

const {
  setSelectedLayer,
  handleStyleInput,
  updateLayerRequest,
  uploadIconRequest,
} = ProjectMapCreators;

export default function EditFeatureSection() {
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_LAYER_REQUEST]),
  );
  const isIconUploading = useSelector(state =>
    checkIfLoading(state, [Types.UPLOAD_ICON_REQUEST]),
  );
  const [styleTab, setStyleTab] = useState('advance');
  const dispatch = useDispatch();
  const [layerName, setLayerName] = useState(selectedLayer.name);
  const [inputRef, onFileUpload] = useCustomUpload();

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

  const handleIconUpload = e => {
    const data = {
      icon: e.target.files[0],
    };
    dispatch(uploadIconRequest(selectedLayer.id, data));
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
    icon,
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

      <div className="naxatw-overflow-auto scrollbar naxatw-h-[32rem] naxatw-flex naxatw-flex-col naxatw-gap-5">
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

        <div className="naxatw-flex naxatw-items-center">
          <div className="naxatw-w-full naxatw-space-y-2">
            <label className="naxatw-label">Styling</label>
            <div className="naxatw-flex naxatw-gap-2">
              <div
                className={`naxatw-w-fit naxatw-bg-white naxatw-border naxatw-rounded-2xl naxatw-px-3 naxatw-py-2 naxatw-cursor-pointer ${
                  styleTab === 'standard'
                    ? 'naxatw-border-grey-800'
                    : 'naxatw-border-grey-100'
                }`}
                onClick={() => {
                  setStyleTab('standard');
                }}
              >
                Standard
              </div>
              <div
                className={`naxatw-w-fit naxatw-bg-white naxatw-border naxatw-rounded-2xl naxatw-px-3 naxatw-py-2 naxatw-cursor-pointer ${
                  styleTab === 'advance'
                    ? 'naxatw-border-grey-800'
                    : 'naxatw-border-grey-100'
                }`}
                onClick={() => {
                  setStyleTab('advance');
                }}
              >
                Advance
              </div>
            </div>
          </div>
        </div>

        {styleTab === 'standard' ? (
          <div className="naxatw-flex naxatw-items-center naxatw-gap-4">
            <div
              className="naxatw-w-10 naxatw-h-10 naxatw-border naxatw-flex naxatw-items-center naxatw-justify-center naxatw-rounded-lg naxatw-border-grey-800 naxatw-cursor-pointer naxatw-bg-white naxatw-p-1"
              onClick={onFileUpload}
            >
              {isIconUploading ? (
                <Spinner className="naxatw-fill-primary-400" />
              ) : icon?.url ? (
                <img src={icon.url} alt="icon" />
              ) : (
                <MaterialIcon name="add" />
              )}
            </div>
            <Button
              className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-transparent"
              onClick={onFileUpload}
            >
              Upload Icon
            </Button>
            <input
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleIconUpload}
            />
          </div>
        ) : (
          <div className="naxatw-flex naxatw-flex-col naxatw-gap-4">
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
        )}

        <div className="naxatw-fixed naxatw-bottom-0 naxatw-w-full naxatw-py-4 naxatw-bg-grey-100">
          <Button
            className="naxatw-btn-primary"
            onClick={handleSave}
            isLoading={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
