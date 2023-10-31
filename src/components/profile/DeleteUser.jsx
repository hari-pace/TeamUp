import { Button, Popconfirm } from 'antd';
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { useJwt } from "react-jwt";

export default function DeleteUser({ setShowDelete }) {
const [error, setError] = useState()
const [loadings, setLoadings] = useState([]);

const { token, logout } = useContext(AuthContext);
const { decodedToken } = useJwt(token);

const handleSubmit = async () => {
    // e.preventDefault(); ant has built-in prevent default
    setError(null);

    const response = await fetch(`https://teamup-service.onrender.com/user/users`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`}
    //   body: JSON.stringify({ }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      console.log("something has happened");
    }

    if (response.ok) {
      console.log("SUCCESS!!!")
      setShowDelete(true);
      localStorage.removeItem("token");
      logout();
    }
  };

const confirm = () =>
new Promise((resolve) => {
setTimeout(() => {resolve(null); handleSubmit()}, 3000);
});
    return (
        <>
    <Popconfirm
      className="deleteProfile" 
      title="WARNING"
      description="Are you sure you want to delete your account?"
      onConfirm={confirm}
      onOpenChange={() => console.log('open change')}
    >
    <Button 
    className=".profileDelete" 
    type="primary"
    danger>Delete Account</Button>
    </Popconfirm>
        </>
    )
}