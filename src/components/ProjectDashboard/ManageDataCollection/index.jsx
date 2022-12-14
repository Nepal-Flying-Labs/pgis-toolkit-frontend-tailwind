/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '@Components/common/Button/index';
import {Creators as CommonCreators} from '@Actions/common';
import Modal from '@Components/common/Modal/index';
import ManageAttributes from '@Components/ProjectDashboard/ModalContent/ManageAttributes/index';
import AddWMSLayer from '@Components/ProjectDashboard/ModalContent/AddWMSLayer/index';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';

const {toggleModal}=CommonCreators;

const getModalTitle=(content)=> {
  switch (content) {
    case 'add-wms-layer':
      return 'Add WMS Layer';
    case 'manage-attributes':
      return 'Manage Attributes';
    default:
      return '';
  }
}

const getModalContent=(content)=>{
  switch (content) {
    case 'add-wms-layer':
      return <AddWMSLayer />;
    case 'manage-attributes':
      return <ManageAttributes />;
    default:
      return '';
  }
}

const linkOptions = [
  {
    id: 1,
    name: 'Get Started & Manage Data',
  },
  {
    id: 2,
    name: 'Preparation for Data Collection',
  },
  {
    id: 3,
    name: 'Download Data & Template',
  },
];

const getContent = step => {
  switch (step) {
    case 1:
      return <StepOne />;
    case 2:
      return <StepTwo />;
    case 3:
      return <StepThree />;
    default:
      return '';
  }
};

const ManageDataCollection = () => {
  const dispatch=useDispatch();
  const modalContent=useSelector(state=>state.common.modalContent);
  const [active, setActive] = useState(1);
  const history = useHistory();
  return (
    <div>

<Modal
        show={!!modalContent}
        title={getModalTitle(modalContent)}
        onClose={() => dispatch(toggleModal())}
      >
        {getModalContent(modalContent)}
      </Modal>
      <div className="naxatw-flex naxatw-justify-between naxatw-px-10 naxatw-py-5 naxatw-border naxatw-border-b">
        <div className="naxatw-w-[712px]">
          <h3>Manage Data Collection</h3>
          <span className="naxatw-text-body-lg ">
            Data Management is an integral component of USAFIRI. This allows
            users to import data in multiple ways, store datasets and manage the
            datasets properly.
          </span>
        </div>

        <div>
          <button
            type="button"
            onClick={() => history.goBack()}
            className="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center naxatw-"
          >
            <i className="material-icons">close</i>
            <span className="naxatw-sr-only">Close modal</span>
          </button>
        </div>
      </div>
      <div className="naxatw-flex naxatw-gap-x-[21px] naxatw-mt-5  naxatw-px-10 ">
        <div className="">
          <div className="naxatw-rounded-xl naxatw-border naxatw-py-3 fl naxatw-w-[325px]">
            <ul>
              {linkOptions.map(link => (
                <li
                  key={link.id}
                  onClick={() => setActive(link.id)}
                  className={`naxatw-p-4 naxatw-flex naxatw-justify-between naxatw-gap-x-3 naxatw-items-center naxatw-cursor-pointer  ${
                    active === link.id ? 'naxatw-bg-[#F5F5F5]' : ''
                  } `}
                >
                  <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
                    <h4
                      className={`${
                        active === link.id
                          ? 'naxatw-text-[#FF5A5F]'
                          : 'naxatw-text-[#757575]'
                      }`}
                    >
                      {link.id}
                    </h4>
                    <span
                      className={`naxatw-text-[13px] naxatw-font-bold ${
                        active === link.id
                          ? 'naxatw-text-[#FF5A5F]'
                          : 'naxatw-text-[#757575]'
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>

                  <span className="material-icons">chevron_right</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="naxatw-container">
          {getContent(active)}
          <div className={`naxatw-flex naxatw-justify-between naxatw-py-5 ${active===2?'naxatw-w-full':'naxatw-w-[800px]'} naxatw-mx-auto`}>
            {active > 1 ? (
              <Button
                iconLeft="arrow_back"
                className=" naxatw-w-[8.875rem]  naxatw-text-[#00A699] naxatw-group hover:naxatw-bg-[#F5F5F5]"
                onClick={() => {
                  setActive(prev => prev - 1);
                }}
              >
                <span className="naxatw-text-body-btn group-hover:naxatw-underline naxatw-text-secondary-400 ">
                  Go back
                </span>
              </Button>
            ) : (
              <div />
            )}
            {active<linkOptions.length?
            (<Button
              className="naxatw-btn-primary naxatw-w-[71px]"
              onClick={() => setActive(prev => prev + 1)}
            >
              Next
            </Button>): (<Button
              className="naxatw-btn-primary naxatw-w-[71px]"
              onClick={() =>{}}
            >
              Save
            </Button>)}
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDataCollection;
