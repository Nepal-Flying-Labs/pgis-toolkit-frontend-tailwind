/* eslint-disable no-nested-ternary */
/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { Creators, Types } from '@Actions/organizationDashboard';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar';
import { projectHeaderHeight } from '@src/constants';
import { checkIfLoading } from '@Utils/loaderSelector';
import ProjectCard from './ProjectCard';
import ProjectCardSkeleton from './ProjectCardSkeleton/index';

const { getProjectsRequest, toggleModal } = Creators;

export default function MapSidebar() {
  const [toggleId, setToggleId] = useState(null);
  const { organizationId, projectId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const projects = useSelector(state => state.organizationDashboard.projects);
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_PROJECTS_REQUEST]),
  );
  const organizationDetail = useSelector(
    state => state.organizationDashboard.organizationDetail,
  );
  const dispatch = useDispatch();
  const [searchValue, handleChange] = useDebouncedInput({
    ms: 300,
    init: '',
    onChange: debouncedEvent => {
      const searchText = debouncedEvent.target.value;
      const params = { organization: organizationId };
      if (!!searchText) {
        params.search = searchText;
      }
      dispatch(getProjectsRequest(params));
    },
  });

  // get projects list
  useEffect(() => {
    dispatch(getProjectsRequest({ organization: organizationId }));
  }, [dispatch, organizationId]);

  return (
    <div
      className="naxatw-bg-grey-100 naxatw-pl-10 naxatw-pr-5 naxatw-pt-5"
      style={{ minWidth: '24rem' }}
    >
      <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-gap-2">
        <Searchbar
          className="naxatw-bg-white"
          value={searchValue}
          onChange={handleChange}
        />

        <Button
          className="naxatw-btn-primary"
          iconLeft="add_circle_outline"
          onClick={() => dispatch(toggleModal('create-project'))}
        >
          Project
        </Button>
      </div>

      <div className="naxatw-flex naxatw-mt-2 naxatw-gap-2">
        <div className="naxatw-px-5 naxatw-py-2.5 naxatw-bg-white naxatw-border naxatw-border-grey-800 naxatw-rounded-full">
          {organizationDetail ? `All(${organizationDetail.projects})` : 'All'}
        </div>
        <div className="naxatw-px-5 naxatw-py-2.5 naxatw-bg-white naxatw-border naxatw-bonaxatw-bg-grey-300 naxatw-rounded-full">
          {organizationDetail
            ? `Ongoing(${organizationDetail.ongoing})`
            : 'Ongoing'}
        </div>
      </div>

      <div
        className="naxatw-mt-5 naxatw-flex naxatw-flex-col naxatw-gap-2 naxatw-overflow-y-auto scrollbar"
        style={{
          height: `calc(100vh - ${projectHeaderHeight} - 9rem)`,
        }}
      >
        {!loading ? (
          projects?.results.length > 0 ? (
            projects?.results?.map(({ id, name, status }) => (
              <ProjectCard
                key={id}
                title={name}
                address="kenya"
                id={id}
                status={status}
                toggle={toggleId === id}
                setToggle={setToggleId}
                onClick={
                  status !== 'draft'
                    ? () => history.push(`${url}/${id}/map`)
                    : () =>
                        history.push(
                          `/organizations/${organizationId}/project-edit/${projectId}`,
                        )
                }
              />
            ))
          ) : (
            <span>No project found</span>
          )
        ) : (
          <ProjectCardSkeleton itemNumber={5} />
        )}
      </div>
    </div>
  );
}
