import React from 'react';
import { Creators } from '@Actions/common';
import Select from '@Components/common/Select';
import Button from '@Components/common/Button';

const { toggleModal } = Creators;

export default function BufferAnalysis() {
  return (
    <div>
      <p>Baseline Datasets contains different levels of boundaries.</p>

      <div className="naxatw-mt-10 naxatw-space-y-4 naxatw-max-h-[28rem] naxatw-overflow-y-auto scrollbar">
        <div>
          <h4 className="naxatw-text-grey-800">
            Data preparation & cleaning for analysis
          </h4>
          <p className="naxatw-text-body-lg naxatw-mt-2">
            Choose the desired datasets from the two options below. You may
            choose data from both of the options below but make sure to choose
            the same data only once.
          </p>
        </div>

        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Your DEM Data</label>
            <Select placeholder="Choose" />
          </div>
        </div>

        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Point of Interest</label>
            <Select placeholder="Choose" />
          </div>
        </div>

        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Point of Origin</label>
            <Select placeholder="Choose" />
          </div>
        </div>

        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Road Network Data</label>
            <Select placeholder="Choose" />
          </div>
        </div>

        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Demographic Data</label>
            <Select placeholder="Choose" />
          </div>
        </div>
      </div>

      <div className="naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          onClick={() => {
            dispatch(toggleModal());
          }}
        >
          Check & Save
        </Button>
      </div>
    </div>
  );
}
