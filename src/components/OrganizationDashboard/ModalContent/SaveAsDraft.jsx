/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
import React from 'react';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import Button from '@Components/common/Button/index';
import { Creators as CommonCreators } from '@Actions/common';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { checkIfLoading } from '@Utils/loaderSelector';
import removeObjectKeys from '@Utils/removeObjectKeys';

import { Creators, Types } from '@Actions/organizationDashboard';

const {
  patchProjectRequest,
  patchContactPersonRequest,
  postContactPersonRequest,
} = Creators;
const { togglePromptDialog } = CommonCreators;

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

const SaveAsDraft = () => {
  const { projectId, organizationId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.PATCH_PROJECT_REQUEST]),
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

  const drawnGeojsonData = useSelector(
    state => state.organizationDashboard.drawnGeojsonData,
  );

  const finalObj = {
    ...stepOne,
    ...stepTwo,
    organization: organizationId,
  };

  const {
    contactName,
    contactPosition,
    contactEmail,
    contactPhone,
    ...newObject
  } = finalObj;
  const contactPerson = {
    name: contactName,
    email: contactEmail,
    contact: contactPhone,
    position: contactPosition,
  };

  const diffObj = diffObject(project, newObject);

  const payloadData = diffObj?.file?.existedData
    ? removeObjectKeys(diffObj, ['file'])
    : { ...diffObj, file_type: getFileType(stepTwo.file) };

  const finalPayloadData = payloadData?.cover_image?.existedData
    ? removeObjectKeys(payloadData, ['cover_image'])
    : payloadData;

  const handleSaveDraft = () => {
    const diffContact = diffObject(contactDetails, contactPerson);
    if (Object.keys(diffContact).length > 0) {
      if (finalObj.contactId) {
        validateContactPerson(diffContact)
          ? dispatch(
              patchContactPersonRequest(finalObj.contactId, {
                ...diffContact,
                type: 'project',
              }),
            )
          : dispatch(
              patchContactPersonRequest(finalObj.contactId, {
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
    const newData =
      newObject.location_type === 'Custom Draw' && drawnGeojsonData
        ? {
            ...finalPayloadData,
            location_wkt: [drawnGeojsonData],
            file: '',
            file_type: '',
          }
        : {
            ...finalPayloadData,
          };
    dispatch(patchProjectRequest(projectId, { ...newData, status: 'draft' }));
  };

  return (
    <div className="">
      <div className="naxatw-flex naxatw-items-center naxatw-gap-x-5 naxatw-mb-5 ">
        <span className="naxatw-w-[48px] naxatw-flex naxatw-items-center naxatw-justify-center naxatw-h-[48px] naxatw-rounded-full naxatw-bg-[#DFF2F1] naxatw-text-center ">
          {' '}
          <MaterialIcon
            name="save"
            className="naxatw-text-[32px] naxatw-leading-[32px] naxatw-font-normal naxatw-text-[#00A699]"
          />
        </span>
        <h4>Save Draft ?</h4>
      </div>
      <span className=" naxatw-text-body-lg naxatw-text-[#484848]">
        Drafts let you save your edits, so you can come back later.
      </span>
      <div className="naxatw-mt-8 naxatw-flex naxatw-justify-center">
        <div className="naxatw-flex naxatw-gap-x-2">
          <Button
            onClick={() => dispatch(togglePromptDialog(''))}
            className="naxatw-w-[5.25rem] naxatw-text-[#00A699] hover:naxatw-underline hover:naxatw-bg-gray-100"
          >
            Discard
          </Button>
          <Button
            onClick={handleSaveDraft}
            className="naxatw-btn-primary naxatw-w-[7.563rem]"
            isLoading={loading}
            loaderClassName="naxatw-fill-secondary-400"
          >
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SaveAsDraft;
