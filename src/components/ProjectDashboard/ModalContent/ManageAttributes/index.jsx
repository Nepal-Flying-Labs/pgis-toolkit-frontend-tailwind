/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import Table, { TableHeader } from '@Components/common/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import SortingContainer from '@Components/common/SortingContainer/index';
import Button from '@Components/common/Button/index';
import { Creators, Types } from '@Actions/projectDashboard';
import { Creators as CommonCreators } from '@Actions/common';
import MaterialIcon from '@Components/common/MaterialIcon/index';
import { checkIfLoading } from '@Utils/loaderSelector';
import TableSkeleton from '@Components/common/TableSkeleton/index';
import CustomCheckbox from '@Components/common/CustomCheckbox/index';

const { toggleModal, togglePromptDialog } = CommonCreators;
const {
  getLayerAttributeRequest,
  postAttributeSelectionRequest,
  setAttributeList,
  setIndividualAttribute,
  clearAttributeListData,
} = Creators;

const ManageAttributes = () => {
  const [checkedData, setCheckedData] = useState([]);
  const dispatch = useDispatch();
  const showModal = useSelector(state => state.common.showModal);
  const modalContent = useSelector(state => state.common.modalContent);
  const selectedData = useSelector(
    state => state.projectDashboard.data.manageData.selectedData,
  );
  const attributeList = useSelector(
    state => state.projectDashboard.data.manageData.attributeList,
  );

  useEffect(() => {
    setCheckedData(attributeList);
  }, [attributeList]);

  useEffect(() => {
    if (attributeList.length < 1)
      dispatch(getLayerAttributeRequest({ layer_template: selectedData?.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedData]);

  const loading = useSelector(state =>
    checkIfLoading(state, [Types.GET_LAYER_ATTRIBUTE_REQUEST]),
  );

  const submitLoading = useSelector(state =>
    checkIfLoading(state, [Types.POST_ATTRIBUTE_SELECTION_REQUEST]),
  );

  const handleCheckedData = datas => {
    const { selected } = datas;
    const newData = checkedData.map(list =>
      list.id === datas.id ? { ...list, selected: !selected } : { ...list },
    );
    setCheckedData(newData);
  };

  const handleSubmit = () => {
    const initialValue = {};
    const data = checkedData.reduce((obj, item) => {
      return {
        ...obj,
        [item.id]: item.selected,
      };
    }, initialValue);
    dispatch(postAttributeSelectionRequest(data));
  };

  return (
    <div className="">
      <div className="naxatw-flex naxatw-justify-end ">
        <Button
          iconLeft="add"
          className="naxatw-text-secondary-400 hover:naxatw-bg-[#F5F5F5] naxatw-group"
          onClick={() => {
            dispatch(setAttributeList(checkedData));
            dispatch(toggleModal('add-attributes'));
          }}
        >
          Attribute
        </Button>
      </div>
      <div className=" naxatw-overflow-x-hidden naxatw-relative naxatw-mt-[1.875rem]">
        {!loading ? (
          <Table
            data={checkedData || []}
            className="naxatw-w-full naxatw-text-left naxatw-text-grey-500 naxatw-text-sm"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            headerWidths={['50px', '200px', '150px', '150px', '50px']}
            // eslint-disable-next-line
            onRowClick={row => {
              handleCheckedData(row);
            }}
          >
            <TableHeader
              dataField=""
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader=""
              dataFormat={row => <CustomCheckbox status={row.selected} />}
            />
            <TableHeader
              dataField="Attribute"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 "
              rowcolSpan="rowSpan_2"
              dataHeader={
                <SortingContainer
                  name="Attribute"
                  className="naxatw-text-black"
                />
              }
              dataFormat={row => (
                <span className="naxatw-text-base naxatw-font-bold">
                  {row.name}
                </span>
              )}
            />
            <TableHeader
              dataField="Alias"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<span>Alias</span>}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.alias || '-'}</span>
              )}
            />
            <TableHeader
              dataField="Type"
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
              rowcolSpan="rowSpan_2"
              dataHeader={<span>Type</span>}
              dataFormat={row => (
                <span className="naxatw-text-base">{row.data_type}</span>
              )}
            />
            {/* <TableHeader
            dataField="Source"
            headerClassName="naxatw-py-[0.8125rem] naxatw-px-3"
            rowcolSpan="rowSpan_2"
            dataHeader={<span>Source</span>}
            dataFormat={row => (
              <span className="naxatw-text-base">{row.source}</span>
            )}
          /> */}
            <TableHeader
              dataField="."
              headerClassName="naxatw-py-[0.8125rem] naxatw-px-3 naxatw-text-right"
              rowcolSpan=""
              dataFormat={row => (
                <div className="naxatw-flex naxatw-gap-x-1">
                  <MaterialIcon
                    name="edit_outline"
                    className="naxatw-text-icon-md"
                    wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md"
                    onIconClick={e => {
                      e.stopPropagation();
                      dispatch(setIndividualAttribute(row));
                      dispatch(toggleModal('add-attributes'));
                    }}
                  />
                  <MaterialIcon
                    name="delete_outline"
                    className="naxatw-text-icon-md naxatw-text-[#FF0F0F]"
                    wrapperClassName="naxatw-icon-btn naxatw-icon-btn-md"
                    onIconClick={e => {
                      e.stopPropagation();
                      dispatch(setIndividualAttribute(row));
                      dispatch(togglePromptDialog('delete-template-attribute'));
                    }}
                  />
                </div>
              )}
            />
          </Table>
        ) : (
          <TableSkeleton itemNumber={4} />
        )}
      </div>
      <div className="naxatw-flex naxatw-justify-center naxatw-mt-5">
        <Button
          className="naxatw-btn-primary naxatw-w-[77px]"
          isLoading={submitLoading}
          loaderClassName="naxatw-fill-secondary-400"
          onClick={handleSubmit}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default ManageAttributes;
