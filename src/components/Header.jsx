import Logo from "./Logo"
import Avatar from "./Avatar"
import { Button, Space } from "antd";
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/authContext.jsx";
import { useJwt } from "react-jwt";
import Login from "./user/Login";
import Signup from "./user/Signup";
import "./styling/header.css"

export default function Header() {
  const { logout, token } = useContext(AuthContext);
  const [loadings, setLoadings] = useState([]);

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

  return (
<>
<div className="header">
<div className="headerLeft">
<Logo />
</div>
<div className="headerRight">
  {token !== null && (
    <>
    <h3>Hello, {decodedToken?.name}</h3>
  <Avatar />
    <Space> 
  <Button
  className="loginButtons"
  type="primary" 
  ghost
  loading={loadings[0]} 
  onClick={handleClick}
  >
    Logout
  </Button>
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
</>
  )
}
