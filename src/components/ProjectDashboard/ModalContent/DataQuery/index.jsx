import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators, Types } from '@Actions/projectMap';
import toastActions from '@Actions/toast';
import { mapStateSelector } from '@Selectors/projectMap';
import Select from '@Components/common/Select';
import Button from '@Components/common/Button';
import Spinner from '@Components/common/Spinner';
import { dataQueryOperators } from '@src/constants/map';
import { checkIfLoading } from '@Utils/loaderSelector';
import { isEmpty } from '@Utils/commonUtils';

const btnClassname =
  'naxatw-p-2 naxatw-h-10 naxatw-w-10 naxatw-rounded-lg naxatw-border naxatw-border-grey-400 naxatw-rounded-lg naxatw-flex naxatw-items-center naxatw-justify-center naxatw-font-bold naxatw-text-[13px] naxatw-text-grey-800 naxatw-bg-grey-100';

const {
  getDataQueryFieldsRequest,
  getDataQueryValuesRequest,
  postAdvanceQueryRequest,
  setDataQueryState,
} = ProjectMapCreators;

function getOperatorLabel(value) {
  return dataQueryOperators.find(item => item.value === value)?.label;
}

export function stringifyQuery(data) {
  return data.reduce((str, item) => {
    const { field, operator, value, join } = item;
    if (join) {
      return `${str} ${join}`;
    }
    return `${str} ${field ? `"${field}"` : ''} ${
      getOperatorLabel(operator) || ''
    } ${value ? `"${value}"` : ''}`;
  }, '');
}

const initialQuery = {
  field: null,
  operator: null,
  value: null,
};

export default function DataQuery() {
  const mapState = useSelector(mapStateSelector);
  const selectedLayer = useSelector(
    state => state.projectMap.dataQuery.selectedLayer,
  );
  const fields = useSelector(state => state.projectMap.dataQuery.fields);
  const values = useSelector(state => state.projectMap.dataQuery.values);
  const showModal = useSelector(state => state.common.showModal);
  const modalContent = useSelector(state => state.common.modalContent);
  const [query, setQuery] = useState([initialQuery]);
  const isValuesFetching = useSelector(state =>
    checkIfLoading(state, [Types.GET_DATA_QUERY_VALUES_REQUEST]),
  );
  const isPosting = useSelector(state =>
    checkIfLoading(state, [Types.POST_ADVANCE_QUERY_REQUEST]),
  );
  const dispatch = useDispatch();

  // reset state on modal unmount
  useEffect(() => {
    if (showModal && modalContent !== 'data-query') return;
    dispatch(
      setDataQueryState({
        selectedLayer: null,
        fields: null,
        values: null,
      }),
    );
  }, [dispatch, showModal, modalContent]);

  useEffect(() => {
    if (!selectedLayer) return;
    dispatch(getDataQueryFieldsRequest({ layer: selectedLayer.id }));
  }, [dispatch, selectedLayer]);

  const handleFieldSelect = name => {
    dispatch(
      getDataQueryValuesRequest({
        layer: selectedLayer.id,
        field: name,
      }),
    );
  };

  const handleQuerySelect = (val, type) => {
    setQuery(prev => {
      const lastItem = prev[prev.length - 1];
      const { field, operator, value, join } = lastItem;
      if (type === 'join' && !!field && !!operator && !!value) {
        return [
          ...prev,
          {
            [type]: val,
          },
        ];
      }
      if (type !== 'join' && !!join) {
        return [
          ...prev,
          {
            field: '',
            operator: null,
            value: null,
            [type]: val,
          },
        ];
      }
      // if (prev.length === 1) {
      // return [{ ...lastItem, [type]: val }];
      // }
      return [
        ...prev.filter((_, idx) => idx !== prev.length - 1),
        type === 'field' && !!field && !!operator && !!value
          ? {
              ...initialQuery,
              [type]: val,
            }
          : {
              ...lastItem,
              [type]: val,
            },
      ];
    });
  };

  const handleApply = () => {
    const valuesArr = query.filter(item => item?.value).map(item => item.value);
    if (isEmpty(valuesArr)) return;
    const name = valuesArr.join('-');
    const payloadData = {
      layer: selectedLayer.id,
      name,
      expression: JSON.stringify(query),
    };
    dispatch(
      postAdvanceQueryRequest(payloadData, {
        query,
      }),
    );
  };

  const handleBackspace = () => {
    setQuery(prev => {
      const lastItem = prev[prev.length - 1];
      return prev.reduce((arr, item, idx) => {
        if (idx < prev.length - 1) return [...arr, item];
        if (!lastItem) return [{ ...initialQuery }];
        if (lastItem.join) {
          return arr;
        }
        if (lastItem.value) {
          return [...arr, { ...item, value: null }];
        }
        if (lastItem.operator) {
          return [...arr, { ...item, operator: null }];
        }
        // if (lastItem.field) {
        //   return arr;
        // }
        return [{ ...initialQuery }];
      }, []);
    });
  };

  const lastQueryItem = query[query.length - 1];

  return (
    <div className="naxatw-w-full">
      <div
        className="naxatw-space-y-5 naxatw-min-h-[16rem] naxatw-overflow-y-auto scrollbar"
        // style={{
        //   maxHeight: `calc(100vh - 18rem)`,
        // }}
      >
        <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">
              Select the layer you want to query
            </label>
            <Select
              placeholder="Choose"
              options={mapState}
              labelKey="name"
              valueKey="id"
              onChange={item => {
                dispatch(
                  setDataQueryState({
                    selectedLayer: item,
                  }),
                );
              }}
              selectedValue={selectedLayer?.id}
            />
          </div>
        </div>

        {fields !== null && (
          <>
            <div className="naxatw-flex naxatw-gap-2 naxatw-h-[15rem]">
              <div
                className="naxatw-w-full naxatw-border naxatw-border-grey-400 
                  naxatw-rounded-lg naxatw-overflow-y-auto scrollbar"
              >
                <ul>
                  {fields.map(({ name, alias }) => (
                    <li
                      key={name}
                      role="presentation"
                      className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800 
                        naxatw-cursor-pointer hover:naxatw-bg-grey-100"
                      onClick={() => {
                        handleFieldSelect(name);
                        handleQuerySelect(name, 'field');
                      }}
                    >
                      {alias || name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="naxatw-w-full">
                <div
                  className="naxatw-grid naxatw-grid-cols-3 naxatw-items-center naxatw-justify-items-center
                    naxatw-gap-2"
                >
                  {dataQueryOperators.map(({ id, label, value, type }) => (
                    <a
                      key={id}
                      className={btnClassname}
                      onClick={() => {
                        if (
                          type === 'join' &&
                          (!lastQueryItem?.field ||
                            !lastQueryItem?.operator ||
                            !lastQueryItem?.value)
                        ) {
                          return;
                        }
                        if (!lastQueryItem?.field) {
                          dispatch(
                            toastActions.error({
                              message: 'Please select field first.',
                            }),
                          );
                          return;
                        }
                        handleQuerySelect(value, type);
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg naxatw-overflow-y-auto scrollbar">
                {isValuesFetching && (
                  <div className="naxatw-h-full naxatw-flex naxatw-items-center naxatw-justify-center">
                    <Spinner className="!naxatw-h-7 !naxatw-w-7 naxatw-fill-grey-500" />
                  </div>
                )}
                <ul>
                  {values?.map(item => (
                    <li
                      key={item}
                      role="presentation"
                      className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800 
                        naxatw-cursor-pointer hover:naxatw-bg-grey-100"
                      onClick={() => {
                        if (!lastQueryItem?.operator) {
                          dispatch(
                            toastActions.error({
                              message: 'Please select operator first.',
                            }),
                          );
                          return;
                        }
                        handleQuerySelect(item, 'value');
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="">
              <div className="naxatw-space-y-2">
                <label className="naxatw-label">Result</label>
                <span className="naxatw-flex naxatw-min-h-[4.8rem]">
                  <textarea
                    type="text"
                    className="naxatw-block naxatw-w-full naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none naxatw-pointer-events-none"
                    name="about"
                    value={stringifyQuery(query)}
                    readOnly
                  />
                  <Button
                    className="naxatw-btn naxatw-btn-sm naxatw-btn-secondary naxatw-btn-noborder naxatw-h-fit"
                    onClick={handleBackspace}
                  >
                    <i className="material-symbols-outlined">backspace</i>
                  </Button>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* <div className="">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Layer Name</label>
            <input
              type="text"
              className="naxatw-block naxatw-w-full naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none"
              name="about"
              // value={values.about}
              // onChange={handleChange}
            />
          </div>
        </div> */}

      {selectedLayer && (
        <div className="naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
          <Button
            className="naxatw-btn-primary"
            onClick={handleApply}
            isLoading={isPosting}
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}
