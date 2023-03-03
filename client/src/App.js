import './App.css';
import React, {useEffect, useState} from 'react';
import { Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Home from './Home';
import Bookings from './Bookings';
import Login from './SignUp';
import Profile from './Profile';
import SignUp from './SignUp';

export const Context = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/auth')
    .then(r => {
      if(r.ok) {
        r.json().then(user => setCurrentUser(user))
      }
    })
  },[])

  console.log("something")
  
  if(!currentUser) return <Login />

  console.log(currentUser)

  return (
    <Context.Provider value={[currentUser, setCurrentUser]}>
      <div className="App">
          <nav className='nav'>
            <h1>Title, Hi {currentUser}</h1>
            <NavLink to="/">Home</NavLink>
            <NavLink to="Profile">My Profile</NavLink>
            <NavLink to="Bookings">My Bookings</NavLink>
            <NavLink to="Login">Login</NavLink>
          </nav>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Bookings" element={<Bookings />} />
            <Route path="/SignUp" element={<SignUp currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
      </div>
    </Context.Provider>    
  );
}

export default App;
