import './App.css';
import React, {useEffect, useState, createContext} from 'react';
import { Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Home from './Home';
import Reviews from './Reviews';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';

export const FirstNameContext = createContext();
export const LastNameContext = createContext();
export const EmailContext = createContext();
export const PasswordContext = createContext();
export const UserContext = createContext();
export const HotelContext = createContext();
export const ErrorsContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hotels, setHotels] = useState([])
  const [errors, setErrors] = useState("")
  

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


  return (
    <FirstNameContext.Provider value={[first_name, setFirstName]}>
      <LastNameContext.Provider value={[last_name, setLastName]}>
        <EmailContext.Provider value={[email, setEmail]}>
          <PasswordContext.Provider value={[password, setPassword]}>
            <UserContext.Provider value={[currentUser,setCurrentUser]}>
              <HotelContext.Provider value={[hotels, setHotels]}>
                <ErrorsContext.Provider value={[errors, setErrors]}>
                  <div className="App">
                      <nav className='nav'>
                        <h1>{currentUser ? `Hotel Reviews, Hi ${currentUser.first_name}`: "Please login"}</h1>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="Profile">My Profile</NavLink>
                        <NavLink to="Reviews">My Reviews</NavLink>
                        <NavLink to="Login">Login</NavLink>
                        <NavLink to="SignUp">SignUp</NavLink>
                      </nav>
                      <p className='error'>{errors.error}</p>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Reviews" element={<Reviews />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/SignUp" element={<SignUp />} />
                      </Routes>
                  </div>
                </ErrorsContext.Provider>
              </HotelContext.Provider>
            </UserContext.Provider>
          </PasswordContext.Provider>
        </EmailContext.Provider>
      </LastNameContext.Provider>
    </FirstNameContext.Provider>    
  );
}

export default App;
