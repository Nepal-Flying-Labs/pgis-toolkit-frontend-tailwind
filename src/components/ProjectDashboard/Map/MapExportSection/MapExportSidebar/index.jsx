import React from 'react';
import { useDispatch } from 'react-redux';
import { Creators } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import Select from '@Components/common/Select';
import Toggle from '@Components/common/Toggle';
import Button from '@Components/common/Button/index';

const { setProjectMapState } = Creators;

export default function MapSidebar() {
  const dispatch = useDispatch();

  return (
    <div
      className="naxatw-bg-grey-100 naxatw-px-4 naxatw-py-3.5 naxatw-transition-all naxatw-duration-300 naxatw-overflow-auto scrollbar"
      style={{
        minWidth: '23rem',
        maxWidth: '23rem',
      }}
    >
      <div className="naxatw-flex naxatw-justify-between">
        <h4>Map Export</h4>
        <a
          className="hover:naxatw-bg-grey-200 naxatw-h-10 naxatw-w-10 naxatw-flex naxatw-justify-center naxatw-items-center naxatw-rounded-lg"
          onClick={() =>
            dispatch(setProjectMapState({ toggleMapExport: false }))
          }
        >
          <MaterialIcon name="close" />
        </a>
      </div>

      <div className="naxatw-mt-3.5 naxatw-space-y-5">
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Map Title</label>
          <input
            type="text"
            className="naxatw-input"
            name="mapTitle"
            placeholder="Enter Map Title"
            // value={values.username}
            // onChange={handleChange}
            // {...inputProps}
          />
        </div>

        <div className="naxatw-flex naxatw-gap-3">
          <div className="naxatw-space-y-2 naxatw-w-full">
            <label className="naxatw-label">Orientation</label>
            <Select
              placeholder="Choose"
              // options={downloadOptions}
              label="label"
              className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
              value="value"
              // onChange={selectedItem => setSelectedOption(selectedItem)}
              // selectedValue={selectedOption?.id}
            />
          </div>
          <div className="naxatw-space-y-2 naxatw-w-full">
            <label className="naxatw-label">Page Size</label>
            <Select
              placeholder="Choose"
              // options={downloadOptions}
              label="label"
              value="value"
              className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
              // onChange={selectedItem => setSelectedOption(selectedItem)}
              // selectedValue={selectedOption?.id}
            />
          </div>
        </div>

        <div className="naxatw-space-y-2 naxatw-w-full">
          <label className="naxatw-label">Output Format</label>
          <Select
            placeholder="Choose"
            // options={downloadOptions}
            label="label"
            className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
            value="value"
            // onChange={selectedItem => setSelectedOption(selectedItem)}
            // selectedValue={selectedOption?.id}
          />
        </div>
      </div>

      <div className="naxatw-mt-[1.875rem] naxatw-space-y-5">
        <div className="naxatw-flex naxatw-justify-between">
          <p className="naxatw-text-body-lg">Legend</p>
          <Toggle checked />
        </div>
        <div className="naxatw-flex naxatw-justify-between">
          <p className="naxatw-text-body-lg">North arrow</p>
          <Toggle checked />
        </div>
        <div className="naxatw-flex naxatw-justify-between">
          <p className="naxatw-text-body-lg">Scale bar</p>
          <Toggle checked />
        </div>
        <div className="naxatw-flex naxatw-justify-between">
          <p className="naxatw-text-body-lg">Grid</p>
          <Toggle checked />
        </div>
      </div>
      <div className="naxatw-mt-[5rem] naxatw-flex naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          iconLeft="file_download"
          // onClick={() => {}}
        >
          Export
        </Button>
      </div>
    </div>
  );
}
