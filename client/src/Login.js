import React, { useState} from "react"

//set errors

function Login({setCurrentUser}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])


    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const user = {
            email,
            password
        }
        fetch('/login',{
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => setCurrentUser(user))
                setErrors([])
            }else{
                res.json().then(error => setErrors(error))
            }
        })
        setEmail("")
        setPassword("")
    }

    return (
        <>
        <h1>Login Page</h1>
        {errors == [] ? <></> : <p className="error">{errors[Object.keys(errors)[0]]}</p>}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={handleEmailChange} value={email}/>
            <input type="text" placeholder="Password" onChange={handlePasswordChange} value={password}/>
            <button>Login</button>    
        </form>
        </>
    )
}

export default Login