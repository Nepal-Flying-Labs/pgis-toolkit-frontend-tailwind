import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as DataCleaningCreators } from '@Actions/dataCleaning';
import Button from '@Components/common/Button';
import IconButton from '@Components/common/IconButton';
import Tab from '@Components/common/Tab';
import Errors from './Errors';
import Layers from './Layers';

const { toggleModal } = CommonCreators;
const { validateErrorFixRequest, resetManualFixState } = DataCleaningCreators;

const tabData = [
  { id: 1, title: 'Errors', content: <Errors /> },
  { id: 2, title: 'Layers', content: <Layers /> },
];

export default function MapSidebar() {
  const selectedLayer = useSelector(state => state.dataCleaning.selectedLayer);
  const sidebarContent = useSelector(
    state => state.dataCleaning.manualFix.sidebarContent,
  );
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(toggleModal('save-manual-fix'));
    dispatch(
      validateErrorFixRequest({
        layerId: selectedLayer.id,
        geometryType: selectedLayer.geom_type,
      }),
    );
  };

  return (
    <div
      className="naxatw-bg-grey-100 naxatw-pl-4 naxatw-pr-4 naxatw-pt-3
        naxatw-overflow-auto scrollbar naxatw-min-w-[23rem] naxatw-border-r naxatw-border-grey-300"
    >
      <div className="naxatw-flex naxatw-flex-col naxatw-gap-2">
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
            <IconButton
              name="arrow_back"
              onClick={() => {
                dispatch(resetManualFixState());
              }}
            />
            <h4
              title={selectedLayer?.name}
              className="naxatw-truncate naxatw-w-[12rem] naxatw-cursor-default"
            >
              {selectedLayer?.name}
            </h4>
          </div>
          {sidebarContent === 'error-list' && (
            <Button className="naxatw-btn-primary" onClick={handleSave}>
              Validate
            </Button>
          )}
        </div>

        <div>
          <Tab data={tabData} />
        </div>
      </div>
    </div>
  );
}
