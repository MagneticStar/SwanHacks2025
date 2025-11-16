import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import UserDeletion from "./components/user/UserDeletion";
import UserSignup from './components/user/UserSignup';
import UserLogin from './components/user/UserLogin';
import UserInfo from './components/user/UserInfo';
import Home from './components/home/Home';

function App() {

  const [user, setUser] = useState({
    id: '0',
    name: '0',
    email: '0',
    elo: '0'
  });

  const [course, setCourse] = useState({
    id: '',
    name: '',
    preview: '',
    description: '',
    timeTaken: '',
    percentScore: ''
  })

  return (
    <Router>
      <div className="flex-grow">
        <Routes>
          <Route path="/signup" element={<UserSignup userInfo={user} setUser={setUser} />} />
          <Route path="/login" element={<UserLogin setUserInfo={setUser} />} />
          <Route path="/user-info" element={<UserInfo userInfo={user} />} />
          <Route path="/delete-user" element={<UserDeletion userInfo={user} setUserInfo={setUser} />} />

          <Route path="/" element={<Home/>} />       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
