import "./styling/profile.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import { format } from "date-fns";
import { dateFormatter } from "../jsfunctions/FormatDate";
import Avatar from "./Avatar.jsx";


export default function Profile() {
    const { token } = useContext(AuthContext);
    const { decodedToken } = useJwt(token);
    const [users, setUsers] = useState([]);

    let extractedUsername = window.location.pathname
    extractedUsername = extractedUsername.replace("/profile/","");
    extractedUsername = extractedUsername.replace("%20"," ")
    console.log(extractedUsername);
    const fetchData = async ()=> {
        const res = await fetch("https://teamup-service.onrender.com/user/users");
        const data = await res.json();
        setUsers(data);
    }
    const singleUser = users?.find((element) => element?.username == extractedUsername);
    useEffect(() => {
        fetchData()
    },[])

    const inputDate = singleUser?.userInfo?.registrationDate;
    const formattedDate= dateFormatter(inputDate);
    console.log(singleUser)
    return (
        <>
    <div className="profileWholeContainer">
    <h1>{singleUser?.username}</h1>
    <div className="profileContainer">
    <div className="bioContainer">
    <Avatar className="avatarProfile" src={singleUser?.userInfo?.userImage} />
    <label > <h3>User Rating</h3></label>
    <br/>
    <input type="text" />
    <h3>Bio</h3>
    <div className="bioCon">
        <p>{singleUser?.userInfo?.description}</p>
    </div>
    <div className="eventsJoined">
        <h3>Events joined</h3>
        <br/>
    <input type="text" value={singleUser?.userInfo?.eventsAttended} />
    </div>
    <div className="eventsCreated">
    <h3>Events created</h3>
    <br/>
    <input type="text" value={singleUser?.userInfo?.eventsOrganized} />
        </div>
    </div>
    <div className="infoContainer">
    <label > <h3>Username</h3></label>
    <br/>
    <input type="text" value={singleUser?.username} />
    <label > <h3>Date joined</h3></label>
    <br/>
    <input type="text" value={formattedDate} />
    <label > <h3>Sports followed</h3></label>
    <br/>
    <input type="text" value={singleUser?.userInfo?.interestedInSports} />
    <label > <h3>Languages</h3></label>
    <br/>
    <input type="text" value={singleUser?.userInfo?.languagesSpoken} />
    <label > <h3>Based in</h3></label>
    <br/>
    <input type="text" />
    </div>
    </div>
    </div>
        </>
    )
}