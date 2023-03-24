import './App.css';
import React, {useEffect, useState, createContext} from 'react';
import { Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Home from './Home';
import Reviews from './Reviews';
import Profile from './Profile';
import AuthPage from './AuthPage';
import HotelPage from './HotelPage';
import ReviewEdit from './ReviewEdit';

export const UserContext = createContext();
export const ErrorsContext = createContext();
export const CurrentHotelContext = createContext();
export const CurrentReviewContext = createContext();
export const HotelContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState("")
  const [errors, setErrors] = useState([])
  const [hotels, setHotels] = useState([])
  const [currentHotel, setCurrentHotel] = useState("")
  const [currentReview, setCurrentReview] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/auth')
    .then(r => {
      if(r.ok) {
        r.json().then(user => {
          setCurrentUser(user)
          navigate("/")
        })
        
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
  console.log(hotels)
  console.log(currentUser)
  if (!currentUser) return <AuthPage setCurrentUser={setCurrentUser} />
  if (currentHotel) return <HotelPage currentHotel={currentHotel} setCurrentHotel={setCurrentHotel} />
  if (currentReview) return <ReviewEdit setCurrentUser={setCurrentUser} currentUser={currentUser} currentReview={currentReview} setCurrentReview={setCurrentReview} />
  
  return (
            <UserContext.Provider value={[currentUser,setCurrentUser]}>
              <HotelContext.Provider value={[hotels, setHotels]}>
                <ErrorsContext.Provider value={[errors, setErrors]}>
                  <CurrentHotelContext.Provider value={[currentHotel, setCurrentHotel]}>
                    <CurrentReviewContext.Provider value={[currentReview, setCurrentReview]}>
                      <div className="App">
                          <nav className='nav'>
                            <h1>Hotel Reviews, Hi {currentUser.first_name}</h1>
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/profile">My Profile</NavLink>
                            <NavLink to="/reviews">My Reviews</NavLink>
                          </nav>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/reviews" element={<Reviews />} />
                          </Routes>
                      </div>
                    </CurrentReviewContext.Provider>
                  </CurrentHotelContext.Provider>
                </ErrorsContext.Provider>
              </HotelContext.Provider>
            </UserContext.Provider>    
  );
}

export default App;
