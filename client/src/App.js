import './App.css';
import React, {useEffect, useState, createContext} from 'react';
import { Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Home from './Home';
import Bookings from './Bookings';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';

export const FirstNameContext = createContext();
export const LastNameContext = createContext();
export const EmailContext = createContext();
export const PasswordContext = createContext();
export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/auth')
    .then(r => {
      if(r.ok) {
        r.json().then(user => setCurrentUser(user))
        navigate("/Home")
      }else {
        navigate("/Login")
      }
    })
  },[])


  return (
    <FirstNameContext.Provider value={[first_name, setFirstName]}>
      <LastNameContext.Provider value={[last_name, setLastName]}>
        <EmailContext.Provider value={[email, setEmail]}>
          <PasswordContext.Provider value={[password, setPassword]}>
            <UserContext.Provider value={[currentUser,setCurrentUser]}>
              <div className="App">
                  <nav className='nav'>
                    <h1>{currentUser ? `Title, Hi ${currentUser.first_name}`: "Please login"}</h1>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="Profile">My Profile</NavLink>
                    <NavLink to="Bookings">My Bookings</NavLink>
                    <NavLink to="Login">Login</NavLink>
                    <NavLink to="SignUp">SignUp</NavLink>
                  </nav>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Bookings" element={<Bookings />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />
                  </Routes>
              </div>
            </UserContext.Provider>
          </PasswordContext.Provider>
        </EmailContext.Provider>
      </LastNameContext.Provider>
    </FirstNameContext.Provider>    
  );
}

export default App;
