import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthCreators } from '@Actions/authentication';
import { Creators as OrganizationsCreators } from '@Actions/organizations';
import Header from '@Components/common/Header';
import Button from '@Components/common/Button';
import Modal from '@Components/common/Modal';
import {
  CreateAnOrganization,
  CreateOrganizationSuccess,
} from '@Components/Organizations/ModalContent';
import AccessToFunctionalities from '@Components/ModalContent/AccessToFunctionalities';
import OrganizationList from '@Components/Organizations/OrganizationList';

const { getOrganizationsRequest, toggleModal } = OrganizationsCreators;
const { getUserPermissionsRequest, getUserGroupRequest } = AuthCreators;

function getModalTitle(content) {
  switch (content) {
    case 'create-organization':
      return 'Create an Organization';
    case 'create-organization-success':
      return '';
    default:
      return '';
  }
}

function getModalContent(content) {
  switch (content) {
    case 'create-organization':
      return <CreateAnOrganization />;
    case 'create-organization-success':
      return <CreateOrganizationSuccess />;
    case 'access-to-functionalities':
      return <AccessToFunctionalities />;
    default:
      return '';
  }
}

export default function Organizations() {
  const userPermissions = useSelector(
    state => state.authentication.userPermissions,
  );
  const modalContent = useSelector(state => state.organizations.modalContent);
  const searchText = useSelector(state => state.organizations.searchText);
  const page = useSelector(state => state.organizations.pagination.page);
  const rowSelect = useSelector(
    state => state.organizations.pagination.rowSelect,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getOrganizationsRequest({ search: searchText, page, limit: rowSelect }),
    );
  }, [dispatch, searchText, page, rowSelect]);

  useEffect(() => {
    dispatch(getUserPermissionsRequest());
    dispatch(getUserGroupRequest());
  }, [dispatch]);

  return (
    <div>
      <Header />

      <Modal
        show={!!modalContent}
        title={getModalTitle(modalContent)}
        onClose={() => dispatch(toggleModal())}
      >
        {getModalContent(modalContent)}
      </Modal>

      <div className="naxatw-mt-24 naxatw-px-10">
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <h3 className="naxatw-font-bold naxatw-tracking-wider">
            Organizations
          </h3>
          {userPermissions?.includes('add_organization') && (
            <Button
              className="naxatw-btn-primary"
              iconLeft="add_circle_outline"
              onClick={() => dispatch(toggleModal('create-organization'))}
            >
              Create New
            </Button>
          )}
        </div>

        <OrganizationList />
      </div>
    </div>
  );
}
