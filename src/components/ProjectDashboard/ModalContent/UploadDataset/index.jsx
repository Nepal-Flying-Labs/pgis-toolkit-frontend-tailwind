import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import Button from '@Components/common/Button';
import { checkIfLoading } from '@Utils/loaderSelector';

export default function DeleteLayer() {
  const deleteLayer = useSelector(state => state.projectMap.deleteLayer);
  const isDeleting = useSelector(state =>
    checkIfLoading(state, [Types.DELETE_LAYER_REQUEST]),
  );
  const dispatch = useDispatch();

  return (
    <div>
      USAFIRI allows you to do different sorts of analysis with your map
      datasets. Below are some of the analysis functions we have in the tool at
      the moment.
    </div>
  );
}
