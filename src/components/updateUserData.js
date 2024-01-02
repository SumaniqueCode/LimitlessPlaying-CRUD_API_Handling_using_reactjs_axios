import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserData from './UserData';
import { useParams, useNavigate} from 'react-router-dom';

const API = "http://localhost:8000/api";
const UpdateUserData = () => {
    const [userData, setUserData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [address, setAddress] = useState('');

  const {userId} = useParams(); 
  const navigate = useNavigate();

    // Using async await method
    const getUserData = async (url) => {
        // for error handling, use try catch block
        try {
          const res = await axios.get(url);
          const users = res.data.users.find(users => users.id == userId);
          if(users)
          {
            setId(users.id);
            setFirstName(users.firstName);
            setLastName(users.lastName);
            setGender(users.gender);
            setPhone(users.phone);
            setEmail(users.email);
            setAddress(users.address);
          }
        } catch (error) {
          setErrorMessage(error.message); // handling error
        }
      };
    
      // Using async await method
      useEffect(() => {
        getUserData(`${API}/get-user-data`);
      }, [userId]);

      
  const updateUser = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios
      .post(`${API}/edit-user`, {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        gender: gender,
        password: password,
        password_confirmation: password_confirmation,
        address: address,
      })
      navigate(-1);
    } catch (error) {
      setErrorMessage(error.message); //handling error
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
            <UserData />
            <div className='m-4 border border-primary p-4'>
                <form className='form' onSubmit={(e) => updateUser(e)}>
                    <h3 className='p-2 text-white bg-primary border rounded'>UPDATE user details</h3>
                    <div className='d-flex'>
                    </div>
                    <div className='d-flex'>
                        <input id='id' type='hidden' className='id form-control mx-5 w-75 my-2' value={id} onChange={(e) => setId(e.target.value)}/>
                    </div>
                    <div className='d-flex'>
                        <label className='mx-auto'>First Name: </label>
                        <input id='firstName' className='firstName form-control mx-5 w-75 my-2' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                      <div className='d-flex'>
                        <label className='mx-auto'>Last Name: </label>
                        <input id='lastName'className='lastName form-control mx-5 w-75 my-2'value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>  <div className='d-flex'>
                        <label className='mx-auto'>Gender: </label>
                        <input id='gender'className='id form-control mx-5 w-75 my-2' value={gender} onChange={(e) => setGender(e.target.value)}/>
                    </div>  <div className='d-flex'>
                        <label className='mx-auto'>Phone: </label>
                        <input id='phone' className='phone form-control mx-5 w-75 my-2' value={phone} onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                      <div className='d-flex'>
                        <label className='mx-auto'>Email: </label>
                        <input id='email' className='email form-control mx-5 w-75 my-2' value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='d-flex'>
                        <label className='mx-auto'>Address: </label>
                        <input
                            id='address' className='address form-control mx-5 w-75 my-2' value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className='d-flex'>
                        <label className='mx-auto'>Password: </label>
                        <input id='password' className='password form-control mx-5 w-75 my-2' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='d-flex'>
                        <label className='mx-auto'>Confirm Password: </label>
                        <input id='password_confirmation' class='password_confirmation form-control mx-5 w-75 my-2' value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                    </div>
                    <button type='submit' className='btn btn-primary'>UPDATE</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserData;
