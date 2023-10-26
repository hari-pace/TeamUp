import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/authContext.jsx";
import { useJwt } from "react-jwt";
import Question from "../assets/question.png"

export default function Avatar({ className, src }) {

    const { token } = useContext(AuthContext);
    const [avatar, setAvatar] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    const { decodedToken } = useJwt(token);
    const username = decodedToken?.name

    
    console.log("@@@@@@@@", decodedToken)
    
    // https://teamup-service.onrender.com/user/users/search?username=Dazbot  
    const url = username ? `https://teamup-service.onrender.com/user/users/search?username=${username}` : "https://teamup-service.onrender.com/user/users";

    console.log("$$$$$$", url)

    // fetching the userImage data specifically
    const fetchData = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log("DATA",data)
            setAvatar(data?.userInfo?.userImage);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setIsLoading(false);
          }
      
    }

    useEffect(() => {
        fetchData()
    }, [username]);

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <>
    <img
      className={className}
      alt={avatar ? "avatar" : "questionMark"}
      src={avatar ? (className === "avatarMini" ? avatar : src) : Question}
    />
        </>
    )
}
{/* {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {avatar?.length > 0 ? (
            <img
              className={className}
              alt="avatar"
              src={className === "avatarMini" ? avatar : src}
            />
          ) : (
            <img
              className={className}
              alt="questionMark"
              src={className === "avatarMini" ? Question : src}
            />
          )}
        </>
      )} */}