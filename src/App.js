import './App.css';
import UserData from './components/UserData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateUserData from './components/updateUserData';
import UserDataAdd from './components/userDataAdd';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<UserData />} />
      <Route path='/add' element={<UserDataAdd />} />
      <Route path='/update/:userId' element={<UpdateUserData/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
