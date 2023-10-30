import "../styling/profile.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useJwt } from "react-jwt";
import { dateFormatter } from "../../jsfunctions/FormatDate";
import { Rate, Card, Space, Button } from "antd";
import Avatar from "../Avatar.jsx";
import Spinner from "../Spinner";
import UsernameEdit from "./UsernameEdit";
import BioEdit from "./BioEdit"
import SportsEdit from "./SportsEdit"
import LanguageEdit from "./LangaugeEdit"
import ImageEdit from "./ImageEdit"
import CityEdit from "./CityEdit"
import DeleteUser from "./DeleteUser";
import Question from "../../assets/question.png"

export default function Profile() {
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUsernameEdit, setShowUsernameEdit] = useState(false);
  const [showBioEdit, setBioEdit] = useState(false);
  const [showSportsEdit, setSportsEdit] = useState(false);
  const [showLanguageEdit, setLanguageEdit] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [showCity, setCity] = useState(false);

  let extractedUsername = window.location.pathname;
  extractedUsername = extractedUsername.replace("/profile/", "");
  const auth = extractedUsername === decodedToken?.name ? true : false;
  const fetchData = async () => {
    const res = await fetch("https://teamup-service.onrender.com/user/users");
    const data = await res.json();
    setUsers(data);
  };
  const singleUser = users?.find(
    (element) => element?.username == extractedUsername
  );

  const eventAttendedIds = singleUser?.userInfo?.eventsAttended;
  const eventOrganisedIds = singleUser?.userInfo?.eventsOrganized;

  const fetchEvent = async () => {
    const res = await fetch(`https://teamup-service.onrender.com/event`);
    const data = await res.json();
    setEvents(data);
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
    fetchEvent();
  }, []);

  const filteredEventsArray = events?.filter((event) => {
    return (
      eventAttendedIds &&
      eventAttendedIds.length > 0 &&
      (event._id?.includes(eventAttendedIds[0]) ||
        event._id?.includes(eventAttendedIds[1]) ||
        event._id?.includes(eventAttendedIds[2]))
    );
  });

  const filteredOrganisedArray = events?.filter((event) => {
    return (
      eventOrganisedIds &&
      eventOrganisedIds.length > 0 &&
      (event._id?.includes(eventOrganisedIds[0]) ||
        event._id?.includes(eventOrganisedIds[1]) ||
        event._id?.includes(eventOrganisedIds[2]))
    );
  });
const image = filteredEventsArray.map((event) => event.organizator?.userInfo?.userImage)
console.log(image);
  const filteredAvatarArray = users?.filter((user) => {
    return (
      filteredEventsArray &&
      filteredEventsArray.length > 0 &&
      (user?._id?.includes(filteredEventsArray[0]?.organizator) ||
        user?._id?.includes(filteredEventsArray[1]?.organizator))
    );
  });

  const inputDate = singleUser?.userInfo?.registrationDate;
  const formattedDate = dateFormatter(inputDate);

  const { Meta } = Card;
  console.log(events)

  return (
    <>
      <div className="profileWholeContainer">
        {loading ? <Spinner /> : (
          <>
        {auth ? <DeleteUser /> : null}
        <h1>{singleUser?.username}</h1>
        <div className="profileContainer">
          <div className="bioContainer">
          {editImage ?
            <> 
            <Avatar className="avatarProfile" alt="empty avatar"/>
            <ImageEdit id = {singleUser?._id} initialImage = {singleUser?.userInfo?.userImage} setEditImage = {setEditImage} /> 
            <Button danger type="primary" onClick={() => setEditImage(false)}>
            Close X
            </Button>
            </>
            : (
              <>
              {auth ? <Button onClick={() => setEditImage(true)}>
              Edit
              </Button> : null}
            <Avatar
              className="avatarProfile"
              src={singleUser?.userInfo?.userImage}
            />
            </>
            )}
            <label>
              <h3>User Rating</h3>
            </label>
            <br />
            <Rate disabled defaultValue={5} className="rating" />
            <h3>Bio</h3>
            {showBioEdit ?
            <> 
            <BioEdit id = {singleUser?._id} initialUsername = {singleUser?.username} setBio = {setBioEdit} /> 
            <Button danger type="primary" onClick={() => setBioEdit(false)}>
            Close X
            </Button>
            </>
            : (
              <div className="bioCon">
              {auth ? <Button onClick={() => setBioEdit(true)}>
              Edit
              </Button> : null}
              <p>{singleUser?.userInfo?.description}</p>
              
            </div>)}
            <div className="eventsJoined">
              <h3>Events joined</h3>
              <br />

              {/* Card */}
              <div className="eventsJoinedCon">
                {filteredEventsArray.map((event, index) => (
                  <div className="eventsJoinedItem" key={index}>
                    <Link
                      to={`/events/${event._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        className="profileCards"
                        hoverable
                        cover={
                          <img
                            alt="example"
                            src={
                              "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            }
                          />
                        }
                      >
                        <Meta
                          avatar={
                            <Avatar
                              className="avatarCard"
                              src={event.organizator?.userInfo?.userImage ? event.organizator?.userInfo?.userImage : Question }
                            />
                          }
                          title={event?.eventDescription}
                        />
                        {/* // description={events?.sportType[0]}/> */}
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="eventsCreated">
              <h3>Events created</h3>
              <br />
              {/* Card */}
              <div className="eventsJoinedCon">
                {filteredOrganisedArray.map((event, index) => (
                  <div className="eventsJoinedItem" key={index}>
                    <Link
                      to={`/events/${event._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        className="profileCards"
                        hoverable
                        cover={
                          <img
                            alt="example"
                            src={
                              "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            }
                          />
                        }
                      >
                        <Meta
                          avatar={
                            <Avatar
                              className="avatarCard"
                              src={singleUser?.userInfo?.userImage}
                            />
                          }
                          title={event?.eventDescription}
                        />
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
            <label>
              <h3>Username</h3>
              <br />
              </label>
              {showUsernameEdit ? (
              <>
              <UsernameEdit id = {singleUser?._id} initialUsername = {singleUser?.username} setShowUsernameEdit={setShowUsernameEdit} />
              <Button danger type="primary" onClick={() => setShowUsernameEdit(false)}>
              Close X
              </Button>
              </>
              ) : (
              <>
            <p className="infoItem">

            {auth ? <Button onClick={() => setShowUsernameEdit(true)}>
              Edit
              </Button> : null}
              {singleUser?.username}
              </p>
            </>
            )}
            <label>
              <h3>Date joined</h3>
            </label>
            <br />
            <p className="infoItem">{formattedDate}</p>
            <label>
              <h3>Sports following</h3>
            </label>
            <br />            
            {showSportsEdit ?
            <> 
            <SportsEdit id = {singleUser?._id} initialSports = {singleUser?.userInfo?.interestedInSports.map(
              (sport) => sport + `, `
            )} setSports = {setSportsEdit} /> 
            <Button danger type="primary" onClick={() => setSportsEdit(false)}>
            Close X
            </Button>
            </>
            : (
              <>
            <p className="infoItem">
            {auth ? <Button onClick={() => setSportsEdit(true)}>
              Edit
              </Button> : null}
            {singleUser?.userInfo?.interestedInSports.map(
              (sport) => sport + `, `
            )}
          </p>
          </>
              )}
            <label>
              <h3>Languages</h3>
            </label>
            <br />
            {showLanguageEdit ?
            <> 
            <LanguageEdit id = {singleUser?._id} initialLanguages ={singleUser?.userInfo?.languagesSpoken.map(
                (language) => language + `, `
              )}  setLanguageEdit = {setLanguageEdit} /> 
            <Button danger type="primary" onClick={() => setLanguageEdit(false)}>
            Close X
            </Button>
            </>
            : (
              <>
            <p className="infoItem">
            {auth ? <Button onClick={() => setLanguageEdit(true)}>
              Edit
              </Button> : null}
              {singleUser?.userInfo?.languagesSpoken.map(
                (language) => language + `, `
              )}
            </p>
            </>
            )}
            <label>
              <h3>Based in</h3>
            </label>
            <br />
            {showCity ?
            <> 
            <CityEdit id = {singleUser?._id} initialCity ={singleUser?.userInfo?.city}  setCity = {setCity} /> 
            <Button danger type="primary" onClick={() => setCity(false)}>
            Close X
            </Button>
            </>
            : (
              <>
            <p className="infoItem">
            {auth ? <Button onClick={() => setCity(true)}>
              Edit
              </Button> : null}
              {singleUser?.userInfo?.city}
            </p>
            </>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </>
  );
}
