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
    useEffect(() => {
        fetchData()
    },[])

    const eventAttendIds = singleUser?.userInfo?.eventsAttended;
    const eventOrganisedIds = singleUser?.userInfo?.eventsOrganized;

    // const id = eventAttendIds[0];
    const id = "6536acb0180c0b69a5146414";
    console.log(id);

    const fetchEvent = async () => {
        if (id) {
        const res = await fetch(`https://teamup-service.onrender.com/event/${id}`);
        const data = await res.json();
        setEvents(data);
    }
}
    useEffect (() => {fetchEvent()}, [])

    const inputDate = singleUser?.userInfo?.registrationDate;
    const formattedDate= dateFormatter(inputDate);

    const { Meta } = Card;

    console.log(events)
    console.log(events?.eventDescription)
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
        <Link to={`/events/${events._id}`} style={{textDecoration: "none"}}>
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
        title={events?.eventDescription} />
        {/* // description={events?.sportType[0]}/> */}
        </Card>
    {/* avatar={<Avatar className="avatar-mini"/>}
    {/*<input type="text" value={singleUser?.userInfo?.eventsAttended} /> */}
    </Link>
    {/* Card */}

    </div>
    <div className="eventsCreated">
    <h3>Events created</h3>
    <br/>

        {/* Card */}
        <Link to={`/events/${events._id}`} style={{textDecoration: "none"}}>
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
        title={events?.eventDescription} />
        {/* // description={events?.sportType[0]}/> */}
        </Card>
    {/* avatar={<Avatar className="avatar-mini"/>}
    {/*<input type="text" value={singleUser?.userInfo?.eventsAttended} /> */}
    </Link>
    {/* Card */}

    {/* <input type="text" value={singleUser?.userInfo?.eventsOrganized} /> */}


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