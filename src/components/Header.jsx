import Logo from "./Logo"
import Avatar from "./Avatar"
import { Button, Space } from "antd";
import { useState, useEffect } from "react"
import Login from "./user/Login";
import Signup from "./user/Signup";
import "./styling/header.css"

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (!user) {
  setUser(JSON.parse(localStorage.getItem("user")))
  }},[user])

  const handleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
<>
<div className="header">
<div className="headerLeft">
<Logo />
</div>
<div className="headerRight">
  {user !== null && (
    <>
  <Avatar />
    <Space> 
  <Button
  className="loginButtons"
  type="primary" 
  ghost 
  onClick={handleClick}
  >
    Logout
  </Button>
  </Space>
  </>
  )}
  {user === null && (
    <>
    <Login user={user} setUser={setUser} />
    <Signup />
    </>
    )}
  {/* <Space> 
  <Button
  className="loginButtons"   
  type="primary" 
  ghost 
  onClick={() => setLoggedIn(true)}
  >
    Login
  </Button>
  </Space>
  <Space>
  <Button
  className="loginButtons" 
  type="primary" 
  ghost
  >Signup
  </Button>
  </Space>
  </>)} */}
  </div>
  </div>
</>
  )
}
