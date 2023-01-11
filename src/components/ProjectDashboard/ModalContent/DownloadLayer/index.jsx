import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '@Components/common/Select';
import { Creators, Types } from '@Actions/projectDashboard';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { downloadProjectLayerRequest } = Creators;

const downloadOptions = [
  { id: 1, label: 'Shapefile', value: 'shapefile' },
  { id: 2, label: 'Geojson', value: 'geojson' },
  { id: 3, label: 'CSV', value: 'csv' },
  { id: 4, label: 'KML', value: 'kml' },
  { id: 5, label: 'GPX', value: 'gpx' },
];

export default function DownloadLayer() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const selectedData = useSelector(
    state => state.projectDashboard.data.selectedData,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.DOWNLOAD_PROJECT_LAYER_REQUEST]),
  );

  const handleDownload = () => {
    if (!selectedOption) return;
    // const downloadLink = `${baseURL}/api/maps/layer_download/?layer_id=${selectedData.id}&output_format=${selectedOption.value}`;
    // saveAs(downloadLink);
    dispatch(
      downloadProjectLayerRequest({
        layer_id: selectedData.id,
        output_format: selectedOption.value,
      }),
    );
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
        <Button
          className="naxatw-btn-primary"
          onClick={handleDownload}
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
        >
          Download
        </Button>
      </div>
    </div>
  );
}
