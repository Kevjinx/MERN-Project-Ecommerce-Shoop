import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchAllUsers, deleteUserById } from '../features/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const AdminAllUsersScreen = ({ history }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAdminGetAllUsers = useSelector(
    (state) => state.userAdminGetAllUsers
  );
  const { loading, error, users } = userAdminGetAllUsers;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userAdminDeleteById = useSelector((state) => state.userAdminDeleteById);
  const { success: successDelete } = userAdminDeleteById;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchAllUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, successDelete, userInfo, navigate]);

  const deleteHandler = (id) => {
    if (window.confirm('you sure you wanna delete this user?')) {
      dispatch(deleteUserById(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminAllUsersScreen;
