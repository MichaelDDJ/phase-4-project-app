import React, { useState} from 'react';


function SignUp({setCurrentUser}) {
 
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

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
                res.json().then(user => setCurrentUser(user))
            }else{
                res.json().then(error => setErrors(error))
            }
        })


        document.getElementById("SignUp").reset();
    }

    
    return (
        <div>
            <h1>Sign Up Page</h1>
            {errors == []? <></> : <p className="error">{errors[Object.keys(errors)[0]]}</p>}
            <form id="SignUp" onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} value={first_name}/>
                <input type="text" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} value={last_name}/>
                <input type="text" placeholder="Email" onChange={(event) => setEmail(event.target.value)} value={email}/>
                <input type="text" placeholder="Password" onChange={(event) => setPassword(event.target.value)} value={password}/>
                <button>Sign Up</button>    
            </form>
        </div>
    );

}

export default SignUp;