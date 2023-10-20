import Logo from "./Logo"
import Avatar from "./Avatar"
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
  <div className="loginSignup"> 
  <button onClick={() => setLoggedIn(false)}>Logout</button>
  </div>
  </>
  )
  : (
  <div className="loginSignup"> 
  <button onClick={() => setLoggedIn(true)}>Login</button>
  <button>Signup</button>
  </div>)}
  </div>
  </div>
</>
  )
}
