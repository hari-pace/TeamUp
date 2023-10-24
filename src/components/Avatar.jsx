import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/authContext.jsx";
import { useJwt } from "react-jwt";
import Question from "../assets/question.png"

export default function Avatar() {
    const { token } = useContext(AuthContext);
    const [avatar, setAvatar] = useState({ Question })

    const { decodedToken } = useJwt(token);
    const username = decodedToken?.name;
    const url = `https://teamup-service.onrender.com/user/users/search?username=Dazbot`;

    const fetchData = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setAvatar(data?.userInfo?.userImage);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [token]);

    return (
        <>
    {avatar?.length > 0 ? (<img className="avatarMini" alt="avatar" width="150px" src={avatar} />)
    :
    <img className="avatarMini" alt="questionMark" width="150px" src={Question} />   
    }
        </>
    )
}
