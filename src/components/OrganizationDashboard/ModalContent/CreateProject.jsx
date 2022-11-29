/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Creators, Types } from '@Actions/organizationDashboard';
import Input from '@Components/common/Input/index';
import Button from '@Components/common/Button/index';
import useForm from '@Hooks/useForm';
import { checkIfLoading } from '@Utils/loaderSelector';

const { postProjectInviteRequest } = Creators;

const initialState = {
  project_name: '',
  email: '',
};

const CreateProject = () => {
  const { organizationId } = useParams();
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.POST_PROJECT_INVITE_REQUEST]),
  );

  const dispatch = useDispatch();
  const { values, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: ['project_name', 'email'],
    onSubmit: data => {
      const newEmail = data.email.split(',');
      const newData = {
        ...data,
        email: newEmail,
        organization: organizationId,
      };
      dispatch(postProjectInviteRequest(newData));
    },
  });
  return (
    <div className="naxatw-space-y-8">
      <h3>Basic Project Setup & Invitation</h3>
      <div className="naxatw-flex">
        <span className="naxatw-text-body-lg naxatw-text-center">
          Setup basic information of your project and assign a project manager.
          The project manager can then complete the full details.
        </span>
      </div>

      <Input
        type="text"
        label="Project Name*"
        placeholder="Enter Project Name"
        name="project_name"
        value={values.project_name}
        onChange={handleChange}
        {...inputProps}
      />
      <Input
        type="text"
        label="Email Invite"
        placeholder="Enter email address to invite project manager"
        name="email"
        value={values.email}
        onChange={handleChange}
        {...inputProps}
      />
      <div className="naxatw-flex naxatw-justify-center">
        <Button
          className="naxatw-btn-primary naxatw-mt-2 naxatw-w-[10.125rem]"
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSubmit}
        >
          Invite & Save
        </Button>
      </div>
    </div>
  );
};

export default CreateProject;
