import React, {useContext, useState, useEffect} from "react";
import { UserContext, ErrorsContext, CurrentHotelContext } from "../Context/Context";
import ReviewedHotel from "./ReviewedHotel";


function Profile() {

    
  const [first, setFirstName] = useState("")
  const [last, setLastName] = useState("")
  const [currentUser, setCurrentUser] = useContext(UserContext)
  const [errors, setErrors] = useState([])
  const [userHotels, setUserHotels] = useState([])
  const [currentHotel, setCurrentHotel] = useContext(CurrentHotelContext)

    useEffect(() => {
    fetch('/reviewed_hotels')
    .then(r => r.json())
    .then((hotels) => setUserHotels(hotels))
    },[])

    const displayedHotels = userHotels.map((hotel) => {
        return <ReviewedHotel key={hotel.id} hotel={hotel} setCurrentHotel={setCurrentHotel} />
    })


    function handleSubmit(event) {
        event.preventDefault();

        let last_name = ""
        let first_name = ""

        if(last == "") {
            last_name = currentUser.last_name
        }else{
            last_name = last
        }
        if(first == "") {
            first_name = currentUser.first_name
        }else{
            first_name = first
        }
        const newUser = {
            first_name,
            last_name
        }
        fetch(`/users/${currentUser.id}`,{
            method: "PATCH",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newUser)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => setCurrentUser(user))
            }else{
                res.json().then(errors => setErrors(errors.error))
            }
        })
        setFirstName("")
        setLastName("")
    }

    function handleLogout () {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setCurrentUser(null); 
            }
        });
    }

    function handleDelete() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) { 
              fetch(`/users/${currentUser.id}`, {method: 'DELETE'}).then(setCurrentUser(null))
            }
        });

    }

    if(currentUser) {
        return (
            <div>
                <p className="error">{}</p>
                <h1>Profile Page</h1>
                <h2>First Name: {currentUser.first_name}</h2>
                <h2>Last Name: {currentUser.last_name}</h2>
                <form id="Profile" onSubmit={handleSubmit}>
                    <input type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} value={first}/>
                    <input type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} value={last}/>
                    <button>Apply Changes</button>    
                </form>
                <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDelete}>Delete Profile</button>
            <h1>Hotels Reviewed So Far</h1>
            {displayedHotels}
            </div>
        );
    }else {
        return <h1>Please go to Login</h1>
    }
}

export default Profile;