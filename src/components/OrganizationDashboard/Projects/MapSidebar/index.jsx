/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import {
  Creators as OrganizationDashboardCreators,
  Types,
} from '@Actions/organizationDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import Button from '@Components/common/Button';
import Searchbar from '@Components/common/Searchbar';
import { projectHeaderHeight } from '@src/constants';
import { checkIfLoading } from '@Utils/loaderSelector';
import ProjectCard from './ProjectCard';
import ProjectCardSkeleton from './ProjectCardSkeleton/index';

const { getProjectsRequest } = OrganizationDashboardCreators;
const { toggleModal } = CommonCreators;

export default function MapSidebar() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [toggleId, setToggleId] = useState(null);
  const { organizationId } = useParams();
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
    <>
      <div
        className={`naxatw-relative naxatw-bg-grey-100 naxatw-pl-10 naxatw-pr-5 naxatw-pt-5 ${
          sidebarToggle ? 'naxatw-hidden' : 'naxatw-block'
        }`}
        style={{ minWidth: '50%' }}
      >
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-gap-2">
          <Searchbar
            className="naxatw-bg-white"
            value={searchValue}
            onChange={handleChange}
            isSmall
          />

          <Button
            className="naxatw-btn-primary naxatw-btn-sm"
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
              projects?.results?.map(
                ({
                  id,
                  name,
                  status,
                  cover_image,
                  start_date,
                  end_date,
                  thematic_areas,
                }) => (
                  <ProjectCard
                    key={id}
                    title={name}
                    address="kenya"
                    id={id}
                    coverImage={cover_image}
                    startDate={start_date}
                    endDate={end_date}
                    thematicAreas={thematic_areas}
                    status={status}
                    toggle={toggleId === id}
                    setToggle={setToggleId}
                    onClick={
                      status !== 'draft'
                        ? () => history.push(`${url}/${id}/map`)
                        : () =>
                            history.push(
                              `/organizations/${organizationId}/project-edit/${id}`,
                            )
                    }
                  />
                ),
              )
            ) : (
              <span>No project found</span>
            )
          ) : (
            <ProjectCardSkeleton itemNumber={5} />
          )}
        </div>
      </div>
      <div>
        <a
          className="naxatw-absolute naxatw-top-4 naxatw-left-4 naxatw-z-10 naxatw-bg-white naxatw-text-grey-800 naxatw-h-10 naxatw-p-2 naxatw-rounded-lg naxatw-border naxatw-border-grey-300 naxatw-flex naxatw-items-center naxatw-shadow-3xl"
          onClick={() => setSidebarToggle(prev => !prev)}
        >
          <i className="material-icons">
            {sidebarToggle ? 'navigate_next' : 'navigate_before'}
          </i>
          {sidebarToggle && (
            <p className="naxatw-text-body-sm naxatw-font-bold">SHOW DATA</p>
          )}
        </a>
      </div>
    </>
  );
}
