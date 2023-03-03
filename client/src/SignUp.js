import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './App';

function SignUp({currentUser, setCurrentUser}) {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    function handleFirstNameChange(event) {
        setFirstName(event.target.value)
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value)
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }


    function handleSubmit(e) {
        e.preventDefault()
        const user = {
            first_name,
            last_name,
            email,
            password
        }
        fetch('/users',{
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => setCurrentUser(user))
                navigate("/Login")
            }else{
                res.json().then(console.log("sign up error"))
            }
        })
    }

    function handleSendToLogin() {
        navigate("/Login")
    }

    return (
        <>
        <h1>Sign Up Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" onChange={handleFirstNameChange} value={first_name}/>
                <input type="text" placeholder="Last Name" onChange={handleLastNameChange} value={last_name}/>
                <input type="text" placeholder="Email" onChange={handleEmailChange} value={email}/>
                <input type="text" placeholder="Password" onChange={handlePasswordChange} value={password}/>
                <button>Sign Up</button>    
            </form>
            <button onClick={handleSendToLogin}>Go to Login</button>
        </>
    );

}

export default SignUp;