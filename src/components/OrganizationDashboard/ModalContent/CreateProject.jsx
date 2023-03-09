/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Creators, Types } from '@Actions/organizationDashboard';
import Input from '@Components/common/Input/index';
import Button from '@Components/common/Button/index';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import useForm from '@Hooks/useForm';
import { checkIfLoading } from '@Utils/loaderSelector';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import CustomInput from '@Components/common/CustomInput/index';
import { isEmpty } from '@Utils/commonUtils';

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
  const [emailList, setEmailList] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [errors, setErrors] = useState([]);
  const { values, inputProps, handleChange, handleSubmit } = useForm({
    initialValues: initialState,
    onSubmit: data => {
      const error = [];
      if (!values.project_name) {
        error.push('project_name');
      }
      if (isEmpty(emailList)) {
        error.push('emailList');
      }
      setErrors(error);
      if (isEmpty(error)) {
        const newData = {
          ...data,
          email: emailList.map(e => e.value),
          organization: organizationId,
        };
        dispatch(postProjectInviteRequest(newData));
      }
    },
  });

  return (
    <div className="naxatw-space-y-8">
      {/* <h3>Basic Project Setup & Invitation</h3> */}
      <div className="naxatw-flex">
        <span className="naxatw-text-body-lg ">
          To get started, please provide the basic details of the project and
          designate a Project Manager. The designated Project Manager will then
          have the authority to fully set up the project.
        </span>
      </div>
      <div>
        <Input
          type="text"
          label="Project Name*"
          placeholder="Enter Project Name"
          name="project_name"
          value={values.project_name}
          onChange={handleChange}
          {...inputProps}
        />
        {errors.includes('project_name') && (
          <FormErrorMessage message="Please Provide Project Name" />
        )}
      </div>

      <CustomInput
        emailList={emailList}
        setEmailList={setEmailList}
        emailError={errors.includes('emailList')}
        setEmailError={data =>
          !data
            ? setErrors(errors.filter(item => item !== 'emailList'))
            : () => {}
        }
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
