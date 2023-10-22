import { NavLink } from "react-router-dom"

export default function Logo() {
    return (
        <NavLink style={{textDecoration: "none"}}to="/">
    <div className="logo">
        TeamUp
        </div>
        </NavLink> 
    )
}