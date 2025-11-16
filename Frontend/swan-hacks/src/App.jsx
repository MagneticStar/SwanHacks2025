import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import UserSignup from './components/user/UserSignup';
import UserLogin from './components/user/UserLogin';
import Home from './components/home/Home';

function App() {

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    elo: ''
  });

  return (
    <Router>
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw"
      }}>
        <Routes>
          <Route path="/signup" element={<UserSignup user={user} setUser={setUser} />} />
          <Route path="/login" element={<UserLogin setUserInfo={setUser} />} />
          <Route path="/" element={<Home/>} />       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
