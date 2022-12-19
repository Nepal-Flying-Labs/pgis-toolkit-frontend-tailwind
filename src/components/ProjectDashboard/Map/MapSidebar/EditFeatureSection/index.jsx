import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import Button from '@Components/common/Button';

const { setProjectMapState, getLayerAttributeFieldsRequest } =
  ProjectMapCreators;

export default function EditFeatureSection() {
  const sidebarContent = useSelector(state => state.projectMap.sidebarContent);
  const selectedLayer = useSelector(state => state.projectMap.selectedLayer);
  const individualAttributeData = useSelector(
    state => state.projectMap.individualAttributeData,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedLayer) return;
    dispatch(
      getLayerAttributeFieldsRequest({
        layer: selectedLayer.id,
        check_mandatory: 'True',
      }),
    );
  }, [dispatch, selectedLayer]);

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
        <h4>{sidebarContent === 'add-feature' ? 'Add' : 'Edit'} Feature</h4>
      </div>

      <div className="naxatw-overflow-auto scrollbar naxatw-h-[32rem] naxatw-flex naxatw-flex-col naxatw-gap-5">
        <div className="naxatw-flex naxatw-items-center">
          <div className="naxatw-w-full naxatw-space-y-2">
            <label className="naxatw-label">Draw Feature</label>
            <Button className="naxatw-btn-secondary naxatw-btn-sm">Draw</Button>
          </div>
        </div>

        <div className="naxatw-flex naxatw-items-center">
          <div className="naxatw-w-full naxatw-space-y-2">
            <label className="naxatw-label">Attributes</label>
          </div>
        </div>

        {individualAttributeData.map(item => (
          <div key={item.id} className="naxatw-flex naxatw-items-center">
            <div className="naxatw-w-full naxatw-space-y-2">
              <label className="naxatw-label">
                {item.alias || item.name}
                {item.mandatory ? '*' : ''}
              </label>
              <input
                type="text"
                className="naxatw-input"
                name="item.name"
                // value={item.value}
                // onChange={e => setLayerName(e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
