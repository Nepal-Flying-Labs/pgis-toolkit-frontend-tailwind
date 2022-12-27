import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProjectMapCreators } from '@Actions/projectMap';
import { mapStateSelector } from '@Selectors/projectMap';
import Select from '@Components/common/Select';
import Button from '@Components/common/Button';
import { dataQueryOperators } from '@src/constants/map';

const btnClassname =
  'naxatw-p-2 naxatw-h-10 naxatw-w-10 naxatw-flex naxatw-items-center naxatw-rounded-lg naxatw-border naxatw-border-grey-400 naxatw-rounded-lg naxatw-flex naxatw-items-center naxatw-justify-center naxatw-font-bold naxatw-text-[13px] naxatw-text-grey-800';

const {
  getDataQueryFieldsRequest,
  getDataQueryValuesRequest,
  postAdvanceQueryRequest,
} = ProjectMapCreators;

function getOperatorLabel(value) {
  return dataQueryOperators.find(item => item.value === value)?.label;
}

function stringifyQuery(data) {
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
  const [selectedLayer, setSelectedLayer] = useState(null);
  const mapState = useSelector(mapStateSelector);
  const fields = useSelector(state => state.projectMap.dataQuery.fields);
  const values = useSelector(state => state.projectMap.dataQuery.values);
  const [selectedField, setSelectedField] = useState(null);
  const [query, setQuery] = useState([initialQuery]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedLayer) return;
    dispatch(getDataQueryFieldsRequest({ layer: selectedLayer.id }));
  }, [dispatch, selectedLayer]);

  const handleFieldSelect = name => {
    setSelectedField(name);
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
    const payloadData = {
      layer: selectedLayer.id,
      name: `query-${uuidv4()}`,
      expression: JSON.stringify(query),
    };
    dispatch(postAdvanceQueryRequest(payloadData));
  };

  return (
    <div>
      <p>Baseline Datasets contains different levels of boundaries.</p>

      <div className="naxatw-mt-10 naxatw-space-y-5 naxatw-max-h-[28rem] naxatw-min-h-[16rem] naxatw-overflow-y-auto scrollbar">
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
              onChange={item => setSelectedLayer(item)}
              selectedValue={selectedLayer?.id}
            />
          </div>
        </div>

        {fields !== null && (
          <>
            <div className="naxatw-flex naxatw-gap-2">
              <div className="naxatw-h-[12.5rem] naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg naxatw-overflow-y-auto scrollbar">
                <ul>
                  {fields.map(({ name, alias }) => (
                    <li
                      key={name}
                      role="presentation"
                      className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800"
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
              <div className="naxatw-h-[12.5rem] naxatw-w-full">
                <div className="naxatw-grid naxatw-grid-cols-3 naxatw-items-center naxatw-justify-items-center naxatw-gap-2">
                  {dataQueryOperators.map(({ id, label, value, type }) => (
                    <a
                      key={id}
                      className={btnClassname}
                      onClick={() => {
                        handleQuerySelect(value, type);
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="naxatw-h-[12.5rem] naxatw-w-full naxatw-border naxatw-border-grey-400 naxatw-rounded-lg naxatw-overflow-y-auto scrollbar">
                <ul>
                  {values?.map(item => (
                    <li
                      key={item}
                      role="presentation"
                      className="naxatw-px-3 naxatw-py-2 naxatw-text-[15px] naxatw-text-grey-800"
                      onClick={() => {
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
                <span className="naxatw-flex">
                  <textarea
                    type="text"
                    className="naxatw-block naxatw-w-full naxatw-px-3 naxatw-py-[0.8125rem] naxatw-font-normal naxatw-text-grey-700 naxatw-bg-white naxatw-bg-clip-padding naxatw-border naxatw-border-solid naxatw-border-grey-300 naxatw-rounded naxatw-transition naxatw-ease-in-out naxatw-m-0 naxatw-focus:text-grey-700 naxatw-focus:bg-white naxatw-focus:border-blue-600 naxatw-focus:outline-none naxatw-pointer-events-none"
                    name="about"
                    value={stringifyQuery(query)}
                    // onChange={handleChange}
                  />
                  <Button className="naxatw-btn naxatw-btn-sm naxatw-btn-secondary naxatw-btn-noborder naxatw-h-fit">
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

      <div className="naxatw-mt-12 naxatw-flex naxatw-items-center naxatw-justify-center">
        <Button className="naxatw-btn-primary" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}
