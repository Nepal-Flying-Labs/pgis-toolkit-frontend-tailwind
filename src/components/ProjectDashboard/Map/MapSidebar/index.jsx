/* eslint-disable no-extra-boolean-cast */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Creators } from '@Actions/organizationDashboard';
import useDebouncedInput from '@Hooks/useDebouncedInput';
import Accordion from '@Components/common/Accordion';
import Button from '@Components/common/Button';
import MaterialIcon from '@Components/common/MaterialIcon';
import Searchbar from '@Components/common/Searchbar';
import { projectHeaderHeight } from '@src/constants';
import { isEmpty } from '@Utils/commonUtils';

const { getProjectsRequest } = Creators;

const accordionData = [
  {
    id: 2,
    title: 'Obstacles Datasets',
    content: (
      <div>
        <p className="naxatw-mb-2 naxatw-text-gray-500">
          The main difference is that the core components from Flowbite are open
          source under the MIT license, whereas Tailwind UI is a paid product.
          Another difference is that Flowbite relies on smaller and standalone
          components, whereas Tailwind UI offers sections of pages.
        </p>
        <p className="naxatw-mb-2 naxatw-text-gray-500">
          However, we actually recommend using both Flowbite, Flowbite Pro, and
          even Tailwind UI as there is no technical reason stopping you from
          using the best of two worlds.
        </p>
        <p className="naxatw-mb-2 naxatw-text-gray-500">
          Learn more about these technologies:
        </p>
        <ul className="naxatw-pl-5 naxatw-text-gray-500 naxatw-list-disc">
          <li>
            <a
              href="https://flowbite.com/pro/"
              className="naxatw-text-blue-600 hover:naxatw-underline"
            >
              Flowbite Pro
            </a>
          </li>
          <li>
            <a
              href="https://tailwindui.com/"
              rel="nofollow"
              className="naxatw-text-blue-600 hover:naxatw-underline"
            >
              Tailwind UI
            </a>
          </li>
        </ul>
      </div>
    ),
  },
];

export default function MapSidebar() {
  const { organizationId } = useParams();
  const themes = useSelector(state => state.projectDashboard.themes);
  const layers = useSelector(state => state.projectDashboard.layers);
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
    <div className="naxatw-w-[30rem] naxatw-bg-grey-100 naxatw-pl-10 naxatw-pr-5 naxatw-pt-5">
      <div className="naxatw-flex naxatw-items-center">
        <Searchbar
          className="naxatw-bg-white"
          value={searchValue}
          onChange={handleChange}
        />
      </div>

      <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-mt-2">
        <div>Filters</div>
        <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
          <Button className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-transparent">
            Layer Order
          </Button>
          <Button className="naxatw-btn-primary" iconLeft="add_circle_outline">
            Dataset
          </Button>
        </div>
      </div>

      <div
        className="naxatw-mt-5 naxatw-flex naxatw-flex-col naxatw-gap-2 naxatw-overflow-y-auto"
        style={{
          height: `calc(100vh - ${projectHeaderHeight} - 9rem)`,
        }}
      >
        {themes.map(theme => {
          const hasNoLayer = isEmpty(layers?.[theme.id]);
          return (
            <Accordion
              key={theme.id}
              collapsed={hasNoLayer}
              header={
                <div className="naxatw-flex naxatw-flex-col naxatw-gap-1">
                  <div className="naxatw-flex naxatw-items-center naxatw-justify-between naxatw-w-full">
                    <div className="naxatw-flex naxatw-items-center naxatw-gap-2">
                      <h5 className="naxatw-text-grey-800">{theme.name}</h5>
                      <span className="naxatw-p-1 hover:naxatw-bg-grey-100 hover:naxatw-rounded-lg naxatw-cursor-pointer">
                        <MaterialIcon name="edit" className="naxatw-mt-1" />
                      </span>
                    </div>
                    <div>
                      <Button
                        className="naxatw-btn-secondary naxatw-btn-sm naxatw-btn-noborder"
                        iconLeft="add_circle_outline"
                      >
                        Layer
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p>{theme.description}</p>
                  </div>
                </div>
              }
              body={
                <div>
                  {layers?.[theme.id]?.map(layer => (
                    <div key={layer.id}>
                      <input id={layer.id} type="checkbox" />
                      <label htmlFor={layer.id}>{layer.name}</label>
                    </div>
                  ))}
                </div>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
