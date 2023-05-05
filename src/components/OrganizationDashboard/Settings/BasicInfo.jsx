/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@Components/common/Input';
import MultiSelect from '@Components/common/MultiSelect/index';
import { Creators, Types } from '@Actions/organizationDashboard';
// import { Creators as CommonCreators } from '@Actions/common';
import Button from '@Components/common/Button';
import UploadPhotos from '@Components/common/UploadPhotos/index';
import removeObjectKeys from '@Utils/removeObjectKeys';
import useForm from '@Hooks/useForm';
import { checkIfLoading } from '@Utils/loaderSelector';
// import { format } from 'date-fns';
import toastActions from '@Actions/toast';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import getImageSource from '@Utils/getImageSource';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import useCustomUpload from '@Hooks/useCustomUpload';
import { isEmpty } from '@Utils/commonUtils';
import TextArea from '@Components/common/TextArea/index';
import CustomMultiSelect from '../ProjectSetup/CustomMultiSelect/index';

// import ContactPerson from './ContactPerson';
// import ContactPerson from './ContactPerson';

const {
  updateOrganizationRequest,
  postContactPersonRequest,
  patchContactPersonRequest,
} = Creators;
// const { togglePromptDialog } = CommonCreators;

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

const BasicInfo = () => {
  const { organizationId } = useParams();
  const [inputRef, onFileUpload] = useCustomUpload();
  const [errorFields, setErrorFields] = useState({});

  const dispatch = useDispatch();
  const project = useSelector(
    state => state.organizationDashboard.individualProject.project,
  );
  const settingInfo = useSelector(
    state => state.organizationDashboard.individualOrganization.item,
  );

  const loading = useSelector(state =>
    checkIfLoading(state, [
      Types.UPDATE_ORGANIZATION_REQUEST,
      Types.POST_CONTACT_PERSON_REQUEST,
      Types.PATCH_CONTACT_PERSON_REQUEST,
    ]),
  );

  const { values, setValues, handleChange, handleCustomChange } = useForm({
    initialValues: settingInfo,
    required: ['name'],
    onSubmit: data => {},
  });

  const contactPerson = useSelector(
    state => state.organizationDashboard.individualOrganization.contactPerson,
  );

  useEffect(() => {
    if (!isEmpty(settingInfo) && !isEmpty(contactPerson))
      setValues({ ...settingInfo, contact_person: contactPerson });
  }, [setValues, settingInfo, contactPerson]);

  const validation = formValues => {
    const errors = {};
    if (!formValues.name) errors.name = 'This field is required';

    if (formValues.thematic_areas.length < 1)
      errors.thematic_areas = 'This field is required';

    // if (formValues.description && formValues.description?.length > 252)
    //   errors.description = 'Ensure this field has no more than 252 characters';

    if (formValues.link) {
      // eslint-disable-next-line prefer-regex-literals
      const WebsitePattern = new RegExp(
        '(https?://)([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
      );
      const result = WebsitePattern.test(formValues.link);
      if (!result) errors.link = 'Enter a valid URL';
    }

    if (formValues.email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const result = pattern.test(formValues.email);
      if (!result) errors.email = 'Enter a valid Email';
    }
    if (!formValues.contact_person.name) {
      errors.contactName = 'Contact Name is required';
    }

    if (!formValues.contact_person.email) {
      errors.contactEmail = 'Contact Email is required';
    }

    if (formValues.contact) {
      const pattern = /^[0-9\b]+$/;
      const result = pattern.test(formValues.contact);
      if (!result) errors.contact = 'Enter a valid Contact number';
    }
    if (formValues.contact_person.name && formValues.contact_person.email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const result = pattern.test(formValues.contact_person.email);
      if (!result) errors.contactEmail = 'Enter a valid Email';
    }

    // if (formValues.contact_person.name && formValues.contact_person.contact) {
    //   const pattern = /^[0-9\b]+$/;
    //   const result = pattern.test(formValues.contact_person.contact);
    //   if (!result) {
    //     errors.contactContact = 'Enter a valid contact number';
    //   } else {
    //     formValues.contact_person.contact.length < 7 ||
    //     formValues.contact_person.contact.length > 15
    //       ? (errors.contactContact = 'Enter a valid contact number')
    //       : '';
    //   }
    // }

    if (formValues.contactName && formValues.contactPhone) {
      const pattern = /^[+\-()# \d]+$/;
      const result = pattern.test(formValues.contactPhone);
      if (!result) {
        errors.contactPhone = 'Enter a valid contact number';
      } else {
        formValues.contactPhone.length < 7 ||
        formValues.contactPhone.length > 20
          ? (errors.contactPhone = 'Enter a valid contact number')
          : '';
      }
    }

    if (
      (formValues.contact_person.email ||
        formValues.contact_person.contact ||
        formValues.contact_person.position) &&
      !formValues.contact_person.name
    ) {
      errors.contactName = 'Name field is required';
    }

    return errors;
  };

  const handleSubmit = () => {
    if (loading) return;
    const error = validation(values);
    if (Object.keys(error).length < 1) {
      setErrorFields({});
      const diffObj = diffObject(settingInfo, values);
      const orgInfo = removeObjectKeys(diffObj, ['contact_person']);

      dispatch(updateOrganizationRequest(organizationId, orgInfo));

      const contactInfo = diffObject(contactPerson, values.contact_person);

      if (Object.keys(contactInfo).length > 0) {
        if (values.contact_person.contactId) {
          validateContactPerson(values.contact_person)
            ? dispatch(
                patchContactPersonRequest(values.contact_person.contactId, {
                  ...contactInfo,
                }),
              )
            : dispatch(
                patchContactPersonRequest(values.contact_person.contactId, {
                  is_deleted: true,
                }),
              );
        } else {
          dispatch(
            postContactPersonRequest(
              {
                ...values.contact_person,
                organization: organizationId,
              },
              {
                organization: organizationId,
              },
            ),
          );
        }
      }
    } else {
      setErrorFields(error);
      dispatch(
        toastActions.error({
          message: 'An error has occurred while filling the form.',
        }),
      );
    }
  };

  const onChangeFileUpload = e => {
    const { files } = e.target;
    const image = URL.createObjectURL(files[0]);
    files[0].image = image;
    handleCustomChange('cover_image', files[0]);
  };

  const handleContactPersonValues = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      contact_person: { ...values.contact_person, [name]: value },
    });
  };

  return (
    <>
      <div className="naxatw-flex">
        <span className="naxatw-text-body-lg naxatw-text-start">
          You can update the organization's profile information.
        </span>
      </div>
      <div className="naxatw-flex naxatw-gap-x-5">
        <div className="naxatw-w-full naxatw-space-y-7">
          <div className="naxatw-space-y-2">
            <Input
              type="text"
              label="Name of Organization*"
              name="name"
              value={values?.name}
              onChange={handleChange}
              placeholder="Enter name of organization"
            />
            {errorFields?.name && (
              <FormErrorMessage message={errorFields.name} />
            )}
          </div>

          <div className="naxatw-space-y-2">
            {/* <Input
              type="textarea"
              label="About Organization"
              className="naxatw-h-[77px] naxatw-pb-8"
              name="description"
              value={values?.description || ''}
              onChange={handleChange}
              placeholder="Write a short summary of an organization"
            /> */}
            <TextArea
              label="About Organization"
              name="description"
              value={values?.description || ''}
              onChange={handleChange}
              placeholder="Write a short summary of an organization"
            />
            {errorFields?.description && (
              <FormErrorMessage message={errorFields.description} />
            )}
          </div>
        </div>
        <div className="naxatw-w-32 naxatw-min-w-32">
          {/* <div className="naxatw-w-full naxatw-flex naxatw-items-center naxatw-justify-center"> */}
          <img
            src={values?.cover_image ? values.cover_image.image : AvatarIcon}
            alt="img"
            className="naxatw-w-32 naxatw-min-w-[128px] naxatw-max-w-32 naxatw-h-32 naxatw-min-h-32 naxatw-max-h-32 naxatw-object-cover naxatw-overflow-hidden naxatw-border naxatw-rounded-full"
          />
          <Button
            className="naxatw-btn-secondary naxatw-w-full naxatw-mt-5"
            onClick={onFileUpload}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Upload
            </span>
          </Button>
          {/* </div> */}
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={e => onChangeFileUpload(e)}
          />
          <Button
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-w-full naxatw-mt-1"
            onClick={() => handleCustomChange('cover_image', '')}
          >
            <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
              Remove
            </span>
          </Button>
        </div>
      </div>
      <div className="naxatw-flex naxatw-gap-x-2">
        <div className="naxatw-w-1/2">
          <Input
            type="text"
            label="Address"
            name="address"
            value={values?.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>
        <div className="naxatw-w-1/2 naxatw-space-y-2">
          <Input
            type="text"
            label="Email"
            name="email"
            value={values?.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
          {errorFields?.email && (
            <FormErrorMessage message={errorFields.email} />
          )}
        </div>
      </div>
      <div className="naxatw-flex naxatw-gap-x-2">
        <div className="naxatw-w-1/2 naxatw-space-y-2">
          <Input
            type="text"
            label="Contact number"
            name="contact"
            value={values?.contact}
            onChange={handleChange}
            placeholder="Contact number"
          />
          {errorFields?.contact && (
            <FormErrorMessage message={errorFields.contact} />
          )}
        </div>
        <div className="naxatw-w-1/2 naxatw-space-y-2">
          <Input
            type="text"
            label="Website"
            name="link"
            value={values?.link}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
          {errorFields?.link && <FormErrorMessage message={errorFields.link} />}
        </div>
      </div>
      {/* <div className="naxatw-space-y-2">
        <label className="naxatw-label">Upload Cover Image</label>
        <UploadPhotos
          label="coverImage"
          uploadedFile={values?.cover_image || []}
          accept="image/*"
          onChange={images => {
            handleCustomChange('cover_image', images);
          }}
        />
      </div> */}
      <Input
        type="text"
        label="Organization Size"
        name="size"
        value={values?.size}
        onChange={handleChange}
        placeholder="Organization size"
      />

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
        {errorFields?.thematic_areas && (
          <FormErrorMessage message={errorFields.thematic_areas} />
        )}
      </div>
      <hr />
      {/* <ContactPerson /> */}
      <div className="naxatw-space-y-5">
        <h4>Contact Person Details</h4>
        <div className="naxatw-space-y-2">
          <Input
            type="text"
            label="Name of contact person*"
            name="name"
            value={values?.contact_person?.name || ''}
            onChange={handleContactPersonValues}
            placeholder="Full Name"
          />
          {errorFields?.contactName && (
            <FormErrorMessage message={errorFields.contactName} />
          )}
        </div>

        <div className="naxatw-space-y-2">
          <Input
            label="Position"
            type="text"
            name="position"
            value={values?.contact_person?.position || ''}
            onChange={handleContactPersonValues}
            placeholder="Position"
          />
          {/* {errorFields?.contactPosition && (
            <FormErrorMessage message={errorFields.contactPosition} />
          )} */}
        </div>

        <div className="naxatw-space-y-2">
          <Input
            type="email"
            label="Email*"
            name="email"
            value={values?.contact_person?.email || ''}
            onChange={handleContactPersonValues}
            placeholder="example@gmail.com"
          />
          {errorFields?.contactEmail && (
            <FormErrorMessage message={errorFields.contactEmail} />
          )}
        </div>

        <div className="naxatw-space-y-2">
          <Input
            label="Contact number"
            type="text"
            name="contact"
            value={values?.contact_person?.contact || ''}
            onChange={handleContactPersonValues}
            placeholder="Contact number"
          />
          {errorFields?.contactContact && (
            <FormErrorMessage message={errorFields.contactContact} />
          )}
        </div>
      </div>

      <div className="naxatw-flex naxatw-justify-center naxatw-pb-7 naxatw-pt-7">
        <Button
          className="naxatw-btn-primary naxatw-w-[4.75rem]"
          onClick={handleSubmit}
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default BasicInfo;
