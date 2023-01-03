import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import Select from '@Components/common/Select';
import Button from '@Components/common/Button';
import { baseURL } from '@Services';

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

  const handleDownload = () => {
    if (!selectedOption) return;
    const downloadLink = `${baseURL}/api/maps/layer_download/?layer_id=${selectedData.id}&output_format=${selectedOption.value}`;
    saveAs(downloadLink);
  };

  return (
    <div>
      <div className="naxatw-space-y-5 naxatw-max-h-[28rem]">
        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Select download format</label>
            <Select
              placeholder="Choose"
              options={downloadOptions}
              label="label"
              value="value"
              onChange={selectedItem => setSelectedOption(selectedItem)}
              selectedValue={selectedOption?.id}
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
