import React, {useContext} from "react"
import { useNavigate } from "react-router-dom"
import { UserContext, EmailContext, PasswordContext, ErrorsContext } from "./App"
import SignUp from "./SignUp";

function Login() {

    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [email, setEmail] = useContext(EmailContext)
    const [password, setPassword] = useContext(PasswordContext)
    const [errors, setErrors] = useContext(ErrorsContext)


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
                setErrors("")
            }else{
                res.json().then(console.log("login error"))
            }
        })
    }

    function handleLogout () {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setCurrentUser(null);
              
            }
        });
        setErrors("Must be logged in to review.")
    }

    if (currentUser) {
        return (
            <button onClick={handleLogout}>Logout</button>
        )
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