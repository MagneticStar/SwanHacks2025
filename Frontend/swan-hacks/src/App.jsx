import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

import UserDeletion from "./components/user/UserDeletion";
import UserSignup from './components/user/UserSignup';
import UserLogin from './components/user/UserLogin';
import UserInfo from './components/user/UserInfo';
import Home from './components/home/Home';

function App() {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    elo: '',
    token: ''
  });

  const [course, setCourse] = useState({
    id: '',
    name: '',
    preview: '',
    description: '',
    timeTaken: '',
    percentScore: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetch('http://localhost:8080/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Invalid token');
      return res.json();
    })
    .then(data => {
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        elo: data.elo,
        token: token
      });
    })
    .catch(err => {
      console.error(err);
      localStorage.removeItem('authToken'); // remove token if invalid
    });
  }, []);

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
        <Routes>
          <Route path="/" element={<Home userInfo={user}/>} />

          {/* User */}
          <Route path="/login" element={<UserLogin setUserInfo={setUser} />} />
          <Route path="/signup" element={<UserSignup userInfo={user} setUser={setUser} />} />
          <Route path="/user-info" element={<UserInfo userInfo={user} setUserInfo={setUser} />} />
          <Route path="/delete-user" element={<UserDeletion userInfo={user} setUserInfo={setUser} />} />

          {/* Course */}
          {/* Fill in here!!! */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
