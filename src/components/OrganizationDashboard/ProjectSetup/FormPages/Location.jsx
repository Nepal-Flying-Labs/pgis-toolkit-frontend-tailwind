/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable arrow-body-style */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Creators, Types } from '@Actions/organizationDashboard';
import toastActions from '@Actions/toast';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button/index';
import { Creators as CommonCreators } from '@Actions/common';
import Chip from '@Components/common/Chip';
import Select from '@Components/common/Select';
import removeObjectKeys from '@Utils/removeObjectKeys';
import { checkIfLoading } from '@Utils/loaderSelector';
import UploadPolygonBoundary from '@Components/OrganizationDashboard/ProjectSetup/UploadPolygonBoundary/index';
import MapSection from '../MapSection/index';

const { togglePromptDialog } = CommonCreators;
const { setIndividualProject, patchProjectRequest } = Creators;

function diffObject(a, b) {
  const diffObj = Object.keys(b).reduce((diff, key) => {
    if (a[key] === b[key]) return diff;
    return {
      ...diff,
      [key]: b[key],
    };
  }, {});
  return diffObj;
}

const Location = ({ page, setPage }) => {
  const { projectId, organizationId, tabname } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.PATCH_PROJECT_REQUEST]),
  );
  const countryList = useSelector(
    state => state.organizationDashboard.countryList,
  );
  const stepOne = useSelector(
    state => state.organizationDashboard.individualProject.stepOne,
  );
  const stepTwo = useSelector(
    state => state.organizationDashboard.individualProject.stepTwo,
  );
  const project = useSelector(
    state => state.organizationDashboard.individualProject.project,
  );

  const getFileType = file => {
    if (file) {
      switch (file.type) {
        case 'application/geo+json':
          return 'GeoJSON';
        case 'application/zip':
          return 'Shapefile';
        default:
          return '';
      }
    } else {
      return '';
    }
  };

  const { values, handleChange, handleCustomChange, handleSubmit } = useForm({
    initialValues: stepTwo,
    onSubmit: data => {
      const finalObj = {
        ...stepOne,
        ...values,
        organization: organizationId,
      };

      const diffObj = diffObject(project, finalObj);

      const payloadData = diffObj?.file?.existedData
        ? removeObjectKeys(diffObj, ['file'])
        : { ...diffObj, file_type: getFileType(values.file) };
      const finalPayloadData = payloadData?.cover_image?.existedData
        ? removeObjectKeys(payloadData, ['cover_image'])
        : payloadData;

      if (values.file) {
        dispatch(
          patchProjectRequest(projectId, {
            ...finalPayloadData,
            status: 'ongoing',
            page: tabname === 'settings',
          }),
        );
      } else {
        dispatch(
          toastActions.error({ message: 'Geographic Boundary is Required' }),
        );
      }
    },
  });

  return (
    <>
      <div
        className={`${
          tabname !== 'settings' ? 'naxatw-px-[5.313rem]' : ''
        } naxatw-flex`}
      >
        <span
          className={`naxatw-text-body-lg ${
            tabname !== 'settings' ? 'naxatw-text-center' : ''
          } `}
        >
          Select the location boundary for the area you are working. You can
          either manually draw the boundary for the project site or you can
          upload a location data to define the boundary areas
        </span>
      </div>
      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Country</label>
        <Select
          options={countryList}
          placeholder="Choose"
          onChange={data => {
            handleCustomChange('country', [data.id]);
          }}
          selected={
            countryList.find(country => country.id === values.country?.[0])
              ?.name
          }
          dataKey="name"
        />
      </div>
      <Input
        type="text"
        label="Name of Geographical Region"
        name="geographical_region"
        value={values.geographical_region}
        onChange={handleChange}
        placeholder="Enter name of Geographical Region"
      />
      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Choose the Geographic Boundary*</label>
        <div className="naxatw-flex naxatw-gap-x-2">
          <Chip
            name="Upload Area"
            status={values.location_type || ''}
            value="File Upload"
            onClick={() => {
              handleCustomChange('location_type', 'File Upload');
            }}
          />
          <Chip
            name="Draw Area on Map"
            status={values.location_type || ''}
            value="Custom Draw"
            onClick={() => {
              handleCustomChange('location_type', 'Custom Draw');
            }}
          />
        </div>
      </div>
      {values?.location_type === 'File Upload' && (
        <UploadPolygonBoundary
          uploadedFile={values?.file}
          setuploadedFile={file => {
            handleCustomChange('file', file);
          }}
        />
      )}

      {values?.location_type === 'Custom Draw' && <MapSection />}
      <div className="naxatw-flex naxatw-justify-between  naxatw-pt-7 naxatw-pb-7 ">
        {page > 1 ? (
          <Button
            iconLeft="arrow_back"
            className=" naxatw-w-[8.875rem] naxatw-text-[#00A699] hover:naxatw-bg-[#F5F5F5] naxatw-group "
            onClick={() => {
              // handleSubmit();
              dispatch(setIndividualProject({ key: 'stepTwo', value: values }));
              setPage(prevPage => prevPage - 1);
            }}
          >
            <span className="group-hover:naxatw-underline naxatw-text-secondary-400 naxatw-text-body-btn">
              Go back
            </span>
          </Button>
        ) : (
          <div />
        )}
        <Button
          className="naxatw-btn-primary naxatw-w-[4.75rem]"
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </Button>
        {tabname !== 'settings' && (
          <Button
            onClick={() => {
              dispatch(setIndividualProject({ key: 'stepTwo', value: values }));
              dispatch(togglePromptDialog('save-as-draft'));
            }}
            className=" naxatw-w-[8.875rem]  naxatw-text-[#00A699] naxatw-border-[1px] hover:naxatw-underline hover:naxatw-bg-grey-200"
          >
            Save as Draft
          </Button>
        )}
      </div>
    </>
  );
};

export default Location;
