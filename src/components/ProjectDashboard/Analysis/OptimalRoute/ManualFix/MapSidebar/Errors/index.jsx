import React from 'react';
import { useSelector } from 'react-redux';
import Accordion from '@Components/common/Accordion';
import IconButton from '@Components/common/IconButton';
import Button from '@Components/common/Button';

export default function Errors() {
  const errorFeaturesData = useSelector(
    state => state.analysis.errorFeaturesData,
  );

  return (
    <div>
      <Accordion
        // key={theme.id}
        // collapsed={hasNoLayer}
        header={
          <div className="naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
            <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
              <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
                <h5 className="naxatw-text-grey-800">Null Geometry</h5>
              </div>
            </div>
            <div>
              <p>43 out of 150 errors</p>
            </div>
          </div>
        }
        body={
          <div>
            {errorFeaturesData?.null?.map(feature => (
              <div
                key={feature}
                className="naxatw-flex naxatw-justify-between naxatw-items-center"
              >
                <div className="naxatw-flex naxatw-justify-between naxatw-items-center">
                  <input
                    id={feature}
                    type="checkbox"
                    className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4 naxatw-accent-grey-800"
                    checked={feature}
                    // onChange={e =>
                    // handleLayerCheck({
                    //   checked: e.target.checked,
                    //   layerId: feature.id,
                    //   themeId: theme.id,
                    // })
                    // }
                  />

                  <label
                    className="naxatw-text-body-lg naxatw-text-grey-800"
                    htmlFor={feature}
                  >
                    {feature}
                  </label>
                </div>

                <div className="naxatw-flex">
                  <span
                    className="hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer naxatw-flex naxatw-items-center"
                    // onClick={() => {
                    //   dispatch(
                    //     setProjectMapState({
                    //       selectedLayer: feature,
                    //       sidebarContent: 'edit-style',
                    //     }),
                    //   );
                    // }}
                  >
                    <IconButton
                      name="edit"
                      className="material-icons-outlined"
                      // style={{ fontSize: '20px' }}
                    />
                  </span>
                  <IconButton
                    className="material-icons-outlined naxatw-text-delete_btn"
                    name="delete"
                  />
                </div>
              </div>
            ))}
            <div className="naxatw-flex naxatw-justify-center">
              <Button
                className="naxatw-text-delete_btn"
                iconLeft="delete"
                iconClassName="material-icons-outlined"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
