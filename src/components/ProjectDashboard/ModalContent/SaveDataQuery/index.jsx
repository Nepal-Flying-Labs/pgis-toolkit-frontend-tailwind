import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Creators as ProjectMapCreators,
  Types as ProjectMapTypes,
} from '@Actions/projectMap';
import {
  Creators as ProjectDashboardCreators,
  Types as ProjectDashboardTypes,
} from '@Actions/projectDashboard';
import Button from '@Components/common/Button';
import Select from '@Components/common/Select';
import { checkIfLoading } from '@Utils/loaderSelector';

const { deleteLayerRequest } = ProjectMapCreators;
const { deleteDataRequest } = ProjectDashboardCreators;

export default function SaveDataQuery() {
  const deleteLayer = useSelector(state => state.projectMap.deleteLayer);
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [
      ProjectMapTypes.DELETE_LAYER_REQUEST,
      ProjectDashboardTypes.DELETE_DATA_REQUEST,
    ]),
  );

  const dispatch = useDispatch();

  const handleSave = () => {
    if (isDeleting) return;
    if (deleteLayer?.deleteType === 'data') {
      dispatch(deleteDataRequest(deleteLayer?.id, { is_deleted: true }));
    } else {
      dispatch(deleteLayerRequest(deleteLayer?.id, { is_deleted: true }));
    }
  };

  return (
    <div>
      <div className="naxatw-my-5 naxatw-space-y-5">
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Name</label>
          <span className="naxatw-flex">
            <input
              type="text"
              className="naxatw-input"
              name="name"
              placeholder="Enter name"
              // value=""
              // onChange={handleChange}
            />
          </span>
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Category</label>
          <Select
            placeholder="Choose"
            options={[]}
            labelKey="name"
            valueKey="id"
            // onChange={item => setSelectedLayer(item)}
            // selectedValue={selectedLayer?.id}
          />
        </div>
      </div>

      <div className="naxatw-flex naxatw-justify-center naxatw-items-center naxatw-mt-14 naxatw-gap-2">
        <Button
          className="naxatw-btn-primary"
          isLoading={isDeleting}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
