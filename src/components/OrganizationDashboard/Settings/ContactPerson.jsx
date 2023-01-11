/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import useForm from '@Hooks/useForm';
import Input from '@Components/common/Input/index';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import Button from '@Components/common/Button/index';
import { Creators } from '@Actions/organizationDashboard';

const {
  setContactPerson,
  postContactPersonRequest,
  patchContactPersonRequest,
} = Creators;

const initialContact = {
  name: '',
  position: '',
  email: '',
  contact: '',
};

const ContactPerson = () => {
  const { organizationId } = useParams();
  const dispatch = useDispatch();
  const contactPerson = useSelector(
    state => state.organizationDashboard.individualOrganization.contactPerson,
  );
  const deleteContact = id => {
    dispatch(
      patchContactPersonRequest(id, {
        is_deleted: 'True',
        type: 'organization',
      }),
    );
  };

  const { meta, values, handleChange, handleSubmit, resetFormState } = useForm({
    initialValues: initialContact,
    required: ['name', 'position'],
    onSubmit: data => {
      dispatch(
        postContactPersonRequest(
          { ...data, organization: organizationId },
          { organization: organizationId, type: 'organization' },
        ),
      );
      resetFormState();
    },
  });

  return (
    <>
      <h4>Contact Person Details</h4>
      <div className="">
        {contactPerson?.map(person => {
          return (
            <div
              onClick={() => deleteContact(person.id)}
              key={person.id}
              className="naxatw-flex  naxatw-px-4 naxatw-py-1 naxatw-mb-2 naxatw-justify-between naxatw-items-center naxatw-rounded-xl naxatw-border"
            >
              <span>{person.name}</span>
              <div className="hover:naxatw-bg-grey-100 naxatw-h-10 naxatw-w-10 naxatw-flex naxatw-justify-center naxatw-items-center naxatw-rounded-lg">
                <MaterialIcon
                  name="delete_outline"
                  className="naxatw-text-red-500 naxatw-cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
      <Input
        type="text"
        label="Name of contact Person"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Full Name"
      />
      {meta.name.error && meta.name.touched && (
        <span className="naxatw--mt-[10px] naxatw-text-red-500">
          Required field
        </span>
      )}

      <Input
        label="Position"
        type="text"
        name="position"
        value={values.position}
        onChange={handleChange}
        placeholder="Position"
      />
      {meta.position.error && meta.position.touched && (
        <span className="naxatw--mt-[10px] naxatw-text-red-500">
          Required field
        </span>
      )}

      <Input
        type="email"
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="example.com"
      />

      <Input
        label="Phone"
        type="text"
        name="contact"
        value={values.contact}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <Button
        className="naxatw-btn-secondary naxatw-btn-noborder"
        onClick={handleSubmit}
      >
        Save Contact Person
      </Button>
    </>
  );
};

export default ContactPerson;
