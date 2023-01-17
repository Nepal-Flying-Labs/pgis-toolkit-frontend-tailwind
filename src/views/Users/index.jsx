import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Creators as CommonCreators } from '@Actions/common';
import { Creators as AuthCreators } from '@Actions/authentication';
import { Creators as OrganizationsCreators } from '@Actions/organizations';
import Header from '@Components/common/Header';
// import Button from '@Components/common/Button';
import UserPanel from '@Components/Users';

// const { toggleModal } = CommonCreators;
const { getOrganizationsRequest } = OrganizationsCreators;
const { getUserPermissionsRequest } = AuthCreators;

export default function Users() {
  // const userPermissions = useSelector(
  //   state => state.authentication.userPermissions,
  // );
  const ordering = useSelector(state => state.organizations.ordering);
  const searchText = useSelector(state => state.organizations.searchText);
  const page = useSelector(state => state.organizations.pagination.page);
  const rowSelect = useSelector(
    state => state.organizations.pagination.rowSelect,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getOrganizationsRequest({
        search: searchText,
        page,
        limit: rowSelect,
        ordering,
      }),
    );
  }, [dispatch, searchText, page, rowSelect, ordering]);

  useEffect(() => {
    dispatch(getUserPermissionsRequest());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="naxatw-mt-24 naxatw-px-10">
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <h3>Users</h3>
          {/* {userPermissions?.includes('add_organization') && (
            <Button
              className="naxatw-btn-primary"
              iconLeft="add"
              onClick={() => dispatch(toggleModal('create-organization'))}
            >
              Add Users
            </Button>
          )} */}
        </div>

        <UserPanel />
      </div>
    </div>
  );
}
