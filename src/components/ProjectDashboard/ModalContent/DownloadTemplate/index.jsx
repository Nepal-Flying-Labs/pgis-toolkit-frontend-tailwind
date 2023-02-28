import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Select from '@Components/common/Select';
import { Creators, Types } from '@Actions/projectDashboard';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

const { downloadBulkTemplateRequest } = Creators;

const downloadOptions = [
  { id: 1, label: 'Shapefile', value: 'shapefile' },
  { id: 2, label: 'CSV', value: 'csv' },
];

export default function DownloadTemplate() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.DOWNLOAD_BULK_TEMPLATE_REQUEST]),
  );

  const handleDownload = () => {
    if (!selectedOption) return;
    // const downloadLink = `${baseURL}/api/maps/layer_download/?layer_id=${selectedData.id}&output_format=${selectedOption.value}`;
    // saveAs(downloadLink);
    dispatch(
      downloadBulkTemplateRequest({
        project: projectId,
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
