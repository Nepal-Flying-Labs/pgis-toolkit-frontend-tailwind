/* eslint-disable react/jsx-curly-brace-presence */
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
import Chip from '@Components/common/Chip';
import { checkIfLoading } from '@Utils/loaderSelector';
import projectIcon from '@Assets/images/project-icon.png';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import ProjectCard from './ProjectCard';
import ProjectGridCard from './ProjectGridCard/index';
import ProjectCardSkeleton from './ProjectCardSkeleton/index';

const { getProjectsRequest, toggleSidebar } = OrganizationDashboardCreators;
const { toggleModal } = CommonCreators;

export default function MapSidebar() {
  const [chipStatus, setChipStatus] = useState('all');
  const [viewType, setViewType] = useState('list');
  const [toggleId, setToggleId] = useState(null);
  const { organizationId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const projects = useSelector(state => state.organizationDashboard.projects);
  const hideSidebar = useSelector(
    state => state.organizationDashboard.hideSidebar,
  );

  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_PROJECTS_REQUEST]),
  );
  const organizationDetail = useSelector(
    state => state.organizationDashboard.organizationDetail,
  );
  const hasNoProject = useSelector(
    state => state.organizationDashboard.projects?.hasNoProject,
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
      className={`naxatw-relative naxatw-bg-grey-100 naxatw-pl-10 naxatw-pr-2 naxatw-pt-5`}
      style={{
        width: hideSidebar ? '0' : '44.375rem',
        minWidth: hideSidebar ? '0' : '40rem',
        padding: hideSidebar ? '0' : '',
        transition: 'ease-in-out 300ms',
      }}
    >
      {!hasNoProject && (
        <>
          <div className="naxatw-flex naxatw-items-center naxatw-pr-5 naxatw-justify-between naxatw-gap-2">
            <Searchbar
              className="naxatw-bg-white"
              value={searchValue}
              onChange={handleChange}
              isSmall
            />

            <Button
              className="naxatw-btn-primary naxatw-btn-sm naxatw-min-w-fit"
              iconLeft="add"
              onClick={() => dispatch(toggleModal('create-project'))}
            >
              Create Project
            </Button>
          </div>

          <div className="naxatw-flex naxatw-justify-between naxatw-pr-5 naxatw-items-center">
            <div className="naxatw-flex naxatw-mt-2 naxatw-gap-2">
              <Chip
                name={`All( ${organizationDetail?.projects || ''} )`}
                status={chipStatus}
                value="all"
                onClick={() => {
                  setChipStatus('all');
                }}
              />
              <Chip
                name={`Ongoing( ${organizationDetail?.ongoing || ''} )`}
                status={chipStatus}
                value="ongoing"
                onClick={() => {
                  setChipStatus('ongoing');
                }}
              />
            </div>
            <div className="naxatw-flex naxatw-gap-x-2">
              <a onClick={() => setViewType('list')}>
                <MaterialIcon
                  name="view_list"
                  className={`naxatw-text-icon-md group-hover:naxatw-text-primary-500 ${
                    viewType === 'list' ? 'naxatw-text-primary-500' : ''
                  }`}
                  wrapperClassName={`naxatw-icon-btn naxatw-icon-btn-sm hover:naxatw-bg-primary-50 naxatw-group ${
                    viewType === 'list' ? 'naxatw-bg-primary-50' : ''
                  }`}
                />
              </a>
              <a onClick={() => setViewType('grid')}>
                <MaterialIcon
                  name="grid_view"
                  className={`naxatw-text-icon-md group-hover:naxatw-text-primary-500 ${
                    viewType === 'grid' ? 'naxatw-text-primary-500' : ''
                  }`}
                  wrapperClassName={`naxatw-icon-btn naxatw-icon-btn-sm hover:naxatw-bg-primary-50 naxatw-group ${
                    viewType === 'grid' ? 'naxatw-bg-primary-50' : ''
                  }`}
                />
              </a>
            </div>
          </div>
        </>
      )}

      <div
        className={`naxatw-mt-5 naxatw-overflow-y-auto naxatw-pr-4 scrollbar ${
          viewType === 'list'
            ? ' naxatw-flex naxatw-flex-col naxatw-gap-2 '
            : 'naxatw-grid naxatw-grid-cols-2 naxatw-gap-5 naxatw-overflow-x-hidden'
        }`}
        style={{
          height: `calc(100vh - ${projectHeaderHeight}px - 9rem)`,
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
              }) =>
                viewType === 'list' ? (
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
                              `/organizations/${organizationId}/project-setup/${id}`,
                            )
                    }
                  />
                ) : (
                  <div className="naxatw-w-full">
                    <ProjectGridCard
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
                                `/organizations/${organizationId}/project-setup/${id}`,
                              )
                      }
                    />{' '}
                  </div>
                ),
            )
          ) : hasNoProject ? (
            <div className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center naxatw-h-full">
              <div>
                <img
                  src={projectIcon}
                  alt="project-icon"
                  className="naxatw-w-[60px] naxatw-h-[60px]"
                />
              </div>
              <h3 className="naxatw-mt-7 naxatw-mb-2">No Projects yet</h3>
              <p className="naxatw-text-body-lg">
                Create a project with basic info and project location.
              </p>
              <Button
                iconLeft="add"
                className="naxatw-btn-primary naxatw-mt-7"
                onClick={() => dispatch(toggleModal('create-project'))}
              >
                Create Project
              </Button>
            </div>
          ) : (
            <div className="naxatw-flex naxatw-flex-col naxatw-items-center naxatw-justify-center naxatw-h-full">
              <span className="naxatw-text-body-lg naxatw-text-center naxatw-w-[60%]">
                No projects found. Please ensure that your search parameters are
                correct and try again.
              </span>
            </div>
          )
        ) : (
          <ProjectCardSkeleton itemNumber={5} />
        )}
      </div>

      <div>
        <a
          className="naxatw-absolute naxatw-top-4 -naxatw-right-12 naxatw-z-10 naxatw-bg-white naxatw-text-grey-800 naxatw-h-10 naxatw-p-2 naxatw-rounded-lg naxatw-border naxatw-border-grey-300 naxatw-flex naxatw-items-center naxatw-shadow-3xl hover:naxatw-bg-[#F5F5F5]"
          onClick={() => dispatch(toggleSidebar())}
        >
          <i className="material-icons ">
            {hideSidebar ? 'navigate_next' : 'navigate_before'}
          </i>
        </a>
      </div>
    </div>
  );
}
