import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/authContext.jsx";
import { useJwt } from "react-jwt";
import Question from "../assets/question.png"

export default function Avatar({ className, src }) {

    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true)
    
    const { decodedToken } = useJwt(token);
    const avatar = decodedToken?.image
    
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