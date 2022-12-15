import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@Components/common/Select';
import Button from '@Components/common/Button';

const downloadOptions = [
  { id: 1, label: 'Shapefile', value: 'shapefile' },
  { id: 2, label: 'Geojson', value: 'geojson' },
  { id: 3, label: 'CSV', value: 'csv' },
  { id: 4, label: 'KML', value: 'kml' },
  { id: 5, label: 'GPX', value: 'gpx' },
];

export default function DownloadLayer() {
  const [selectedOption, setSelectedOption] = useState(null);
  const selectedData = useSelector(
    state => state.projectDashboard.data.selectedData,
  );
  const dispatch = useDispatch();

  const handleDownload = () => {
    if (!selectedOption) return;
  };

  return (
    <div>
      <div className="naxatw-mt-10 naxatw-space-y-5 naxatw-max-h-[28rem]">
        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Select download format</label>
            <Select
              placeholder="Choose"
              options={downloadOptions}
              onChange={selectedItem => setSelectedOption(selectedItem)}
            />
          </div>
        </div>
      </div>

      <div className="naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button className="naxatw-btn-primary" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
}
