import React, {useContext, useState} from "react";
import { UserContext, ErrorsContext } from "./App";


function Profile() {

  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [currentUser, setCurrentUser] = useContext(UserContext)
  const [errors, setErrors] = useState([])


    function handleSubmit(event) {
        event.preventDefault();
        if(last_name == "") {
            setLastName(currentUser.last_name)
            console.log(last_name)
        }
        if(first_name == "") {
            setFirstName(currentUser.first_name)
            console.log(first_name)
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
                <p className="error">{Object.keys(errors)[0]} {errors[Object.keys(errors)[0]]}</p>
                <h1>Profile Page</h1>
                <h2>First Name: {currentUser.first_name}</h2>
                <h2>Last Name: {currentUser.last_name}</h2>
                <form id="Profile" onSubmit={handleSubmit}>
                    <input type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} value={first_name}/>
                    <input type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} value={last_name}/>
                    <button>Apply Changes</button>    
                </form>
                <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDelete}>Delete Profile</button>
            </div>
        );
    }else {
        return <h1>Please go to Login</h1>
    }
}

export default Profile;