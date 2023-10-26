import "./styling/profile.css"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import { dateFormatter } from "../jsfunctions/FormatDate";
import { Rate, Card, Space } from "antd"
import Avatar from "./Avatar.jsx";


export default function Profile() {
    const { token } = useContext(AuthContext);
    const { decodedToken } = useJwt(token);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    let extractedUsername = window.location.pathname
    extractedUsername = extractedUsername.replace("/profile/","");
    // extractedUsername = extractedUsername.replace("%20"," ")

    const fetchData = async () => {
        const res = await fetch("https://teamup-service.onrender.com/user/users");
        const data = await res.json();
        setUsers(data);
    }
    const singleUser = users?.find((element) => element?.username == extractedUsername);


    const eventAttendedIds = singleUser?.userInfo?.eventsAttended;
    const eventOrganisedIds = singleUser?.userInfo?.eventsOrganized;

    const fetchEvent = async () => {
        const res = await fetch(`https://teamup-service.onrender.com/event`);
        const data = await res.json();
        setEvents(data);
}

useEffect(() => {
    fetchData();
    fetchEvent();
},[])

const filteredEventsArray = events?.filter((event) => event._id.includes(eventAttendedIds[0]) || event._id.includes(eventAttendedIds[1]) || event._id.includes(eventAttendedIds[2]));

const filteredOrganisedArray = events?.filter((event) => event._id.includes(eventOrganisedIds[0]) || event._id.includes(eventOrganisedIds[1]) || event._id.includes(eventOrganisedIds[2]));

const filteredAvatarArray = users?.filter((user) => (user._id?.includes(filteredEventsArray[0]?.organizator) || user._id?.includes(filteredEventsArray[1]?.organizator)))

console.log(filteredAvatarArray);

const inputDate = singleUser?.userInfo?.registrationDate;
const formattedDate= dateFormatter(inputDate);

const { Meta } = Card;

    return (
        <>
    <div className="profileWholeContainer">
    <h1>{singleUser?.username}</h1>
    <div className="profileContainer">
    <div className="bioContainer">
    <Avatar className="avatarProfile" src={singleUser?.userInfo?.userImage} />
    <label > <h3>User Rating</h3></label>
    <br/>
    <Rate 
    disabled 
    defaultValue={5}
    className="rating"
    />
    <h3>Bio</h3>
    <div className="bioCon">
        <p>{singleUser?.userInfo?.description}</p>
    </div>
    <div className="eventsJoined">
        <h3>Events joined</h3>
        <br/>

        {/* Card */}
        <div className="eventsJoinedCon">
        {filteredEventsArray.map((event, index) =>(
        <div className="eventsJoinedItem" key={index}>
        <Link to={`/events/${event._id}`} style={{textDecoration: "none"}}>
        <Card
        className="profileCards"
        hoverable
        cover={
      <img
        alt="example"
        src={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
        />
        }
        >
        <Meta
        avatar={<Avatar className="avatarCard" 
        src={filteredAvatarArray?.map((avatar) => (
            avatar.userInfo?.userImage))} />}
        title={event?.eventDescription} />
        {/* // description={events?.sportType[0]}/> */}
        </Card>
    </Link>
            </div>
        ))}
    </div>
    </div>
    <div className="eventsCreated">
    <h3>Events created</h3>
    <br/>
    {/* Card */}
    <div className="eventsJoinedCon">
        {filteredOrganisedArray.map((event, index) =>(
        <div className="eventsJoinedItem" key={index}>
        <Link to={`/events/${event._id}`} style={{textDecoration: "none"}}>
        <Card
        className="profileCards"
        hoverable
        cover={
      <img
        alt="example"
        src={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
        />
        }
        >
        <Meta
        avatar={<Avatar className="avatarCard" src={singleUser?.userInfo?.userImage} />}
        title={event?.eventDescription} />
        {/* // description={events?.sportType[0]}/> */}
        </Card>
    </Link>
            </div>
        ))}
    </div>
    {/* Card */}
        </div>
    </div>
    <div className="infoContainer">
    <label > <h3>Username</h3></label>
    <br/>
    <p className="infoItem">{singleUser?.username}</p>
    <label > <h3>Date joined</h3></label>
    <br/>
    <p className="infoItem">{formattedDate}</p>
    <label > <h3>Sports followed</h3></label>
    <br/>
    <p className="infoItem">{singleUser?.userInfo?.interestedInSports.map((sport) => sport + `, `)}</p>
    <label > <h3>Languages</h3></label>
    <br/>
    <p className="infoItem">{singleUser?.userInfo?.languagesSpoken.map((language) => language + `, `)} </p>
    <label > <h3>Based in</h3></label>
    <br/>
    <p className="infoItem"></p>
    </div>
    </div>
    </div>
        </>
    )
}