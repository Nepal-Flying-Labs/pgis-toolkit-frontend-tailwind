/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */

import React from 'react';
import Button from '@Components/common/Button/index';
import pcIcon from '@Assets/images/perspective_matte.png';
import fileIcon from '@Assets/images/group.png';

const StepOne = ({ option, setOption }) => {
  // const [option, setOption] = useState(null);
  return (
    <div className="naxatw-container ">
      <div className="md:naxatw-w-[800px] md:naxatw-mx-auto">
        <h4 className="naxatw-mb-2">Get Started & Manage Data</h4>
        <p className="naxatw-text-body-lg">
          USAFIRI allows you to import data in two different ways. Prior to data
          management, please make sure you go through the data requirement
          document and necessary list of datasets and templates.
        </p>
        <div className="naxatw-flex naxatw-flex-col md:naxatw-flex-row naxatw-items-center naxatw-gap-x-3 naxatw-my-5">
          <div className="">
            <p className="naxatw-text-body-btn">Data Requirement document </p>
            <span className="naxatw-text-body-md">
              USAFIRI allows you to import data from multiple sources. Prior to
              data management, please make sure you
            </span>
          </div>
          <Button
            iconLeft="description"
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm naxatw-w-[198px]"
          >
            Read Document
          </Button>
          <Button
            iconLeft="download"
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm "
          >
            Download
          </Button>
          {/* <a className="naxatw-flex naxatw-items-center naxatw-gap-x-2">
            <span className="material-icons naxatw-text-[#00A699]">
              description
            </span>
            <span className="naxatw-text-[#00A699]">Read Document</span>
          </a> */}
          {/* <a className="naxatw-flex naxatw-items-center naxatw-gap-x-2 ">
            <span className="material-icons naxatw-text">download</span>
            <span className="naxatw-text-[#00A699]">Read Document</span>
          </a> */}
        </div>
        <div className="naxatw-py-5 naxatw-flex naxatw-flex-col md:naxatw-flex-row naxatw-gap-x-3">
          <div
            className={`naxatw-basis-2/4 naxatw-border naxatw-rounded-md naxatw-py-3 naxatw-pl-4 naxatw-pr-2 hover:naxatw-bg-grey-100  ${
              option === 'collect-dataset'
                ? 'naxatw-bg-[#F5F5F5] naxatw-border-[#484848]'
                : ''
            }`}
            onClick={() => setOption('collect-dataset')}
          >
            <div className="naxatw-flex naxatw-justify-between naxatw-mb-5">
              <img
                src={pcIcon}
                alt="icon"
                className="naxatw-h-[60px] naxatw-w-[60px]"
              />{' '}
              <span className="material-icons">
                {' '}
                {option === 'collect-dataset'
                  ? 'check_circle_outline'
                  : 'radio_button_unchecked'}
              </span>
            </div>
            <h5>I want to collect dataset</h5>
            <p className="naxatw-text-body-md">
              Select this option if you want to prepare your datasets as per the
              standard data collection formats. This will help you streamline
              your data collection work and also make the data anlaysis steps
              easier.
            </p>
          </div>
          <div
            onClick={() => setOption('have-dataset')}
            className={`naxatw-basis-2/4 naxatw-border naxatw-rounded-md naxatw-py-3 naxatw-pl-4 naxatw-pr-2 hover:naxatw-bg-grey-100  ${
              option === 'have-dataset'
                ? 'naxatw-bg-grey-100 naxatw-border-grey-800'
                : ''
            }`}
          >
            <div className="naxatw-flex naxatw-justify-between naxatw-mb-5">
              <img
                src={fileIcon}
                alt="icon"
                className="naxatw-h-[60px] naxatw-w-[60px]"
              />{' '}
              <span className="material-icons">
                {option === 'have-dataset'
                  ? 'check_circle_outline'
                  : 'radio_button_unchecked'}
              </span>
            </div>
            <h5>I already have necessary dataset</h5>
            <p className="naxatw-text-body-md">
              Select this option if you already have the necessary data as
              mentioned in data requirement document above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
