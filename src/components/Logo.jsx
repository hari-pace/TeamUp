import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import TeamUp from "../assets/TeamUp.png";

export default function Logo() {
  const { token } = useContext(AuthContext);
  return (
    <NavLink
      style={{ textDecoration: "none" }}
      to={token ? "/dashboard/user" : "/"}
    >
      {/* <div className="logo"> */}
      {/* TeamUp */}
      <img src={TeamUp} alt="" height={"100px"} />
      {/* </div> */}
    </NavLink>
  );
}
