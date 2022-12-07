import React from 'react';
import UploadFolder from '@Assets/images/project/upload-folder.png';
import ImportFromOSM from '@Assets/images/project/import-osm.png';
import WMSLayer from '@Assets/images/project/wms-layer.png';
import NoDataYet from '@Assets/images/no-data-yet.png';

const uploadMethods = [
  {
    id: 1,
    icon: UploadFolder,
    title: 'Upload your own Datasets',
    description:
      'The selected data will be downloaded from OSM. But the downloaded data will be filled.',
  },
  {
    id: 2,
    icon: ImportFromOSM,
    title: 'Import from OSM',
    description:
      'The selected data will be downloaded from OSM. But the downloaded data will be filled.',
  },
  {
    id: 3,
    icon: WMSLayer,
    title: 'Add WMS Layer',
    description:
      'The selected data will be downloaded from OSM. But the downloaded data will be filled.',
  },
];

export default function Data() {
  return (
    <div className="naxatw-absolute naxatw-mx-10">
      <div className="naxatw-flex naxatw-items-center naxatw-py-[22px]">
        <h3>Data Catalogue</h3>
      </div>

      <div className="">
        <h4 className="naxatw-text-grey-800">Please upload your dataset</h4>
        <p>Download Datasets for Field Data Collection</p>
      </div>

      <div className="naxatw-py-6 naxatw-flex naxatw-gap-3">
        {uploadMethods.map(({ id, icon, title, description }) => (
          <div
            key={id}
            className="naxatw-w-fit naxatw-border naxatw-border-grey-300 naxatw-rounded-lg naxatw-p-5 naxatw-cursor-pointer"
          >
            <div className="naxatw-flex naxatw-gap-5 naxatw-items-center">
              <figure>
                <img height={124} width={124} src={icon} alt="uploadx" />
              </figure>
              <div>
                <h5 className="naxatw-text-grey-800">{title}</h5>
                <p className="naxatw-text-sm">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="naxatw-flex naxatw-flex-col naxatw-px-5 naxatw-py-10 naxatw-items-center">
        <img width={60} height={60} src={NoDataYet} alt="no-data-yet" />
        <h3 className="naxatw-mt-7">No data yet</h3>
        <p className="naxatw-mt-2">
          Upload your datasets, import from OSM or add WMS layer through the
          above buttons.
        </p>
      </div>
    </div>
  );
}
