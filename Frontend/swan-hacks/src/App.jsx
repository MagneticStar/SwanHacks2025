import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import UserDeletion from "./components/user/UserDeletion";
import UserSignup from './components/user/UserSignup';
import UserLogin from './components/user/UserLogin';
import UserInfo from './components/user/UserInfo';

function App() {

  const [user, setUser] = useState({
    id: '1',
    name: '1',
    email: '1',
    elo: '1'
  });

  const [course, setCourse] = useState({
    id: '',
    name: '',
    preview: '',
    description: ''
  })

  return (
    <Router>
      <div className="flex-grow">
        <Routes>
          <Route path="/signup" element={<UserSignup user={user} setUser={setUser} />} />
          <Route path="/login" element={<UserLogin setUserInfo={setUser} />} />
          <Route path="/user-info" element={<UserInfo userInfo={user} />} />
          <Route path="/delete-user" element={<UserDeletion userInfo={user} setUserInfo={setUser} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
