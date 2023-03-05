import React, {useContext} from "react"
import { useNavigate } from "react-router-dom"
import { UserContext, EmailContext, PasswordContext } from "./App"
import SignUp from "./SignUp";

function Login() {

    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [email, setEmail] = useContext(EmailContext)
    const [password, setPassword] = useContext(PasswordContext)


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
            }else{
                res.json().then(console.log("login error"))
            }
        })
    }


    return (
        <>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={handleEmailChange} value={email}/>
            <input type="text" placeholder="Password" onChange={handlePasswordChange} value={password}/>
            <button>Login</button>    
        </form>
        </>
    )
}

export default Login