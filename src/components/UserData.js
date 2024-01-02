import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, Route, useNavigate } from 'react-router-dom';

const API = "http://localhost:8000/api";

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Using async await method
  const getUserData = async (url) => {
    // for error handling, use try catch block
    try {
      const res = await axios.get(url);
      setUserData(res.data.users);
    } catch (error) {
      setErrorMessage(error.message); // handling error
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.get(`${API}/delete-user/${userId}`);
      setUserData((prevData) => prevData.filter(user => user.id !== userId));
      // navigate(0);
    } catch (error) {
      setErrorMessage(error.message); // handling error
    }
  };

  // Using async await method
  useEffect(() => {
    getUserData(`${API}/get-user-data`);
  }, []);

  if (errorMessage) {
    return (
      <>
        <h1>Something went wrong</h1>
        <h2>{errorMessage}</h2>
      </>
    );
  }

  return (
    <div className='container'>
      {errorMessage !== "" && <h2>{errorMessage}</h2>}
      <div align="right">
        <NavLink className='btn btn-primary my-2 align-right'>Add User</NavLink>
      </div>
      <div className='m-2'>
        <table border={1} align='center' className='table table-hover table-primary-subtle'>
          <thead className='table table-success'>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>Gender</td>
              <td>Address</td>
              <td>Email</td>
              <td>Phone</td>
              <td>ACTION</td>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                <NavLink to={`/update/${user.id}`}  className='btn btn-primary mx-2'>
                    Edit
                  </NavLink>
                  <button onClick={() => {deleteUser(user.id);}}  className='btn btn-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserData;
