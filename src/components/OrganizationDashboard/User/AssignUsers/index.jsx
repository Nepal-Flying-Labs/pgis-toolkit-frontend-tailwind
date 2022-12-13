/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import useForm from '@Hooks/useForm';
import Searchbar from '@Components/common/Searchbar/index';
import Button from '@Components/common/Button/index';
import Checkbox from './Checkbox/index';

const initialState = {
  email: '',
  assignAs: '',
  assignTo: '',
};

const userRoles = [
  {
    id: 'manager',
    name: 'Manager',
  },
  {
    id: 'editor',
    name: 'Editor',
  },
  {
    id: 'owner',
    name: 'Owner',
  },
  {
    id: 'admin ',
    name: 'Admin',
  },
];

const projects = [
  {
    id: 1,
    name: 'Transportation Management',
  },
  {
    id: 2,
    name: 'Disaster Relief',
  },
  {
    id: 3,
    name: 'Bicycle for educational Empowerment',
  },
  {
    id: 4,
    name: 'Bicycle for transportation',
  },
];

const AssignUsers = () => {
  const [emailList, setEmailList] = useState([]);
  const { values, inputProps, handleChange, handleCustomChange, handleSubmit } =
    useForm({
      initialValues: initialState,
    });
  return (
    <div className="naxatw-w-[670px] naxatw-mx-auto ">
      <div className="naxatw-space-y-7">
        <div className="naxatw-space-y-2 naxatw-pt-5">
          <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[15px]">
            Assign User
          </label>
          <div className="naxatw-flex naxatw-items-center naxatw-relative">
            <input
              type="text"
              className="naxatw-block naxatw-w-full naxatw-h-12 naxatw-pr-3 naxatw-pl-[50px] naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white  naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded-md naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gregrey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
              name="email"
              placeholder="Select user's email or name"
              value={values.email}
              onChange={handleChange}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  if (values.email) {
                    setEmailList(prev => [
                      ...prev,
                      {
                        id: Math.floor(Math.random() * 100),
                        value: values.email,
                      },
                    ]);
                  }
                }
              }}
              {...inputProps}
            />
            <span className="material-icons naxatw-absolute naxatw-left-[13px]">
              mail_outline
            </span>
            <a
              type="submit"
              className="naxatw-text-2xl naxatw-ml-2 naxatw-cursor-pointer naxatw-select-none"
              onClick={() => {
                if (values.email) {
                  setEmailList(prev => [
                    ...prev,
                    {
                      id: Math.floor(Math.random() * 100),
                      value: values.email,
                    },
                  ]);
                }
              }}
            >
              <i className="material-icons naxatw-text-[#40B449] naxatw-absolute naxatw-right-4 naxatw-top-3">
                add
              </i>
            </a>
          </div>

          <div className="naxatw-flex naxatw-gap-x-2 naxatw-flex-wrap naxatw-gap-y-2 ">
            {emailList.map(item => (
              <div
                key={item.id}
                className="naxatw-flex naxatw-justify-between naxatw-items-center naxatw-gap-x-2 naxatw-rounded-3xl naxatw-bg-[#D7D7D7] naxatw-px-3 naxatw-py-[7px]"
              >
                <p className="naxatw-text-[#484848]">{item.value}</p>

                <i
                  className="material-icons naxatw-text-lg naxatw-text-[#484848] naxatw-cursor-pointer"
                  onClick={() => {
                    setEmailList(
                      emailList.filter(email => email.id !== item.id),
                    );
                  }}
                >
                  close
                </i>
              </div>
            ))}
          </div>
        </div>
        <div className="naxatw-flex naxatw-gap-x-5">
          <div className="naxatw-space-y-2 naxatw-pt-5 naxatw-basis-1/2">
            <label>Assign as</label>
            <div className="naxatw-space-y-2">
              <Searchbar
                className="naxatw-h-[40px]"
                placeholder="Search Role"
              />
              <div className="naxatw-w-full naxatw-space-y-5  naxatw-rounded-2xl naxatw-border naxatw-border-[#D7D7D7] naxatw-px-3 naxatw-py-2 naxatw-max-h-[300px] naxatw-overflow-x-auto scrollbar">
                {userRoles.map(roles => (
                  <Checkbox id={roles.id} label={roles.name} />
                ))}
              </div>
            </div>
          </div>
          <div className="naxatw-space-y-2 naxatw-pt-5 naxatw-basis-1/2">
            <label>Assign as</label>
            <div className="naxatw-space-y-2">
              <Searchbar
                className="naxatw-h-[40px]"
                placeholder="Search Projects"
              />
              <div className="naxatw-w-full naxatw-space-y-5  naxatw-rounded-2xl naxatw-border naxatw-border-[#D7D7D7] naxatw-px-3 naxatw-py-2 naxatw-max-h-[300px] naxatw-overflow-x-auto scrollbar">
                {projects.map(project => (
                  <Checkbox id={project.id} label={project.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="naxatw-mt-5 naxatw-flex naxatw-justify-center">
          <Button className="naxatw-w-[86px] naxatw-btn-primary">Assign</Button>
        </div>
      </div>
    </div>
  );
};

export default AssignUsers;
