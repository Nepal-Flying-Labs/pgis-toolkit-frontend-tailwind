import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';
import AdvanceStyling from './AdvanceStyling';
import StandardStyling from './StandardStyling';

const { setSelectedLayer, updateLayerRequest } = ProjectMapCreators;

const tabData = [{ label: 'Standard' }, { label: 'Advance' }];

export default function EditFeatureSection() {
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_LAYER_REQUEST]),
  );
  const [styleTab, setStyleTab] = useState('Advance');
  const dispatch = useDispatch();
  const [layerName, setLayerName] = useState(selectedLayer.name);

  useEffect(() => {
    if (!selectedLayer?.style?.icon?.url) return;
    setStyleTab('Standard');
  }, [selectedLayer]);

  const handleSave = () => {
    const data = {
      name: layerName,
      style: selectedLayer.style,
    };
    dispatch(updateLayerRequest(selectedLayer.id, data));
  };

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
              {tabData.map(({ label }) => (
                <div
                  className={`naxatw-w-fit naxatw-bg-white naxatw-border naxatw-rounded-2xl naxatw-px-3 naxatw-py-2 naxatw-cursor-pointer ${
                    styleTab === label
                      ? 'naxatw-border-grey-800'
                      : 'naxatw-border-grey-100'
                  }`}
                  onClick={() => {
                    setStyleTab(label);
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="naxatw-flex naxatw-flex-col naxatw-gap-4">
          {styleTab === 'Standard' ? <StandardStyling /> : <AdvanceStyling />}
        </div>

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
