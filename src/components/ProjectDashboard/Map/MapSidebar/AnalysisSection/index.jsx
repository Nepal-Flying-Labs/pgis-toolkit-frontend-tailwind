/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import Searchbar from '@Components/common/Searchbar';
import Button from '@Components/common/Button';
import LayerAccordion from '@Components/common/SkeletonLoader/LayerAccordion';
import { checkIfLoading } from '@Utils/loaderSelector';
import { analysisTypes } from '@src/constants/analysis';
import useInfiniteLoading from '@Components/common/ScrollPagination/index';
import NoAnalysisYet from './NoAnalysisYet';
import Accordion from './Accordion';
import IndividualCard from './IndividualCard';

const { toggleModal } = CommonCreators;
const { setSearchText, getAnalysisTypeListRequest } = ProjectMapCreators;

function getAnalysisName(type) {
  switch (type) {
    case 'optimum_route':
      return 'Optimal Route Analysis';
    case 'proximity':
      return 'Proximity Analysis';
    case 'buffer':
      return 'Buffer Analysis';
    default:
      return '';
  }
}

export default function AnalysisSection() {
  const { projectId } = useParams();
  const searchText = useSelector(state => state.projectMap.searchText);
  const analysisList = useSelector(state => state.projectMap.analysisList);
  const isLoading = useSelector(state =>
    checkIfLoading(state, [Types.GET_ANALYSIS_TYPE_LIST_REQUEST]),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (analysisList) return;
    analysisTypes.forEach(analysis => {
      dispatch(
        getAnalysisTypeListRequest({
          project_id: projectId,
          type: analysis,
          page: 1,
          limit: 4,
        }),
      );
    });
  }, [dispatch, projectId, analysisList]);

  const onScrollEndInteractBuffer = () => {
    if (analysisList?.buffer.next !== null) {
      const url =
        analysisList?.buffer?.next && new URL(analysisList?.buffer?.next);
      dispatch(
        ProjectMapCreators.getPaginatedAnalysisForAnalysisRequest(url?.search),
      );
    }
  };

  const onScrollEndInteractProximity = () => {
    if (analysisList?.proximity.next !== null) {
      const url =
        analysisList?.proximity?.next && new URL(analysisList?.proximity?.next);
      dispatch(
        ProjectMapCreators.getPaginatedAnalysisForAnalysisRequest(url?.search),
      );
    }
  };

  const onScrollEndInteractOptimum = () => {
    if (analysisList?.optimum_route.next !== null) {
      const url =
        analysisList?.optimum_route?.next &&
        new URL(analysisList?.optimum_route?.next);
      dispatch(
        ProjectMapCreators.getPaginatedAnalysisForAnalysisRequest(url?.search),
      );
    }
  };

  const { lastLogElementRef: proximity } = useInfiniteLoading(
    onScrollEndInteractProximity,
  );
  const { lastLogElementRef: buffer } = useInfiniteLoading(
    onScrollEndInteractBuffer,
  );
  const { lastLogElementRef: optimum } = useInfiniteLoading(
    onScrollEndInteractOptimum,
  );

  const ref = {
    buffer,
    proximity,
    optimum_route: optimum,
  };

  if (isLoading)
    return (
      <div className="naxatw-flex naxatw-flex-col naxatw-gap-2">
        {[...Array(3)].map((_, idx) => (
          <LayerAccordion key={idx} />
        ))}
      </div>
    );

  return !analysisList ? (
    <div
      className="naxatw-h-[calc(100vh-9rem)] naxatw-flex naxatw-flex-col
        naxatw-justify-center naxatw-items-center naxatw-pb-8"
    >
      <NoAnalysisYet />
    </div>
  ) : (
    <div className="">
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

      <div className="naxatw-mt-3">
        {analysisList &&
          Object.keys(analysisList).map(key => (
            <Accordion
              key={key}
              header={
                <div className="naxatw-flex naxatw-flex-col naxatw-gap-1 naxatw-w-full">
                  <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                    <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
                      <h5 className="naxatw-text-grey-800">
                        {getAnalysisName(key)}
                      </h5>
                    </div>
                  </div>
                </div>
              }
              body={
                <div className="naxatw-space-y-1 naxatw-max-h-[15.5rem] naxatw-overflow-y-auto scrollbar">
                  {analysisList[key].results.map(item => (
                    <IndividualCard
                      key={item.id}
                      data={{ ...item, analysisType: key }}
                    />
                  ))}
                  <div className="infinite-loader-red" ref={ref[key]}>
                    {' '}
                  </div>
                </div>
              }
            />
          ))}
      </div>
    </div>
  );
}
