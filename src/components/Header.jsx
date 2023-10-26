import Logo from "./Logo"
import Avatar from "./Avatar"
import { Button, Space, Divider } from "antd";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/authContext.jsx";
import { useJwt } from "react-jwt";
import Login from "./user/Login";
import Signup from "./user/Signup";
import "./styling/header.css"

export default function Header() {
  const { logout, token } = useContext(AuthContext);
  const [loadings, setLoadings] = useState([]);
  const [animate, setAnimate] = useState(false);

  const { decodedToken } = useJwt(token);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const handleClick = () => {
    enterLoading(0);
    setTimeout(() => {
    localStorage.removeItem("token");
    logout()}, 5000);
  };

  const handleAnimate = () => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false)
    }, 1000);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    handleAnimate();
    const interval = setInterval(handleAnimate, 10000);
    return () => {clearInterval(interval)}
  }, [])

  return (
<>
<div className="header">
<div className="headerLeft">
<Logo />
</div>
<div className="headerRight">
  {token !== null && (
    <>
  
  <Link to={`profile/${decodedToken?.name}`}> <Avatar className="avatarMini" /> </Link>
    <Space>
  <div className="avatarCon">
  <div className={animate ? "animateGreeting" : "greeting"}>
    <h3>{decodedToken?.name}</h3>
    </div>
  <Button
  className="logoutButtons"
  type="primary" 
  ghost
  loading={loadings[0]} 
  onClick={handleClick}
  >
    Logout
  </Button>
  </div> 
  </Space>
  </>
  )}
  {token === null && (
    <>
    <Login />
    <Signup />
    </>
    )}
  </div>
  </div>
  <Divider className="headerDivider"/>
</>
  )
}
