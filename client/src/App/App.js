import './App.css';
import React, {useEffect, useState, createContext} from 'react';
import { Routes, Route, NavLink, useNavigate} from 'react-router-dom';
import Home from '../Home Route/Home';
import Reviews from '../My Reviews/Reviews';
import Profile from '../Profile Route/Profile';
import AuthPage from './AuthPage';
import HotelPage from './HotelPage';
import ReviewEdit from './ReviewEdit';
import NavBar from './NavBar';
import {UserContext, HotelContext, ErrorsContext, CurrentHotelContext, CurrentReviewContext} from '../Context/Context'

function App() {
  const [currentUser, setCurrentUser] = useState()
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

  //use filter
  //fix fields
  console.log(currentUser)
  console.log(hotels)
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
                          <NavBar />
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
