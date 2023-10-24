import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/authContext.jsx";
import { useJwt } from "react-jwt";

export default function Avatar() {
    const { token } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState([])
    const [avatar, setAvatar] = useState("https://friconix.com/png/fi-cnsuxx-question-mark.png")
    const [loading, setLoading] = useState(true)
    const { decodedToken } = useJwt(token);
    useEffect (() => {
    const fetchUserData = async () => {
    try {
        const username = decodedToken?.name;
        const data = await fetch(`https://teamup-service.onrender.com/user/users/search?username=${username}`)
        const res = await data.json()
        setUserDetails(res);
        setAvatar(userDetails?.userInfo?.userImage)
        setLoading(false);
    } catch (error) {
    console.log(error);
    setLoading(false);
    }
    };
    if (token) {
        fetchUserData();
    }
    }, [])

    console.log(userDetails);
    console.log(userDetails?.userInfo?.userImage);
    return (
        <>
        {userDetails ? <img className="avatarMini" alt="avatar" src={avatar} width="150px" />  
        : ( 
        <h3> Loading...</h3>)}
        </>
    )
}
