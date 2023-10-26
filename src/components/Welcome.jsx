import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/authContext.jsx";
import { useJwt } from "react-jwt";
import { Button, Space, Divider } from "antd";
import "./styling/welcome.css"

export default function Welcome () {
    const { token } = useContext(AuthContext)
    const { decodedToken } = useJwt(token);
    
    return (    
        <>
        <div className="welcomeContainer">
        <h1>Welcome {decodedToken?.name}!</h1>
        <Button
        className="welcomeButtons"
        type="primary" 
        ghost
        shape="round"
        >
        <NavLink to="/" style={{width: "100%"}}>
        My Dashboard
        </NavLink>
        </Button>

        <Button
        className="welcomeButtons"
        type="primary" 
        ghost
        shape="round"
        >
        <NavLink to={`/profile/${decodedToken?.name}`} style={{width: "100%"}}>
        My Profile
        </NavLink>
        </Button>
        

        
        <Button
        className="welcomeButtons"
        type="primary" 
        ghost
        shape="round"
        >
        <NavLink to="/events" style={{width: "100%"}}>
        Find Events
        </NavLink>
        </Button>

        <Button
        className="welcomeButtons"
        type="primary" 
        ghost
        shape="round"
        >
        <NavLink to="/events/create" style={{width: "100%"}}>
        Create Event
        </NavLink>
        </Button>
        </div>
        </>
    )
}