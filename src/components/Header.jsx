import Logo from "./Logo"
import Avatar from "./Avatar"
import { Button, Space } from "antd";
import { useState } from "react"

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
<>
<div className="header">
<div className="headerLeft">
<Logo />
</div>
<div className="headerRight">
  {loggedIn ? (
    <>
  <Avatar />
    <Space> 
  <Button 
  type="primary" 
  ghost 
  onClick={() => setLoggedIn(false)}
  >
    Logout
  </Button>
  </Space>
  </>
  )
  : (
    <>
  <Space> 
  <Button   
  type="primary" 
  ghost 
  onClick={() => setLoggedIn(true)}
  >
    Login
  </Button>
  </Space>
  <Space>
  <Button 
  type="primary" 
  ghost
  >Signup
  </Button>
  </Space>
  </>)}
  </div>
  </div>
</>
  )
}
