/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { format } from 'date-fns';
import DropdownOptions from '@Components/common/DropdownOptions';
import { getAnalysisType } from '@src/constants/analysis';

export default function IndividualCard({ data }) {
  const { organizationId, projectId } = useParams();
  const history = useHistory();

  const analysisType = getAnalysisType(data.analysisType);

  const dropdownOptions = [
    {
      id: 1,
      label: (
        <span className="naxatw-flex naxatw-items-center">
          <i className="material-icons naxatw-mr-2">edit</i>
          <p className="naxatw-text-body-lg">Edit</p>
        </span>
      ),
      onClick: selectedData => {},
    },
    {
      id: 2,
      label: (
        <span className="naxatw-flex naxatw-items-center naxatw-text-delete_btn">
          <i className="material-icons naxatw-mr-2">delete_outline</i>
          <p className="naxatw-text-body-lg naxatw-text-delete_btn">Delete</p>
        </span>
      ),
      onClick: selectedData => {},
    },
  ];

  return (
    <div
      className="naxatw-bg-white naxatw-p-3 naxatw-rounded-lg naxatw-border 
        naxatw-border-grey-300 hover:naxatw-border-grey-800 naxatw-cursor-pointer"
      onClick={() => {
        history.push(
          `/organizations/${organizationId}/projects/${projectId}/analysis/${analysisType}/${data.id}`,
        );
      }}
    >
      <div className="naxatw-flex naxatw-justify-between">
        <p className="naxatw-text-body-btn">{data.name}</p>
        <DropdownOptions options={dropdownOptions} stopPropagation />
      </div>
      <p className="naxatw-text-body-md">
        {format(new Date(data.uploaded_date), 'MMM dd, yyyy')}
      </p>
    </div>
  );
}
