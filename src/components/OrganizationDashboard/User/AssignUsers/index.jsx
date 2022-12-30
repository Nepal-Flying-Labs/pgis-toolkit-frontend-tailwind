/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Creators, Types } from '@Actions/organizationDashboard';
import {
  assignProjectListSelector,
  assignRoleListSelector,
} from '@Selectors/organizationDashboard';
import { checkIfLoading } from '@Utils/loaderSelector';
import Searchbar from '@Components/common/Searchbar/index';
import MultiSelect from '@Components/common/MultiSelect/index';
import Button from '@Components/common/Button/index';
import FormErrorMessage from '@Components/common/FormErrorMessage/index';
import Spinner from '@Components/common/Spinner';
import Checkbox from './Checkbox/index';

const { getAllProjectRequest, setAssignList, postAssignUserRequest } = Creators;

const validation = data => {
  const errors = {};

  if (data.email.length < 1) {
    errors.email = 'Please add a email';
  }

  if (data.group.length < 1) {
    errors.group = 'Please select a role';
  }

  // if (data?.project.length < 1) {
  //   errors.project = 'Please select project';
  // }

  return errors;
};

const AssignUsers = () => {
  const { organizationId } = useParams();
  const assignList = useSelector(assignProjectListSelector);
  const userList = useSelector(state => state.organizationDashboard.users);
  const userRoles = useSelector(assignRoleListSelector);
  const organizationDetails = useSelector(
    state => state.organizationDashboard.organizationDetail,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.POST_ASSIGN_USER_REQUEST]),
  );
  const userListLoading = useSelector(state =>
    checkIfLoading(state, [
      Types.GET_ALL_PROJECT_REQUEST,
      Types.SET_ASSIGN_LIST,
    ]),
  );
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('assign');
  const [errors, setErrors] = useState(null);
  const [email, setEmail] = useState('');
  const [roleSearchText, setRoleSearchText] = useState('');
  const [projectSearchText, setProjectSearchText] = useState('');
  const [selectedRolesList, setSelectedRolesList] = useState(userRoles);
  const [selectedProjectList, setSelectedProjectList] = useState(assignList);
  const [emailList, setEmailList] = useState([]);

  const handleSubmit = () => {
    const data = {
      email: emailList,
      group: selectedRolesList.filter(list => list.checked),
    };
    const error = validation(data);
    setErrors(error);

    if (Object.keys(error).length < 1) {
      const userRole = selectedRolesList.filter(list => list.checked)[0].id;
      const projectList = selectedProjectList.filter(list => list.checked)[0]
        .id;

      if (userRole === 2) {
        dispatch(
          postAssignUserRequest({
            organization: organizationDetails.id,
            group: userRole,
            email: emailList.map(e => e.email),
          }),
        );
      } else {
        dispatch(
          postAssignUserRequest({
            organization: organizationDetails.id,
            group: userRole,
            project: projectList,
            email: emailList.map(e => e.email),
          }),
        );
      }
    }
  };

  const handleCheckboxClick = data => {
    const newData = selectedRolesList.map(list => {
      const { checked } = list;
      return list.id === data.id
        ? { ...list, checked: !checked }
        : { ...list, checked: false };
    });
    setSelectedRolesList(newData);
    if (data.id !== 2) {
      dispatch(
        getAllProjectRequest({
          organization: organizationId,
          paginate: 'False',
        }),
      );
    } else {
      dispatch(
        setAssignList({
          id: organizationDetails?.id,
          name: organizationDetails?.name,
        }),
      );
    }
  };

  useEffect(() => {
    setSelectedProjectList(assignList);
  }, [assignList]);

  const handleProjectCheckboxClick = data => {
    const newData = selectedProjectList.map(list => {
      const { checked } = list;
      return list.id === data.id
        ? { ...list, checked: !checked }
        : { ...list, checked: false };
    });
    setSelectedProjectList(newData);
  };

  return (
    <div className="naxatw-w-[670px] naxatw-mx-auto ">
      <div className="naxatw-space-y-7">
        <div className=" naxatw-block naxatw-border-b naxatw-w-fit">
          <ul className="naxatw-flex naxatw-gap-x-2 ">
            <li className="">
              {' '}
              <a
                className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-[13px] naxatw-leading-[18px] naxatw-font-bold ${
                  activeTab === 'assign'
                    ? 'naxatw-border-b-[2px] naxatw-border-[#484848] naxatw-text-[#484848]'
                    : 'naxatw-text-[#989898] hover:naxatw-text-[#00A699]'
                }`}
                onClick={() => {
                  setEmailList([]);
                  setActiveTab('assign');
                }}
              >
                Assign
              </a>
            </li>
            <li className="">
              {' '}
              <a
                className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-[13px] naxatw-leading-[18px] naxatw-font-bold ${
                  activeTab === 'invite'
                    ? 'naxatw-border-b-[2px] naxatw-border-[#484848] naxatw-text-[#484848]'
                    : 'naxatw-text-[#989898] hover:naxatw-text-[#00A699]'
                }`}
                onClick={() => {
                  setEmailList([]);
                  setActiveTab('invite');
                }}
              >
                Invite
              </a>
            </li>
          </ul>
        </div>
        {/* Assign Users */}
        {activeTab === 'assign' && (
          <div className="naxatw-space-y-2 naxatw-pt-2">
            <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[13px]">
              Assign User
            </label>
            <MultiSelect
              options={userList?.filter(i => i.active)}
              placeholder="Choose User"
              field="full_name"
              onChange={data => {
                setEmailList(data);
              }}
              selected={userList.filter(item =>
                emailList.map(e => e.id).includes(item.id),
              )}
            />
            {errors && <FormErrorMessage message={errors.email} />}
          </div>
        )}

        {/* Invite Users */}
        {activeTab === 'invite' && (
          <div className="naxatw-space-y-2 naxatw-pt-2">
            <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[13px]">
              Invite User
            </label>
            <div className="naxatw-flex naxatw-items-center naxatw-relative">
              <input
                type="text"
                className="naxatw-block naxatw-w-full naxatw-h-12 naxatw-pr-3 naxatw-pl-[50px] naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white  naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded-md naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gregrey-700 naxatw-focus:bg-white focus:naxatw-border-gray-600 focus:naxatw-outline-none"
                name="email"
                placeholder="Select user's email or name"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    if (email) {
                      setEmailList(prev => [
                        ...prev,
                        {
                          id: Math.floor(Math.random() * 100),
                          email,
                        },
                      ]);
                      setEmail('');
                    }
                  }
                }}
              />

              <span className="material-icons naxatw-absolute naxatw-left-[13px]">
                mail_outline
              </span>
              <a
                type="submit"
                className="naxatw-text-2xl naxatw-ml-2 naxatw-cursor-pointer naxatw-select-none"
                onClick={() => {
                  if (email) {
                    setEmailList(prev => [
                      ...prev,
                      {
                        id: Math.floor(Math.random() * 100),
                        email,
                      },
                    ]);
                    setEmail('');
                  }
                }}
              >
                <i className="material-icons naxatw-text-[#40B449] naxatw-absolute naxatw-right-4 naxatw-top-3">
                  add
                </i>
              </a>
            </div>
            {errors && <FormErrorMessage message={errors.email} />}
            <div className="naxatw-flex naxatw-gap-x-2 naxatw-flex-wrap naxatw-gap-y-2 ">
              {emailList.map(item => (
                <div
                  key={item.id}
                  className="naxatw-flex naxatw-justify-between naxatw-items-center hover:naxatw-border-[#484848] naxatw-cursor-pointer naxatw-gap-x-2 naxatw-rounded-3xl naxatw-bg-[#F5F5F5] naxatw-border naxatw-border-[#D7D7D7] naxatw-px-3 naxatw-py-[7px]"
                >
                  <p className="naxatw-text-[#484848]">{item.email}</p>

                  <i
                    className="material-icons naxatw-text-lg naxatw-text-[#484848] naxatw-cursor-pointer"
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
        )}

        {/* Select Roles and Project */}
        <div className="naxatw-flex naxatw-gap-x-5">
          <div className="naxatw-space-y-2 naxatw-pt-5 naxatw-basis-1/2">
            <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[13px]">
              Assign as
            </label>
            <div className="naxatw-space-y-2">
              <Searchbar
                isSmall
                className="naxatw-h-[40px] naxatw-bg-grey-100"
                placeholder="Search Role"
                value={roleSearchText}
                onChange={e => setRoleSearchText(e.target.value)}
              />
              <div className="naxatw-w-full naxatw-space-y-5  naxatw-rounded-2xl naxatw-border naxatw-border-[#D7D7D7] naxatw-px-3 naxatw-py-2 naxatw-min-h-[200px] naxatw-max-h-[200px] naxatw-overflow-x-auto scrollbar">
                {selectedRolesList
                  .filter(i => i.name?.toLowerCase()?.includes(roleSearchText))
                  .map(roles => (
                    <Checkbox
                      key={roles.id}
                      id={roles.id}
                      label={roles.name?.replaceAll('_', ' ')?.toLowerCase()}
                      onClick={() => handleCheckboxClick(roles)}
                      checked={roles.checked}
                    />
                  ))}
              </div>
            </div>
            {errors && <FormErrorMessage message={errors.group} />}
          </div>
          <div className="naxatw-space-y-2 naxatw-pt-5 naxatw-basis-1/2">
            <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[13px]">
              Assign to
            </label>
            <div className="naxatw-space-y-2">
              <Searchbar
                isSmall
                className="naxatw-h-[40px] naxatw-bg-grey-100"
                placeholder="Search Projects"
                value={projectSearchText}
                onChange={e => setProjectSearchText(e.target.value)}
              />
              <div className="naxatw-w-full naxatw-space-y-5  naxatw-rounded-2xl naxatw-border naxatw-border-[#D7D7D7] naxatw-px-3 naxatw-py-2 naxatw-max-h-[200px] naxatw-min-h-[200px] naxatw-overflow-x-auto scrollbar">
                {!userListLoading ? (
                  selectedRolesList
                    ?.map(list => list.checked)
                    ?.includes(true) ? (
                    selectedProjectList
                      .filter(i =>
                        i.name?.toLowerCase()?.includes(projectSearchText),
                      )
                      .map(project => (
                        <Checkbox
                          key={project.id}
                          id={project.id}
                          label={project.name}
                          checked={project.checked}
                          onClick={() => handleProjectCheckboxClick(project)}
                        />
                      ))
                  ) : (
                    <div className="naxatw-h-full naxatw-w-full naxatw-flex naxatw-items-center naxatw-justify-center">
                      <span className="naxatw-text-body-lg ">
                        Select User Role
                      </span>
                    </div>
                  )
                ) : (
                  <div className="naxatw-flex naxatw-h-full naxatw-items-center naxatw-justify-center">
                    <Spinner className="naxatw-w-8 naxatw-h-8 naxatw-fill-primary-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="naxatw-mt-5 naxatw-flex naxatw-justify-center">
          <Button
            className="naxatw-w-[86px] naxatw-btn-primary"
            isLoading={loading}
            loaderClassName="naxatw-fill-secondary-400"
            onClick={handleSubmit}
          >
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignUsers;
