import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {},
  { prefix: 'projectDashboard/' },
);

export default Creators;
