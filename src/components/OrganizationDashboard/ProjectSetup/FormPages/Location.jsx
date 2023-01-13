/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Creators, Types } from '@Actions/organizationDashboard';
import toastActions from '@Actions/toast';
import Input from '@Components/common/Input/index';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button/index';
import { Creators as CommonCreators } from '@Actions/common';
import Chip from '@Components/common/Chip';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import CustomSelect from '@Components/common/CustomSelect';
import removeObjectKeys from '@Utils/removeObjectKeys';
import { checkIfLoading } from '@Utils/loaderSelector';
import hasKey from '@Utils/hasKey';
import UploadPolygonBoundary from '@Components/OrganizationDashboard/ProjectSetup/UploadPolygonBoundary/index';
import MapSection from '../MapSection/index';

const { togglePromptDialog } = CommonCreators;
const {
  setIndividualProject,
  patchProjectRequest,
  postContactPersonRequest,
  patchContactPersonRequest,
} = Creators;

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

const validateContactPerson = contact => {
  if (
    !contact.name &&
    !contact.position &&
    !contact.email &&
    !contact.contact
  ) {
    return false;
  }
  return true;
};

const validation = formValues => {
  let errors = {};
  if (
    hasKey(formValues, 'location_type') &&
    formValues.location_type === 'File Upload' &&
    !formValues.file
  ) {
    errors.location = 'Please upload a file';
  }

  if (
    hasKey(formValues, 'location_type') &&
    formValues.location_type === 'Custom Draw' &&
    !formValues.location_wkt
  ) {
    errors.location = 'Please draw area on map';
  }

  if (
    !hasKey(formValues, 'location_type') &&
    hasKey(formValues, 'file') &&
    !formValues.file &&
    !formValues.location_wkt
  ) {
    errors.location = 'Please upload a file';
  }

  return errors;
};

const Location = ({ page, setPage }) => {
  const { projectId, organizationId, tabname } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.PATCH_PROJECT_REQUEST]),
  );
  const drawnGeojsonData = useSelector(
    state => state.organizationDashboard.drawnGeojsonData,
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
  const contactDetails = useSelector(
    state => state.organizationDashboard.individualProject.contactDetails,
  );

  const getFileType = file => {
    if (file) {
      switch (file.type) {
        case 'application/geo+json':
          return 'GeoJSON';
        case 'application/zip':
          return 'Shapefile';
        case 'application/x-zip-compressed':
          return 'Shapefile';
        default:
          return 'Shapefile';
      }
    } else {
      return '';
    }
  };

  const { values, handleChange, handleCustomChange, handleSubmit } = useForm({
    initialValues: stepTwo,
    onSubmit: data => {
      const {
        contactName,
        contactPosition,
        contactEmail,
        contactPhone,
        ...basicInfo
      } = stepOne;
      const contactPerson = {
        name: contactName,
        email: contactEmail,
        contact: contactPhone,
        position: contactPosition,
      };
      const finalObj = {
        ...basicInfo,
        ...values,
        organization: organizationId,
      };
      const diffObj = diffObject(project, finalObj);
      const diffContact = diffObject(contactDetails, contactPerson);
      const tabName =
        tabname === 'project-setup'
          ? 'Complete your project profile'
          : 'Edit a Project';

      const payloadData = diffObj?.file?.existedData
        ? removeObjectKeys(diffObj, ['file'])
        : { ...diffObj, file_type: getFileType(values.file) };

      const finalPayloadData = payloadData?.cover_image?.existedData
        ? removeObjectKeys(payloadData, ['cover_image'])
        : payloadData;

      const newData =
        values.location_type === 'Custom Draw' && drawnGeojsonData
          ? {
              ...finalPayloadData,
              location_wkt: [drawnGeojsonData],
              file: '',
              file_type: '',
            }
          : {
              ...finalPayloadData,
            };

      const error = validation(newData);

      if (Object.keys(error).length < 1) {
        if (Object.keys(diffContact).length > 0) {
          if (stepOne.contactId) {
            validateContactPerson(diffContact)
              ? dispatch(
                  patchContactPersonRequest(stepOne.contactId, {
                    ...diffContact,
                    type: 'project',
                  }),
                )
              : dispatch(
                  patchContactPersonRequest(stepOne.contactId, {
                    is_deleted: true,
                    type: 'project',
                  }),
                );
          } else {
            dispatch(
              postContactPersonRequest(
                {
                  ...contactPerson,
                  project: projectId,
                  organization: organizationId,
                },
                { project: projectId, type: 'project' },
              ),
            );
          }
        }
        dispatch(
          patchProjectRequest(projectId, {
            ...newData,
            status: 'ongoing',
            page: tabname === 'settings',
            tabName,
          }),
        );
      } else {
        setErrors(error);
        dispatch(
          toastActions.error({ message: 'Please fill required (*) field' }),
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
        <CustomSelect
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
        {errors.location && <FormErrorMessage message={errors.location} />}
      </div>
      {values?.location_type === 'File Upload' && (
        <UploadPolygonBoundary
          formValues={values}
          uploadedFile={values?.file}
          setuploadedFile={file => {
            handleCustomChange('file', file);
          }}
        />
      )}

      {values?.location_type === 'Custom Draw' && (
        <MapSection locationType={values.location_type} formValues={values} />
      )}
      <div
        className={`naxatw-flex ${
          tabname !== 'settings'
            ? 'naxatw-justify-between naxatw-pb-5'
            : 'naxatw-justify-center'
        }  naxatw-pt-5 `}
      >
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
            Save Draft
          </Button>
        )}
      </div>
    </>
  );
};

export default Location;
