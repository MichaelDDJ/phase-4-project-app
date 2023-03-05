import React, {useContext} from "react";
import { UserContext, FirstNameContext, LastNameContext } from "./App";

function Profile() {
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [first_name, setFirstName] = useContext(FirstNameContext)
    const [last_name, setLastName] = useContext(LastNameContext)


    function handleSubmit(event) {
        event.preventDefault();
        const newUser = {
            first_name,
            last_name
        }
        console.log(newUser)
        console.log(currentUser)
        fetch(`/users/${currentUser.id}`,{
            method: "PATCH",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newUser)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => setCurrentUser(user))
            }else{
                res.json().then(console.log("Edit error"))
            }
        })
    }

    function handleDelete() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) { 
              fetch(`/users/${currentUser.id}`, {method: 'DELETE'}).then(setCurrentUser(null))
            }
        });

    }

    return (
        <div>
            <h1>Profile Page</h1>
            <form id="Profile" onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} value={first_name}/>
                <input type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} value={last_name}/>
                <button>Apply Changes</button>    
            </form>
        <button onClick={handleDelete}>Delete Profile</button>
        </div>
    );
}

export default Profile;