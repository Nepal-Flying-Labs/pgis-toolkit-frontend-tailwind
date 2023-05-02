import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import Searchbar from '@Components/common/Searchbar';
import Button from '@Components/common/Button';
import NoAnalysisYet from './NoAnalysisYet';

const { toggleModal } = CommonCreators;
const { setSearchText } = ProjectMapCreators;

export default function AnalysisSection() {
  const searchText = useSelector(state => state.projectMap.searchText);
  const analysisList = useSelector(state => state.projectMap.analysisList);
  const dispatch = useDispatch();

  return !analysisList ? (
    <div
      className="naxatw-h-[calc(100vh-9rem)] naxatw-flex naxatw-flex-col
        naxatw-justify-center naxatw-items-center naxatw-pb-8"
    >
      <NoAnalysisYet />
    </div>
  ) : (
    <div className="naxatw-flex naxatw-gap-x-2 naxatw-items-center">
      <Searchbar
        className="naxatw-bg-white"
        isSmall
        value={searchText}
        onChange={e => {
          dispatch(setSearchText(e.target.value));
        }}
        isFocus
      />
      <Button
        className="naxatw-btn-primary naxatw-btn-sm"
        iconLeft="add"
        onClick={() => {
          dispatch(toggleModal('analysis'));
        }}
      >
        Analysis
      </Button>
    </div>
  );
}
