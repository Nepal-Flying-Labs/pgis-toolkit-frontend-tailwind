import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import toastActions from '@Actions/toast';
import MaterialIcon from '../MaterialIcon/index';
import FormErrorMessage from '../FormErrorMessage/index';

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const result = pattern.test(email);
  return result;
}

const CustomInput = ({
  setEmailList,
  emailError,
  setEmailError,
  emailList,
}) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="naxatw-space-y-2">
      <div>
        <label className="naxatw-w-full naxatw-flex naxatw-font-bold naxatw-text-grey-800 naxatw-tracking-wider naxatw-text-[15px]">
          Invite User by Email *
        </label>
      </div>
      <div className="naxatw-relative">
        <input
          type="text"
          label="Email Invite"
          className="naxatw-block naxatw-w-full naxatw-h-12 naxatw-pr-3 naxatw-pl-[50px] naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-gregrey-700 naxatw-focus:bg-white focus:naxatw-border-gray-600 focus:naxatw-outline-none"
          placeholder="Enter email address of the Project Manager"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (email && validateEmail(email)) {
                setEmailList(prev => [
                  ...prev,
                  { id: Math.floor(Math.random() * 100), value: email },
                ]);
                setEmail('');
                setEmailError(false);
              } else {
                dispatch(
                  toastActions.error({
                    message: 'Please provide a valid email address',
                  }),
                );
              }
            }
          }}
        />
        <span
          className="material-icons naxatw-absolute naxatw-left-[13px] naxatw-top-3 naxatw-cursor-pointer"
          title="Email"
        >
          mail_outline
        </span>
        <a
          onClick={() => {
            if (email && validateEmail(email)) {
              setEmailList(prev => [
                ...prev,
                { id: Math.floor(Math.random() * 100), value: email },
              ]);
              setEmail('');
              setEmailError(false);
            } else {
              dispatch(
                toastActions.error({
                  message: 'Please provide a valid email address',
                }),
              );
            }
          }}
        >
          <div
            id="add-icon"
            className="naxatw-absolute naxatw-right-4 naxatw-top-3"
          >
            <MaterialIcon
              name="add"
              title="Add Email"
              className="naxatw-text-[#40B449]  naxatw-text-icon-md"
            />
          </div>
        </a>
      </div>
      {email && (
        <div>
          <p>Press enter or click plus (+) button to add email</p>
        </div>
      )}

      {emailError && <FormErrorMessage message="Please add Email" />}
      <div className="naxatw-flex naxatw-gap-x-2 naxatw-flex-wrap naxatw-gap-y-2 naxatw-mt-2  ">
        {emailList.map(item => (
          <div
            key={item.id}
            className="naxatw-flex naxatw-justify-between hover:naxatw-border-[#484848] naxatw-cursor-pointer nax naxatw-items-center naxatw-gap-x-2 naxatw-rounded-3xl naxatw-border naxatw-border-[#D7D7D7] naxatw-bg-[#F5F5F5] naxatw-px-3 naxatw-py-[7px]"
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
  );
};

CustomInput.propTypes = {
  setEmailList: PropTypes.func,
  emailList: PropTypes.array,
  emailError: PropTypes.bool,
  setEmailError: PropTypes.func,
};

CustomInput.defaultProps = {
  setEmailList: () => {},
  emailList: [],
  emailError: false,
  setEmailError: () => {},
};

export default CustomInput;
