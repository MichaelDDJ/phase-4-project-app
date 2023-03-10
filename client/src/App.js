import './App.css';
import React, {useEffect, useState, createContext} from 'react';
import { Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Home from './Home';
import Reviews from './Reviews';
import Profile from './Profile';
import AuthPage from './AuthPage';

export const UserContext = createContext();
export const HotelContext = createContext();
export const ErrorsContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState("")
  
  const [hotels, setHotels] = useState([])
  const [errors, setErrors] = useState([])
  

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/auth')
    .then(r => {
      if(r.ok) {
        r.json().then(user => setCurrentUser(user))
        navigate("/")
      }else {
        r.json().then((errorMessage) => setErrors(errorMessage))
      }
    })
  },[])

  useEffect(() => {
    fetch('/hotels')
    .then(r => r.json())
    .then(hotels => setHotels(hotels))
  },[])

  if (!currentUser) return <AuthPage setCurrentUser={setCurrentUser} />
  return (
            <UserContext.Provider value={[currentUser,setCurrentUser]}>
              <HotelContext.Provider value={[hotels, setHotels]}>
                <ErrorsContext.Provider value={[errors, setErrors]}>
                  <div className="App">
                      <nav className='nav'>
                        <h1>Hotel Reviews, Hi {currentUser.first_name}</h1>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="Profile">My Profile</NavLink>
                        <NavLink to="Reviews">My Reviews</NavLink>
                      </nav>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Reviews" element={<Reviews />} />
                      </Routes>
                  </div>
                </ErrorsContext.Provider>
              </HotelContext.Provider>
            </UserContext.Provider>    
  );
}

export default App;
