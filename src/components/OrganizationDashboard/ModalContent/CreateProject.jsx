/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Creators, Types } from '@Actions/organizationDashboard';
import Input from '@Components/common/Input/index';
import Button from '@Components/common/Button/index';
import useForm from '@Hooks/useForm';
import { checkIfLoading } from '@Utils/loaderSelector';
import MaterialIcon from '@Components/common/MaterialIcon/index';

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
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const { meta, values, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    required: ['project_name'],
    onSubmit: data => {
      if (Object.keys(emailList).length > 0) {
        const newData = {
          ...data,
          email: emailList.map(e => e.value),
          organization: organizationId,
        };
        dispatch(postProjectInviteRequest(newData));
      } else {
        setEmailError(true);
      }
    },
  });

  return (
    <div className="naxatw-space-y-8">
      <h3>Basic Project Setup & Invitation</h3>
      <div className="naxatw-flex">
        <span className="naxatw-text-body-lg ">
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
      {meta.project_name.error && meta.project_name.touched && (
        <span className="naxatw--mt-[10px] naxatw-text-red-500">
          Required field
        </span>
      )}
      <div className="naxatw-relative">
        <input
          type="text"
          label="Email Invite"
          className="naxatw-block naxatw-w-full naxatw-h-12 naxatw-pr-3 naxatw-pl-[50px] naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gregrey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
          placeholder="Enter email address to invite project manager"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (email) {
                setEmailList(prev => [
                  ...prev,
                  { id: Math.floor(Math.random() * 100), value: email },
                ]);
                setEmail('');
                setEmailError(false);
              }
            }
          }}
          {...inputProps}
        />
        <span className="material-icons naxatw-absolute naxatw-left-[13px] naxatw-top-3">
          mail_outline
        </span>
        <a
          onClick={() => {
            if (email) {
              setEmailList(prev => [
                ...prev,
                { id: Math.floor(Math.random() * 100), value: email },
              ]);
              setEmail('');
              setEmailError(false);
            }
          }}
        >
          <MaterialIcon
            name="add"
            className="naxatw-text-[#40B449] naxatw-absolute naxatw-right-4 naxatw-top-3 naxatw-text-icon-md"
          />
        </a>
        {emailError && (
          <span className="naxatw--mt-[10px] naxatw-text-red-500">
            Please add email
          </span>
        )}
        <div className="naxatw-flex naxatw-gap-x-2 naxatw-flex-wrap naxatw-gap-y-2 naxatw-mt-2  ">
          {emailList.map(item => (
            <div
              key={item.id}
              className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-gap-x-2 naxatw-rounded-3xl naxatw-border naxatw-border-[#D7D7D7] naxatw-bg-[#F5F5F5] naxatw-px-3 naxatw-py-[7px]"
            >
              <p className="naxatw-text-[#484848]">{item.value}</p>

              <i
                className="material-icons naxatw-text-body-lg naxatw-text-[#484848] naxatw-cursor-pointer naxatw-h-[18px] naxatw-w-[18px]"
                onClick={() => {
                  setEmailList(emailList.filter(e => e.id !== item.id));
                }}
              >
                close
              </i>
            </div>
          ))}
        </div>
      </div>

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
