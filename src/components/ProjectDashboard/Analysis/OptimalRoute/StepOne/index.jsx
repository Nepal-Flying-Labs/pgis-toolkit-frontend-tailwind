import React from 'react';
import Select from '@Components/common/Select';
import Spinner from '@Components/common/Spinner';
import Button from '@Components/common/Button/index';

const values = [
  'Road Accident',
  'road Accident',
  'road Accident',
  'road Accident',
  'road Accident',
];
const isValuesFetching = false;

export default function StepOne() {
  return (
    <div>
      <h4>Data preparation & cleaning for analysis</h4>
      <p className="naxatw-mt-2 naxatw-text-body-lg">
        Choose the desired datasets from the two options below. You may choose
        data from both of the options below but make sure to choose the same
        data only once.
      </p>

      <div className="naxatw-mt-5 naxatw-space-y-5">
        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Road layer</label>
          <Select placeholder="Choose" />
        </div>

        <div className="naxatw-space-y-2">
          <label className="naxatw-label">Obstacles</label>
          <div
            className="naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg
              naxatw-overflow-y-auto scrollbar naxatw-h-[11.25rem]"
          >
            {isValuesFetching && (
              <div className="naxatw-h-full naxatw-flex naxatw-items-center naxatw-justify-center">
                <Spinner className="!naxatw-h-7 !naxatw-w-7 naxatw-fill-grey-500" />
              </div>
            )}
            <ul>
              {values?.map(item => (
                <li
                  key={item}
                  role="presentation"
                  className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800 
                    naxatw-cursor-pointer hover:naxatw-bg-grey-100 naxatw-flex naxatw-items-center"
                  onClick={() => {}}
                >
                  <input
                    id={item}
                    className="naxatw-min-w-[1rem] naxatw-min-h-[1rem] naxatw-mr-4
                      naxatw-accent-grey-800"
                    type="checkbox"
                  />
                  <label htmlFor={item}>{item}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="naxatw-flex naxatw-justify-center naxatw-mt-10">
        <Button className="naxatw-btn-primary" onClick={() => {}}>
          Next
        </Button>
      </div>
    </div>
  );
}
