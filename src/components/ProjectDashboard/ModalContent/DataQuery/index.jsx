import React from 'react';
import Select from '@Components/common/Select';
import Button from '@Components/common/Button';

const options = [
  { id: 1, label: 'Street', value: 'Street' },
  { id: 2, label: 'Obstacles', value: 'obstacles' },
  { id: 3, label: 'School', value: 'School' },
  { id: 4, label: 'Street', value: 'obstacles' },
  { id: 5, label: 'Street', value: 'obstacles' },
  { id: 6, label: 'Street', value: 'obstacles' },
];

const btnClassname =
  'naxatw-p-2 naxatw-h-10 naxatw-w-10 naxatw-flex naxatw-items-center naxatw-rounded-lg naxatw-border naxatw-border-grey-400 naxatw-rounded-lg naxatw-flex naxatw-items-center naxatw-justify-center naxatw-font-bold naxatw-text-[13px] naxatw-text-grey-800';

const operators = [
  { id: 1, label: '=', value: '=' },
  { id: 2, label: '!=', value: '=' },
  { id: 3, label: 'Like', value: '=' },
  { id: 4, label: '>', value: '=' },
  { id: 5, label: '>=', value: '=' },
  { id: 6, label: 'And', value: '=' },
  { id: 7, label: '<', value: '=' },
  { id: 8, label: '<=', value: '=' },
  { id: 9, label: 'Or', value: '=' },
];

export default function DataQuery() {
  return (
    <div>
      <p>Baseline Datasets contains different levels of boundaries.</p>

      <div className="naxatw-mt-10 naxatw-space-y-5 naxatw-max-h-[28rem] naxatw-overflow-y-auto scrollbar">
        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">
              Select input data/ What do you want to buffer ?
            </label>
            <Select placeholder="Choose" />
          </div>
        </div>

        <div className="naxatw-flex naxatw-gap-2">
          <div className="naxatw-h-[12.5rem] naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg naxatw-overflow-y-auto scrollbar">
            <ul>
              {options.map(({ id, label }) => (
                <li
                  className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800"
                  key={id}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="naxatw-h-[12.5rem] naxatw-w-full">
            <div className="naxatw-grid naxatw-grid-cols-3 naxatw-items-center naxatw-justify-items-center naxatw-gap-2">
              {operators.map(({ id, label }) => (
                <a key={id} className={btnClassname} onClick={() => {}}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="naxatw-h-[12.5rem] naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg naxatw-overflow-y-auto scrollbar">
            <ul>
              {options.map(({ id, label }) => (
                <li
                  className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800"
                  key={id}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Result</label>
            <textarea
              type="text"
              className="naxatw-block naxatw-w-full naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
              name="about"
              // value={values.about}
              // onChange={handleChange}
            />
          </div>
        </div>

        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Layer Name</label>
            <input
              type="text"
              className="naxatw-block naxatw-w-full naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
              name="about"
              // value={values.about}
              // onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button className="naxatw-btn-primary" onClick={() => {}}>
          Save
        </Button>
      </div>
    </div>
  );
}
