import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FirstNameContext, LastNameContext, EmailContext, PasswordContext } from './App';

function SignUp() {


    const [first_name, setFirstName] = useContext(FirstNameContext)
    const [last_name, setLastName] = useContext(LastNameContext)
    const [email, setEmail] = useContext(EmailContext)
    const [password, setPassword] = useContext(PasswordContext)


    function handleSubmit(event) {
        event.preventDefault();
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
                res.json().then(user => console.log(user))
            }else{
                res.json().then(console.log("sign up error"))
            }
        })
    }

    return (
        <>
        <h1>Sign Up Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} value={first_name}/>
                <input type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} value={last_name}/>
                <input type="text" placeholder="Email" onChange={(event) => setEmail(event.target.value)} value={email}/>
                <input type="text" placeholder="Password" onChange={(event) => setPassword(event.target.value)} value={password}/>
                <button>Sign Up</button>    
            </form>
        </>
    );

}

export default SignUp;