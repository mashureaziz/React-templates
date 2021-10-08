import { NavLink } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import { useContext } from "react";

const Header = (props) => {
    const auth = useContext(AuthContext);
    const isLoggedIn = auth.isLoggedIn;
    return (
    <div className = "header">
        <div className = "nav-wrapper">
        { isLoggedIn && <NavLink to ="/profile">Profile</NavLink> }
        {!isLoggedIn && <NavLink to ="/login">Login</NavLink> }
        {isLoggedIn && <NavLink to ="/logout">Logout</NavLink> }
        <NavLink to = "/input"> Input </NavLink>
        </div>
    </div>
    )
}

export default Header;

