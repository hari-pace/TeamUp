import { NavLink } from "react-router-dom"

export default function Logo() {
    return (
        <NavLink style={{textDecoration: "none"}}to="/dashboard/user">
    <div className="logo">
        TeamUp
        </div>
        </NavLink> 
    )
}