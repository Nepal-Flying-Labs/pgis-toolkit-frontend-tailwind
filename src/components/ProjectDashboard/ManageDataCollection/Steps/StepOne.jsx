/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */

import React from 'react';
import Button from '@Components/common/Button/index';
import pcIcon from '@Assets/images/perspective_matte.png';
import fileIcon from '@Assets/images/group.png';
import systemRequirementDocument from '@Assets/files/System-Requirement-Document.pdf';
import { saveAs } from 'file-saver';

const StepOne = ({ option, setOption }) => {
  // const [option, setOption] = useState(null);
  return (
    <div className="naxatw-container ">
      <div className="md:naxatw-w-[800px] md:naxatw-mx-auto">
        <h4 className="naxatw-mb-2 naxatw-font-semibold">Data Import</h4>
        <p className="naxatw-text-body-lg">
          USAFIRI allows for data import from multiple sources, but it is
          important to review the Data Requirement document before beginning the
          data management process.
        </p>
        <div className="naxatw-flex naxatw-flex-col md:naxatw-flex-row naxatw-items-center naxatw-gap-x-3 naxatw-my-5">
          <div className="">
            <p className="naxatw-text-body-btn">Data Requirement </p>
            <span className="naxatw-text-body-md">
              The Data Requirement document is a critical tool for ensuring that
              the data imported into USAFIRI meets the necessary specifications
              and requirements. It is important to review this document before
              beginning the data management process.
            </span>
          </div>
          <Button
            iconLeft="description"
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm naxatw-min-w-fit"
            onClick={() => {
              // eslint-disable-next-line new-cap
              // const doc = new jsPDF();
              // window.open(doc.output(systemRequirementDocument));
            }}
          >
            <a
              href={systemRequirementDocument}
              target="_blank"
              rel="noreferrer"
              className="naxatw-text-[0.938rem] naxatw-font-bold"
            >
              Read Document
            </a>
            {/* Read Document */}
          </Button>
          <Button
            iconLeft="download"
            className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm "
            onClick={() => {
              saveAs(
                systemRequirementDocument,
                'SystemRequirementDocument.pdf',
              );
            }}
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
