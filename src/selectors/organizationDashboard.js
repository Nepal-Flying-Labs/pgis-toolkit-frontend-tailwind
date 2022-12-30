/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const assignListSelector = state => state.organizationDashboard.assignList;
const assignRoleSelector = state => state.organizationDashboard.userGroup;

export const assignProjectListSelector = createSelector(
  [assignListSelector],
  lists => {
    if (!lists) return [];
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
