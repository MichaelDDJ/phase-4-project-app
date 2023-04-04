import { useContext } from "react"
import { UserContext } from "../Context/Context"
import { NavLink } from "react-router-dom"

function NavBar() {
    const [currentUser, setCurrentUser] = useContext(UserContext)

    return (
        <nav className='nav'>
            <h1>Hotel Reviews, Hi {currentUser.first_name}</h1>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profile">My Profile</NavLink>
            <NavLink to="/reviews">My Reviews</NavLink>
        </nav>
    )
}

export default NavBar