/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const assignListSelector = state => state.organizationDashboard.assignList;
const organizationListSelector = state =>
  state.organizationDashboard.organizationAssignList;
const assignRoleSelector = state => state.organizationDashboard.userGroup;

export const assignProjectListSelector = createSelector(
  [assignListSelector, organizationListSelector],
  (lists, organizationList) => {
    if (!lists) return [];
    if (lists.length < 1 && organizationList.length > 0) {
      const newData = organizationList.map(list => ({
        ...list,
        checked: true,
        disabled: true,
      }));
      return newData;
    }
    const newData = lists.map(list => ({ ...list, checked: false }));
    return newData;
  },
);

export const assignRoleListSelector = createSelector(
  [assignRoleSelector],
  lists => {
    if (!lists) return [];
    const newData = lists.map(list => ({ ...list, checked: false }));
    return newData;
  },
);
