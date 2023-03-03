import React, {useContext} from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "./App"

function Login() {
    const [email, setEmail] = useContext(Context)
    const [password, setPassword] = useContext(Context)
    const [currentUser, setCurrentUser] = useContext(Context)

    const navigate = useNavigate();


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
                res.json().then(setCurrentUser)
                navigate("/Home")
            }else{
                res.json().then(console.log("login error"))
            }
        })
    }

    function handleSendToSignUp() {
        navigate("/SignUp")
    }


    return (
        <>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={handleEmailChange} value={email}/>
            <input type="text" placeholder="Password" onChange={handlePasswordChange} value={password}/>
            <button>Sign Up</button>    
        </form>
        <button onClick={handleSendToSignUp}>Go to Sign Up</button>
        </>
    )
}

export default Login