import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import Button from '@Components/common/Button';
import { isEmpty } from '@Utils/commonUtils';
import Toggle from '@Components/common/Toggle';
import IconButton from '@Components/common/IconButton';
import { stringifyQuery } from '@Components/ProjectDashboard/ModalContent/DataQuery';

const { togglePromptDialog } = CommonCreators;
const { handleDataQueryCheckbox, setDataQueryState } = ProjectMapCreators;

export default function QueryResultPopup() {
  const [collapsed, setCollapsed] = useState(false);
  const projectHeaderHeight = useSelector(
    state => state.common.projectHeaderHeight,
  );
  const queryResults = useSelector(
    state => state.projectMap.dataQuery.queryResults,
  );
  const dispatch = useDispatch();

  if (isEmpty(queryResults)) return '';

  return (
    <div
      className="naxatw-absolute naxatw-top-20 naxatw-right-4  naxatw-z-10
        naxatw-bg-white naxatw-text-grey-800 naxatw-rounded-[20px] naxatw-border naxatw-border-grey-300 
        naxatw-shadow-3xl naxatw-w-[20.3rem]"
    >
      <div
        className="naxatw-px-5 naxatw-py-3.5 naxatw-flex naxatw-items-center naxatw-justify-between"
        style={{
          boxShadow: '0px 2px 20px 4px rgb(0 0 0 / 12%)',
        }}
      >
        <h4>Data Query Results</h4>
        <div className="naxatw-flex naxatw-items-center">
          {!collapsed && (
            <Button className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm">
              Clear all
            </Button>
          )}
          <IconButton
            name={collapsed ? 'expand_more' : 'expand_less'}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      </div>

      {!collapsed && (
        <ul
          className="naxatw-overflow-y-auto scrollbar"
          style={{
            maxHeight: `calc(100vh - ${projectHeaderHeight}px - 14rem)`,
          }}
        >
          {queryResults.map(item => (
            <li
              key={item.id}
              className="naxatw-px-5 naxatw-py-3.5 naxatw-space-y-3 naxatw-border-b
                naxatw-border-b-grey-300 last:naxatw-border-b-0"
            >
              <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
                <span className="naxatw-flex naxatw-items-center naxatw-space-x-1">
                  <p className="naxatw-btn-text">{item.layerName}</p>
                  {/* <IconButton
                    name="table"
                    className="material-symbols-outlined naxatw-text-sm"
                    // onClick={() => setCollapsed(!collapsed)}
                  /> */}
                </span>
                <p className="naxatw-text-xl">{item.features_count}</p>
              </div>
              <div className="naxatw-space-y-1">
                <p className="naxatw-font-bold naxatw-text-xs naxatw-uppercase">
                  Filter results
                </p>
                <p>{stringifyQuery(item.query)}</p>
              </div>
              <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
                <Toggle
                  isSm
                  checked={item.checked}
                  onChange={e =>
                    dispatch(
                      handleDataQueryCheckbox({
                        id: item.id,
                        checked: e.target.checked,
                      }),
                    )
                  }
                />
                <div className="naxatw-flex">
                  <Button
                    className="naxatw-btn-secondary naxatw-btn-noborder naxatw-btn-sm"
                    onClick={() => {
                      dispatch(setDataQueryState({ selectedData: item }));
                      dispatch(togglePromptDialog('save-data-query'));
                    }}
                  >
                    Save
                  </Button>
                  <IconButton name="close" onClick={() => {}} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
