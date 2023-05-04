/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@Components/common/Input';
import TextArea from '@Components/common/TextArea';
// import MultiSelect from '@Components/common/MultiSelect/index';
import { Creators, Types } from '@Actions/organizationDashboard';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import CustomCalendar from '@Components/common/CustomCalendar/index';
import { Creators as CommonCreators } from '@Actions/common';
import Button from '@Components/common/Button';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import UploadPhotos from '@Components/common/UploadPhotos/index';
import removeObjectKeys from '@Utils/removeObjectKeys';
import useForm from '@Hooks/useForm';
import { checkIfLoading } from '@Utils/loaderSelector';
import toastActions from '@Actions/toast';
import { format } from 'date-fns';
// import ContactPerson from './ContactPerson';
import CustomMultiSelect from '../CustomMultiSelect';

const {
  setIndividualProject,
  patchProjectRequest,
  postContactPersonRequest,
  patchContactPersonRequest,
} = Creators;
const { togglePromptDialog } = CommonCreators;

const thematicFocusArea = [
  {
    id: 1,
    value: 'Disaster Risk Reduction & Management',
    displayName: 'Disaster Risk Reduction & Management',
  },
  {
    id: 2,
    value: 'Development Planning & Management',
    displayName: 'Development Planning & Management',
  },
  {
    id: 3,
    value: 'Mobility',
    displayName: 'Mobility',
  },
  {
    id: 4,
    value: 'Climate Change & Environment',
    displayName: 'Climate Change & Environment',
  },
  {
    id: 5,
    value: 'Urban Sustainability',
    displayName: 'Urban Sustainability',
  },
];

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

  if (!formValues.name) {
    errors.name = 'Name is Required';
  }
  if (formValues.thematic_areas?.length < 1) {
    errors.thematicFocusArea = 'Choose Thematic Area';
  }

  if (!formValues.contactName) {
    errors.contactName = 'Contact Name is Required';
  }

  if (!formValues.contactEmail) {
    errors.contactEmail = 'Contact Email is Required';
  }

  if (formValues.contactName && formValues.contactEmail) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = pattern.test(formValues.contactEmail);
    if (!result) errors.contactEmail = 'Enter a valid Email';
  }

  if (formValues.contactName && formValues.contactPhone) {
    const pattern = /^[+\-()# \d]+$/;
    const result = pattern.test(formValues.contactPhone);
    if (!result) {
      errors.contactPhone = 'Enter a valid contact number';
    } else {
      formValues.contactPhone.length < 7 || formValues.contactPhone.length > 20
        ? (errors.contactPhone = 'Enter a valid contact number')
        : '';
    }
  }

  if (
    (formValues.contactEmail ||
      formValues.contactPhone ||
      formValues.contactPosition) &&
    !formValues.contactName
  ) {
    errors.contactName = 'Name field is required';
  }

  return errors;
};

const BasicInfo = ({ setPage }) => {
  const { tabname, organizationId, projectId } = useParams();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const project = useSelector(
    state => state.organizationDashboard.individualProject.project,
  );
  const stepOne = useSelector(
    state => state.organizationDashboard.individualProject.stepOne,
  );
  const [partner, setPartner] = useState('');
  const handlePartner = e => {
    setPartner(e.target.value);
  };

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.PATCH_PROJECT_REQUEST]),
  );

  const contactDetails = useSelector(
    state => state.organizationDashboard.individualProject.contactDetails,
  );

  const { values, setValues, handleChange, handleCustomChange, handleSubmit } =
    useForm({
      initialValues: stepOne,
      required: ['name'],
      onSubmit: data => {},
    });
  useEffect(() => {
    setValues(stepOne);
  }, [setValues, stepOne]);

  const handleKeyChange = e => {
    if (e.key === 'Enter' && partner) {
      handleCustomChange('partners', [
        ...values.partners,
        { value: partner, id: Math.floor(Math.random() * 100) },
      ]);
      setPartner('');
    }
  };

  const handleSaveBasicInfo = () => {
    const error = validation(values);
    if (Object.keys(error).length > 0) {
      setErrors(error);
      dispatch(
        toastActions.error({
          message: 'An error has occurred while filling the form',
        }),
      );
    } else {
      const {
        contactName,
        contactPosition,
        contactEmail,
        contactPhone,
        ...basicInfo
      } = values;
      const contactPerson = {
        name: contactName,
        email: contactEmail,
        contact: contactPhone,
        position: contactPosition,
      };
      const finalObj = {
        ...basicInfo,
        organization: organizationId,
      };

      const diffObj = diffObject(project, finalObj);
      const diffContact = diffObject(contactDetails, contactPerson);

      const payloadData = diffObj?.cover_image?.existedData
        ? removeObjectKeys(diffObj, ['cover_image'])
        : diffObj;
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
          ...payloadData,
          page: tabname === 'settings',
          tabName: tabname === 'project-edit' ? 'Edit a Project' : '',
        }),
      );
    }
  };

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
          }`}
        >
          To continue, please fill out the basic information of the form. You
          will not be able to proceed further until you fill in the required
          form fields.
        </span>
      </div>
      <div>
        <Input
          type="text"
          label="Name of project*"
          name="name"
          value={values?.name}
          onChange={handleChange}
          placeholder="Enter name of project"
        />
        {errors.name && <FormErrorMessage message={errors.name} />}
      </div>

      {/* <Input
        type="textarea"
        label="Project Objectives"
        className="naxatw-h-[77px] naxatw-pb-8"
        name="description"
        value={values?.description || ''}
        onChange={handleChange}
        placeholder="Write a short summary of a project"
      /> */}
      <TextArea
        label="Project Objectives"
        name="description"
        value={values?.description || ''}
        onChange={handleChange}
      />

      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Upload Cover Image</label>
        <UploadPhotos
          label="coverImage"
          uploadedFile={values?.cover_image}
          accept="image/*"
          onChange={images => {
            handleCustomChange('cover_image', images);
          }}
        />
      </div>

      <div className="naxatw-space-y-2">
        <label className="naxatw-label">Thematic Focus Area*</label>
        <CustomMultiSelect
          options={thematicFocusArea}
          placeholder="Choose"
          field="name"
          onChange={data => {
            const area = data.map(i => i.name);
            handleCustomChange('thematic_areas', area);
          }}
          onOthersChange={data => {
            handleCustomChange('thematic_areas', [
              data,
              ...values.thematic_areas,
            ]);
          }}
          selected={values?.thematic_areas || []}
          othersOptions={values?.selectedThematic}
        />

        {errors.thematicFocusArea && (
          <FormErrorMessage message={errors.thematicFocusArea} />
        )}
      </div>

      <div className="naxatw-flex naxatw-gap-x-5">
        <div className="naxatw-space-y-2 naxatw-basis-1/2">
          <label className="naxatw-label">Start Date</label>
          <CustomCalendar
            startDate={
              values?.start_date ? new Date(values?.start_date) : new Date()
            }
            onChange={date => {
              handleCustomChange('start_date', format(date, 'yyyy-MM-dd'));
            }}
            selected={values?.start_date}
          />
        </div>

        <div className="naxatw-space-y-2 naxatw-basis-1/2">
          <label className="naxatw-label">End Date</label>
          <CustomCalendar
            startDate={
              values?.end_date ? new Date(values?.end_date) : new Date()
            }
            onChange={date => {
              handleCustomChange('end_date', format(date, 'yyyy-MM-dd'));
            }}
            selected={values?.end_date}
          />
        </div>
      </div>

      <div className="naxatw-relative naxatw-space-y-2">
        <label className="naxatw-label">Partners</label>
        <input
          className="naxatw-input"
          placeholder="Title of Partner"
          value={partner}
          onChange={e => handlePartner(e)}
          onKeyDown={e => handleKeyChange(e)}
        />
        <a
          onClick={() => {
            if (partner) {
              handleCustomChange('partners', [
                ...values?.partners,
                { value: partner, id: Math.floor(Math.random() * 100) },
              ]);
              setPartner('');
            }
          }}
        >
          <MaterialIcon
            name="add"
            className="naxatw-absolute naxatw-top-11 naxatw-right-2 naxatw-text-[#00A699] naxatw-cursor-pointer naxatw-text-icon-md"
            title="Add Partner"
          />
        </a>
        <ul className="naxatw-mt-2">
          {values?.partners?.map(item => (
            <li
              key={item.id}
              className="naxatw-flex naxatw-p-3 naxatw-items-center naxatw-justify-between hover:naxatw-bg-[#F5F5F5]"
            >
              <span className="naxatw-text-body-lg">{item.value}</span>
              <a
                onClick={() => {
                  const updatedArray = values?.partners?.filter(
                    list => list.id !== item.id,
                  );
                  handleCustomChange('partners', updatedArray);
                }}
              >
                <MaterialIcon
                  name="close"
                  className="naxatw-cursor-pointer"
                  title="Remove Partner"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <hr />
      {/* <ContactPerson /> */}

      <h4 className="naxatw-font-bold">Contact Person Details</h4>
      <div>
        <Input
          type="text"
          label="Name of contact person*"
          name="contactName"
          value={values.contactName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        {errors.contactName && (
          <FormErrorMessage message={errors.contactName} />
        )}
      </div>

      <Input
        label="Position"
        type="text"
        name="contactPosition"
        value={values.contactPosition}
        onChange={handleChange}
        placeholder="Position"
      />

      <div>
        <Input
          type="email"
          label="Email*"
          name="contactEmail"
          value={values.contactEmail}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
        {errors.contactEmail && (
          <FormErrorMessage message={errors.contactEmail} />
        )}
      </div>

      <div>
        <Input
          label="Contact number"
          type="text"
          name="contactPhone"
          value={values.contactPhone}
          onChange={handleChange}
          placeholder="Contact number"
        />
        {errors.contactPhone && (
          <FormErrorMessage message={errors.contactPhone} />
        )}
      </div>

      <div
        className={`naxatw-flex ${
          tabname !== 'settings'
            ? 'naxatw-justify-between naxatw-pb-7'
            : 'naxatw-justify-center'
        }  naxatw-pt-7  `}
      >
        <div />

        {tabname !== 'settings' ? (
          <Button
            className="naxatw-btn-primary naxatw-w-[4.75rem]"
            onClick={() => {
              const error = validation(values);
              if (Object.keys(error).length > 0) {
                setErrors(error);
                dispatch(
                  toastActions.error({
                    message: 'An error has occurred while filling the form',
                  }),
                );
              } else {
                dispatch(
                  setIndividualProject({ key: 'stepOne', value: values }),
                );
                setPage(prevPage => prevPage + 1);
              }
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            className="naxatw-btn-primary naxatw-w-[4.75rem]"
            onClick={handleSaveBasicInfo}
            isLoading={loading}
            loaderClassName="naxatw-fill-secondary-400"
          >
            Save
          </Button>
        )}

        {tabname !== 'settings' &&
          (tabname === 'project-setup' ? (
            <Button
              onClick={() => {
                dispatch(
                  setIndividualProject({ key: 'stepOne', value: values }),
                );
                dispatch(togglePromptDialog('save-as-draft'));
              }}
              className=" naxatw-w-[8.875rem]  naxatw-text-[#00A699] naxatw-border-[1px] hover:naxatw-underline hover:naxatw-bg-grey-200"
            >
              Save Draft
            </Button>
          ) : (
            <Button
              className="naxatw-btn-secondary naxatw-w-[4.75rem]"
              onClick={handleSaveBasicInfo}
              isLoading={loading}
              loaderClassName="naxatw-fill-secondary-400"
            >
              Save
            </Button>
          ))}
      </div>
    </>
  );
};

export default BasicInfo;
