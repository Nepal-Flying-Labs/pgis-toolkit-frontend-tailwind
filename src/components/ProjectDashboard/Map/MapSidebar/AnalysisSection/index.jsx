import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import Searchbar from '@Components/common/Searchbar';
import Button from '@Components/common/Button';

const { setSearchText } = ProjectMapCreators;

export default function AnalysisSection() {
  const searchText = useSelector(state => state.projectMap.searchText);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
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
          history.push('data');
        }}
      >
        Analysis
      </Button>
    </div>
  );
}
