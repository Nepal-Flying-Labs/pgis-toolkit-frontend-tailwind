/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators, Types } from '@Actions/organizations';
import useForm from '@Hooks/useForm';
import Button from '@Components/common/Button';
import Input from '@Components/common/Input/index';
import AvatarIcon from '@Assets/images/icons/avatar-icon.svg';
import { checkIfLoading } from '@Utils/loaderSelector';
import useWindowDimensions from '@Hooks/useWindowDimentions';
import getImageSource from '@Utils/getImageSource';
import useCustomUpload from '@Hooks/useCustomUpload';

const { createOrganizationRequest } = Creators;

const options = [
  {
    id: 1,
    name: 'Filter 1',
  },
  {
    id: 2,
    name: 'Filter 2',
  },
  {
    id: 3,
    name: 'Filter 3',
  },
];

const initialState = {
  organizationName: '',
  website: '',
  about: '',
  thematicArea: '',
  email: '',
};

export default function CreateAnOrganization() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.CREATE_ORGANIZATION_REQUEST]),
  );
  const [inputRef, onFileUpload] = useCustomUpload();
  const { height } = useWindowDimensions();
  const {
    values,
    meta,
    inputProps,
    handleChange,
    handleCustomChange,
    handleSubmit,
  } = useForm({
    initialValues: initialState,
    required: ['organizationName'],
    onSubmit: data => {
      if (Object.keys(emailList).length > 0) {
        const payload = {
          organization_name: data.organizationName,
          email: emailList.map(e => e.value),
        };
        dispatch(createOrganizationRequest(payload));
      } else {
        setEmailError(true);
      }
    },
  });
  const onChangeFileUpload = e => {
    const uploadedFileObject = [];
    const { files } = e.target;
    const image = URL.createObjectURL(files[0]);
    files[0].image = image;
    handleCustomChange('cover_image', files[0]);
  };

  // const [uploadFile, setUploadFile] = useState(null);
  // const onChangeFileUpload = e => {
  //   const { files } = e.target;
  //   const file = files[0];
  //   const uploadedFileObject = {
  //     name: file.name,
  //     size: file.size,
  //     type: file.type,
  //     lastModifiedDate: file.lastModifiedDate,
  //     image: URL.createObjectURL(files[0]),
  //   };
  //   // onChange(file);
  //   setUploadFile(uploadedFileObject);
  // };

  return (
    <div>
      <div
        className="naxatw-px-4 naxatw-pb-4 naxatw-space-y-7 naxatw-overflow-y-auto scrollbar
          naxatw-max-h-[calc(100vh-19rem)]"
      >
        <div className="naxatw-flex naxatw-gap-x-5">
          <div className="naxatw-w-full naxatw-space-y-7">
            <Input
              label="Name of Organization *"
              type="text"
              name="organizationName"
              placeholder="Enter name of organization"
              value={values.organizationName}
              onChange={handleChange}
              {...inputProps}
            />
            {meta.organizationName.error && meta.organizationName.touched && (
              <span className="naxatw--mt-[10px] naxatw-text-red-500">
                Required field
              </span>
            )}

            <Input
              label="Website"
              type="text"
              name="website"
              placeholder="example.com"
              value={values.website}
              onChange={handleChange}
              {...inputProps}
            />

            <div className="naxatw-space-y-2">
              <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[15px]">
                About
              </label>
              <textarea
                type="text"
                className="naxatw-block naxatw-w-full naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white focus:naxatw-border-gray-600 focus:naxatw-outline-none"
                name="about"
                placeholder="About the organization"
                value={values.about}
                onChange={handleChange}
                {...inputProps}
              />
            </div>

            {/* <div className="naxatw-space-y-2">
          <label className="naxatw-label">Thematic Focus Area*</label>
          <Select
            options={options}
            dataKey="name"
            placeholder="Choose"
            onChange={data => {
              handleCustomChange('thematicAreas', data.name);
            }}
            selected={values.thematicAreas}
          />
        </div> */}

            <div className="naxatw-space-y-2">
              <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[15px]">
                Invite User by Email *
              </label>
              <div className="naxatw-flex naxatw-items-center naxatw-relative">
                <input
                  type="text"
                  className="naxatw-block naxatw-w-full naxatw-h-12 naxatw-pr-3 naxatw-pl-[50px] naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gregrey-700 naxatw-focus:bg-white focus:naxatw-border-gray-600 focus:naxatw-outline-none"
                  name="email"
                  placeholder="Enter email address of organization admin"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      if (email) {
                        setEmailList(prev => [
                          ...prev,
                          {
                            id: Math.floor(Math.random() * 100),
                            value: email,
                          },
                        ]);
                        setEmail('');
                        setEmailError(false);
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
                    if (email) {
                      setEmailList(prev => [
                        ...prev,
                        {
                          id: Math.floor(Math.random() * 100),
                          value: email,
                        },
                      ]);
                      setEmail('');
                      setEmailError(false);
                    }
                  }}
                >
                  <i className="material-icons naxatw-text-[#40B449] naxatw-absolute naxatw-right-4 naxatw-top-3">
                    add
                  </i>
                </a>
              </div>
              {emailError && (
                <span className="naxatw--mt-[10px] naxatw-text-red-500">
                  Please add email
                </span>
              )}
              <div className="naxatw-flex naxatw-gap-x-2 naxatw-flex-wrap naxatw-gap-y-2 ">
                {emailList.map(item => (
                  <div
                    key={item.id}
                    className="naxatw-flex hover:naxatw- naxatw-justify-between naxatw-items-center hover:naxatw-border-[#484848] naxatw-cursor-pointer naxatw-gap-x-2 naxatw-rounded-3xl naxatw-border naxatw-border-[#D7D7D7] naxatw-bg-[#F5F5F5] naxatw-px-3 naxatw-py-[7px]"
                  >
                    <p className="naxatw-text-[#484848]">{item.value}</p>

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
          </div>
          <div className="naxatw-w-32 naxatw-min-w-32">
            {/* <div className="naxatw-w-full naxatw-flex naxatw-items-center naxatw-justify-center"> */}
            <img
              src={
                values?.cover_image
                  ? getImageSource(values.cover_image)
                  : AvatarIcon
              }
              alt="img"
              className="naxatw-w-32 naxatw-min-w-32 naxatw-h-[6rem] naxatw-min-h-[6rem] naxatw-object-cover naxatw-border naxatw-rounded-full"
            />
            {/* </div> */}
            {/* <div className="naxatw-w-full naxatw-justify-center"> */}
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
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={e => onChangeFileUpload(e)}
            />
            <Button
              className="naxatw-btn-secondary naxatw-btn-noborder naxatw-w-full naxatw-mt-1"
              onClick={() => handleCustomChange('cover_image', null)}
            >
              <span className="naxatw-text-[15px] naxatw-font-bold naxatw-text-[#00A699]">
                Remove
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-btn-primary naxatw-w-[128px]"
          isLoading={loading}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSubmit}
        >
          Invite & Save
        </Button>
      </div>
    </div>
  );
}
