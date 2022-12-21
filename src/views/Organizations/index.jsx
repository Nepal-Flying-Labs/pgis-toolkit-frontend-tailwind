import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { Creators as AuthCreators } from '@Actions/authentication';
import { Creators as OrganizationsCreators } from '@Actions/organizations';
import Header from '@Components/common/Header';
import Button from '@Components/common/Button';
import Modal from '@Components/common/Modal';
import OrganizationList from '@Components/Organizations/OrganizationList';
import { getModalContent } from '@src/constants/modalContents';

const { toggleModal } = CommonCreators;
const { getOrganizationsRequest } = OrganizationsCreators;
const { getUserPermissionsRequest } = AuthCreators;

export default function Organizations() {
  const userPermissions = useSelector(
    state => state.authentication.userPermissions,
  );
  const showModal = useSelector(state => state.common.showModal);
  const modalContent = useSelector(state => state.common.modalContent);
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
  }, [dispatch]);

  return (
    <div>
      <Header />

      <Modal
        show={showModal}
        title={getModalContent(modalContent)?.title}
        onClose={() => dispatch(toggleModal())}
      >
        {getModalContent(modalContent)?.content}
      </Modal>

      <div className="naxatw-mt-24 naxatw-px-10">
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <h3>List of Organizations</h3>
          {userPermissions?.includes('add_organization') && (
            <Button
              className="naxatw-btn-primary"
              iconLeft="add"
              onClick={() => dispatch(toggleModal('create-organization'))}
            >
              Create Organization
            </Button>
          )}
        </div>

        <OrganizationList />
      </div>
    </div>
  );
}
