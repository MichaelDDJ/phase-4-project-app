import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

function AuthPage ({setCurrentUser}) {

    const [showLogin, setShowLogin] = useState(true)

    return (
        <>
        {showLogin ? (
            <>
                <Login setCurrentUser={setCurrentUser} />
                <p>
                    Click here to sign up
                    <button onClick={() => setShowLogin(false)}>Sign Up</button>
                </p>
            </>
        ) : (
            <>
                <SignUp setCurrentUser={setCurrentUser} />
                <p>
                    Click here to login
                    <button onClick={() => setShowLogin(true)}>Login</button>
                </p>
            </>
        )}
        </>
    )
}

export default AuthPage;