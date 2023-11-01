import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/authContext";

export default function Logo() {
    const { token } = useContext(AuthContext);
    return (
        <NavLink style={{textDecoration: "none"}} to={token ? "/dashboard/user" : "/"}>
    <div className="logo">
        TeamUp
        </div>
        </NavLink> 
    )
}