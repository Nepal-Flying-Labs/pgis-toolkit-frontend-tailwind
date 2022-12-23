import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import Button from '@Components/common/Button';
import useWindowDimensions from '@Hooks/useWindowDimentions';
import { checkIfLoading } from '@Utils/loaderSelector';
import AdvanceStyling from './AdvanceStyling';
import StandardStyling from './StandardStyling';

const { setProjectMapState, updateLayerRequest } = ProjectMapCreators;

const tabData = [{ label: 'Standard' }, { label: 'Advance' }];

export default function EditStyleSection() {
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const projectAreaLayerId = useSelector(
    state => state.projectMap.projectAreaLayerId,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.UPDATE_LAYER_REQUEST]),
  );
  const [styleTab, setStyleTab] = useState('Advance');
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const [layerName, setLayerName] = useState(selectedLayer?.name);

  useEffect(() => {
    if (!selectedLayer?.style?.icon?.url) {
      setStyleTab('Advance');
    } else {
      setStyleTab('Standard');
    }
    // eslint-disable-next-line
  }, []);

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
            dispatch(
              setProjectMapState({
                selectedLayer: null,
                sidebarContent: '',
              }),
            );
          }}
        >
          <MaterialIcon name="arrow_back" />
        </a>
        <h4>Edit Feature</h4>
      </div>

      <div
        className="naxatw-overflow-auto scrollbar naxatw-flex naxatw-flex-col naxatw-gap-5"
        style={{
          height: `${height / 16 - 10}rem`,
        }}
      >
        <div className="naxatw-flex naxatw-items-center">
          <div className="naxatw-w-full naxatw-space-y-2">
            <label className="naxatw-label">Layer Name</label>
            <input
              type="text"
              className={`naxatw-input ${
                selectedLayer?.id === projectAreaLayerId
                  ? 'naxatw-cursor-not-allowed'
                  : ''
              }`}
              name="layerName"
              placeholder="Layer Name"
              value={layerName}
              onChange={e => setLayerName(e.target.value)}
              disabled={selectedLayer?.id === projectAreaLayerId}
            />
          </div>
        </div>

        <div className="naxatw-flex naxatw-items-center">
          <div className="naxatw-w-full naxatw-space-y-2">
            <label className="naxatw-label">Styling</label>

            {selectedLayer?.style?.geometryType === 'Point' && (
              <div className="naxatw-flex naxatw-gap-2">
                {tabData.map(({ label }) => (
                  <div
                    key={label}
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
            )}
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
