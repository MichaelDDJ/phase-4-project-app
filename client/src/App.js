import './App.css';
import React, {useEffect, useState, createContext} from 'react';
import { Routes, Route, NavLink} from 'react-router-dom';
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

function App() {
  const [currentUser, setCurrentUser] = useState("")
  const [errors, setErrors] = useState([])
  const [currentHotel, setCurrentHotel] = useState("")
  const [currentReview, setCurrentReview] = useState("")
  

  useEffect(() => {
    fetch('/auth')
    .then(r => {
      if(r.ok) {
        r.json().then(user => setCurrentUser(user))
      }else {
        r.json().then((errorMessage) => setErrors(errorMessage))
      }
    })
  },[])

  function handleRender() {
    const newUser = currentUser
    setCurrentUser(newUser)
    console.log("render")
}

  

  if (!currentUser) return <AuthPage setCurrentUser={setCurrentUser} />
  if (currentHotel) return <HotelPage currentHotel={currentHotel} setCurrentHotel={setCurrentHotel} />
  if (currentReview) return <ReviewEdit setCurrentUser={setCurrentUser} currentUser={currentUser} currentReview={currentReview} setCurrentReview={setCurrentReview} />
  console.log(currentUser)
  return (
            <UserContext.Provider value={[currentUser,setCurrentUser]}>
                <ErrorsContext.Provider value={[errors, setErrors]}>
                  <CurrentHotelContext.Provider value={[currentHotel, setCurrentHotel]}>
                    <CurrentReviewContext.Provider value={[currentReview, setCurrentReview]}>
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
                            <Route path="/Reviews" element={<Reviews reviews={currentUser.reviews} handleRender={handleRender}/>} />
                          </Routes>
                      </div>
                    </CurrentReviewContext.Provider>
                  </CurrentHotelContext.Provider>
                </ErrorsContext.Provider>
            </UserContext.Provider>    
  );
}

export default App;
