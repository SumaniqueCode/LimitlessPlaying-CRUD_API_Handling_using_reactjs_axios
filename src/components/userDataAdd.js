import axios from 'axios';
import React, { useState } from 'react';
import UserData from './UserData';
import { useNavigate } from 'react-router-dom';

const API = "http://localhost:8000/api";
const UserDataAdd = () => {
  const [userData, setUserData] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const addUserData = async(e, url)=>{
    e.preventDefault();
    try {
      const res = await axios
      .post(`${API}/add-user`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        gender: gender,
        password: password,
        password_confirmation: password_confirmation,
        address: address,
      })
navigate(0);
    } catch (error) {
      seterrorMessage(error.message); //handling error
    }
  }


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
      <UserData />
      <div className='m-4 border border-primary p-4'>
      <form className='form' onSubmit={(e) => addUserData(e)}>
  <h3 className='p-2 text-white bg-primary border rounded'>Enter user details</h3>
  <div className='d-flex'>
  </div>
  <div className='d-flex'>
    <label className='mx-auto'>First Name: </label>
    <input id='firstName' className='firstName form-control mx-5 w-75 my-2' value={firstName} onChange={(e) => setFirstName(e.target.value)}
    />
  </div>  <div className='d-flex'>
    <label className='mx-auto'>Last Name: </label>
    <input id='lastName' className='lastName form-control mx-5 w-75 my-2' value={lastName} onChange={(e) => setLastName(e.target.value)}
    />
  </div>  <div className='d-flex'>
    <label className='mx-auto'>Gender: </label>
    <input id='gender' className='gender form-control mx-5 w-75 my-2' value={gender} onChange={(e) => setGender(e.target.value)}
    />
  </div>  <div className='d-flex'>
    <label className='mx-auto'>Phone: </label>
    <input id='phone' className='phone form-control mx-5 w-75 my-2' value={phone} onChange={(e) => setPhone(e.target.value)}
    />
  </div>  <div className='d-flex'>
    <label className='mx-auto'>Email: </label>
    <input id='email' className='email form-control mx-5 w-75 my-2' value={email} onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className='d-flex'>
    <label className='mx-auto'>Address: </label>
    <input id='address' className='address form-control mx-5 w-75 my-2'value={address} onChange={(e) => setAddress(e.target.value)}/>
  </div>
  <div className='d-flex'>
    <label className='mx-auto'>Password: </label>
    <input id='password' className='password form-control mx-5 w-75 my-2' value={password} onChange={(e) => setPassword(e.target.value)}/>
  </div>
  <div className='d-flex'>
    <label className='mx-auto'>Confirm Password: </label>
    <input id='password_confirmation' className='password_confirmation form-control mx-5 w-75 my-2' value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
  </div>
  <button type='submit' className='btn btn-primary'>Add</button>
      </form>
      </div>
    </div>
  );
};

export default UserDataAdd;
