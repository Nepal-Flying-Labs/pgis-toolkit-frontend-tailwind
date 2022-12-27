/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Button from '@Components/common/Button';
import { Creators as CommonCreators } from '@Actions/common';
import Modal from '@Components/common/Modal';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import { getModalContent } from '@src/constants/modalContents';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';

const { toggleModal } = CommonCreators;

const headerContents = ['manage-attributes', 'add-attributes'];

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

// const getContent = step => {
//   switch (step) {
//     case 1:
//       return <StepOne option={option} setOption={setOption}/>;
//     case 2:
//       return <StepTwo />;
//     case 3:
//       return <StepThree />;
//     default:
//       return '';
//   }
// };

const ManageDataCollection = () => {
  const [option, setOption] = useState(null);
  const { projectId, organizationId } = useParams();
  const dispatch = useDispatch();
  const selectedLayer = useSelector(
    state => state.projectDashboard.data.manageData.selectedData,
  );
  const showModal = useSelector(state => state.common.showModal);
  const modalContent = useSelector(state => state.common.modalContent);
  const [active, setActive] = useState(1);
  const history = useHistory();
  const getContent = step => {
    switch (step) {
      case 1:
        return <StepOne option={option} setOption={setOption} />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return '';
    }
  };

  const headerContent = modalContents => {
    switch (modalContents) {
      case 'manage-attributes':
        return <h3>{`${selectedLayer?.name} Attributes`}</h3>;
      case 'add-attributes':
        return (
          <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
            <MaterialIcon
              name="arrow_back"
              className="naxatw-text-icon-md"
              wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md naxatw-cursor-pointer"
              onIconClick={() => dispatch(toggleModal('manage-attributes'))}
            />
            <h4>{`Add ${selectedLayer?.name} attributes`}</h4>
          </div>
        );
      default:
        return '';
    }
  };

  return (
    <div>
      <Modal
        show={showModal}
        title={getModalContent(modalContent)?.title}
        className={getModalContent(modalContent)?.className || ''}
        headerContent={
          headerContents.includes(modalContent)
            ? headerContent(modalContent)
            : null
        }
        onClose={() => dispatch(toggleModal())}
      >
        {getModalContent(modalContent)?.content}
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
            onClick={() =>
              history.push(
                `/organizations/${organizationId}/projects/${projectId}/data`,
              )
            }
            className="naxatw-text-grey-800 naxatw-bg-transparent hover:naxatw-bg-grey-200 hover:naxatw-text-grey-900 naxatw-rounded-lg naxatw-text-sm naxatw-p-1.5 naxatw-ml-auto naxatw-inline-flex naxatw-items-center naxatw-"
          >
            <i className="material-icons">close</i>
            <span className="naxatw-sr-only">Close modal</span>
          </button>
        </div>
      </div>
      <div className="naxatw-flex naxatw-flex-col md:naxatw-flex-row naxatw-gap-x-[21px] naxatw-mt-5  naxatw-px-10 ">
        <div className="">
          <div className="naxatw-rounded-xl naxatw-border naxatw-py-3 fl md:naxatw-w-[325px]">
            <ul>
              {linkOptions.map(link => (
                <li
                  key={link.id}
                  onClick={() => setActive(link.id)}
                  className={`naxatw-p-4 naxatw-flex naxatw-justify-between naxatw-gap-x-3 naxatw-items-center hover:naxatw-bg-grey-100 naxatw-cursor-pointer  ${
                    active === link.id ? 'naxatw-bg-grey-100' : ''
                  } `}
                >
                  <div className="naxatw-flex naxatw-items-center naxatw-gap-x-3">
                    <h4
                      className={`${
                        active === link.id
                          ? 'naxatw-text-primary-400'
                          : 'naxatw-text-grey-600'
                      }`}
                    >
                      {link.id}
                    </h4>
                    <span
                      className={`naxatw-text-[13px] naxatw-font-bold ${
                        active === link.id
                          ? 'naxatw-text-primary-400'
                          : 'naxatw-text-grey-600'
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>

                  {active === link.id && (
                    <MaterialIcon
                      name="chevron_right"
                      className="naxatw-text-icon-md"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="naxatw-container">
          {getContent(active)}
          <div
            className={`naxatw-flex naxatw-justify-between naxatw-py-5 ${
              active === 2 ? 'naxatw-w-full' : 'naxatw-w-[800px]'
            } naxatw-mx-auto`}
          >
            {active > 1 ? (
              <Button
                iconLeft="arrow_back"
                className=" naxatw-w-[8.875rem]  naxatw-text-secondary-400 naxatw-group hover:naxatw-bg-grey-100"
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
            {active < linkOptions.length ? (
              <Button
                className="naxatw-btn-primary naxatw-w-[71px]"
                onClick={
                  option === 'have-dataset'
                    ? () =>
                        history.push(
                          `/organizations/${organizationId}/projects/${projectId}/data`,
                        )
                    : () => setActive(prev => prev + 1)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                className="naxatw-btn-primary naxatw-w-[71px]"
                onClick={() =>
                  history.push(
                    `/organizations/${organizationId}/projects/${projectId}/data`,
                  )
                }
              >
                Save
              </Button>
            )}
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDataCollection;
