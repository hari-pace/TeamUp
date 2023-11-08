import "../styling/profile.css";
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useJwt } from "react-jwt";
import { dateFormatter } from "../../jsfunctions/FormatDate";
import { Rate, Card, Space, Button, Form, Input, Modal } from "antd";
import Avatar from "../Avatar.jsx";
import Spinner from "../Spinner";
import UsernameEdit from "./UsernameEdit";
import BioEdit from "./BioEdit";
import SportsEdit from "./SportsEdit";
import CityEdit from "./CityEdit";
import DeleteUser from "./DeleteUser";
import Question from "../../assets/question.png";
import FormItem from "antd/es/form/FormItem";
import RateEdit from "./RateEdit";
import ImageEditAx from "./ImageEditAx";
import CountryEdit from "./CountryEdit.jsx";
import Badge from "./Badge.jsx"

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
  const [showdelete, setShowDelete] = useState(false);
  const [showRate, setRate] = useState(false);
  const [showCountry, setShowCountryEdit] = useState(false);
  const [loggedout, setLoggedOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(!true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

  const themeStyles = isLightTheme ? light : dark;

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

  const id = singleUser?._id;
  const eventAttendedIds = singleUser?.userInfo?.eventsAttended;
  const eventOrganisedIds = singleUser?.userInfo?.eventsOrganized;

  const fetchEvent = async () => {
    const res = await fetch(`https://teamup-service.onrender.com/event`);
    const data = await res.json();
    setEvents(data);
    setLoading(false);
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
        event._id?.includes(eventAttendedIds[2]) ||
        event._id?.includes(eventAttendedIds[3]) ||
        event._id?.includes(eventAttendedIds[4]) ||
        event._id?.includes(eventAttendedIds[5]))
    );
  });

  const EventsArray = events?.filter((event) => {
    return (
      singleUser &&
      singleUser.length > 0 &&
      event.usersAttending?.userRef?.includes("653a6195352f338321518709")
    );
  });
  console.log(EventsArray);
  // console.log(events[156].usersAttending[0].userRef);

  const filteredOrganisedArray = events?.filter((event) => {
    return (
      eventOrganisedIds &&
      eventOrganisedIds.length > 0 &&
      (event._id?.includes(eventOrganisedIds[0]) ||
        event._id?.includes(eventOrganisedIds[1]) ||
        event._id?.includes(eventOrganisedIds[2]) ||
        event._id?.includes(eventOrganisedIds[3]) ||
        event._id?.includes(eventOrganisedIds[4]) ||
        event._id?.includes(eventOrganisedIds[5]))
    );
  });
  const inputDate = singleUser?.userInfo?.registrationDate;
  const formattedDate = dateFormatter(inputDate);

  const { Meta } = Card;

  console.log(singleUser);
  console.log(singleUser?.userInfo?.userImage);
  console.log(isModalOpen);
  return (
    <>
      <div
        className="profileWholeContainer"
        style={{ background: themeStyles.grey, color: themeStyles.text }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {showdelete ? (
              <h1 style={{ textDecoration: "none", color: "red" }}>
                User has been deleted
              </h1>
            ) : (
              <>
                {loggedout ? <Navigate to="/" /> : null}
                {auth ? <DeleteUser setShowDelete={setShowDelete} /> : null}
                <h1>{singleUser?.username}</h1>
                <div
                  className="profileContainer"
                  style={{
                    background: themeStyles.grey,
                    color: themeStyles.text,
                  }}
                >
                  <div className="bioContainer">
                    {editImage ? (
                      <>
                        <Avatar className="avatarProfile" alt="emptyavatar" />
                        <ImageEditAx
                          id={singleUser?._id}
                          initialImage={singleUser?.userInfo?.userImage}
                          setEditImage={setEditImage}
                          setLoggedOut={setLoggedOut}
                        />
                        <Button
                          danger
                          type="primary"
                          onClick={() => setEditImage(false)}
                        >
                          Close X
                        </Button>
                      </>
                    ) : (
                      <>
                        {auth ? (
                          <Button onClick={() => setEditImage(true)}>
                            Edit
                          </Button>
                        ) : null}
                        <img
                          className="avatarProfile"
                          src={singleUser?.userInfo?.userImage}
                        />
                      </>
                    )}
                    {auth ? (
                      <>
                        <Rate
                          allowHalf
                          disabled
                          value={
                            singleUser?.userInfo?.averageRating
                              ? singleUser?.userInfo?.averageRating
                              : singleUser?.userInfo?.userRating[
                                  singleUser?.userInfo?.userRating.length - 1
                                ]
                          }
                        />
                        <p>
                          Total: {singleUser?.userInfo?.userRating?.length}{" "}
                          ratings
                        </p>
                      </>
                    ) : (
                      <>
                        {showRate ? (
                          <>
                            <RateEdit
                              id={singleUser?._id}
                              initialRating={
                                singleUser?.userInfo?.averageRating
                                  ? singleUser?.userInfo?.averageRating
                                  : singleUser?.userInfo?.userRating[
                                      singleUser?.userInfo?.userRating.length -
                                        1
                                    ]
                              }
                              setRate={setRate}
                            />
                            <Button
                              danger
                              className="rateCloseButton"
                              type="primary"
                              onClick={() => setRate(false)}
                            >
                              Close X
                            </Button>
                          </>
                        ) : (
                          <>
                            <Rate
                              allowHalf
                              allowQuarter
                              disabled
                              className="rateButton"
                              value={
                                singleUser?.userInfo?.averageRating
                                  ? singleUser?.userInfo?.averageRating
                                  : singleUser?.userInfo?.userRating[
                                      singleUser?.userInfo?.userRating.length -
                                        1
                                    ]
                              }
                            />
                            <p>
                              Total: {singleUser?.userInfo?.userRating?.length}{" "}
                              ratings
                            </p>
                            <Button onClick={() => setRate(true)}>Rate</Button>
                          </>
                        )}
                      </>
                    )}
                    <h3>Badges</h3>
                    <div style={{cursor: "pointer"}}className="badgeCon">
                    <div 
                    onClick={showModal}
                    className="badge">
                    </div>
                    <Modal 
                    title="What are Badges?"
                    className={isLightTheme ? "lightModal" : "darkModal"}
                    open={isModalOpen} 
                    onOk={handleOk} 
                    onCancel={handleCancel}>
                    <Badge />
                    </Modal>
                    {singleUser?.userInfo?.eventsOrganized?.length >= 5 ? (
                      <div className="masterBadge">
                        </div>): null}
                    {singleUser?.userInfo?.eventsAttended?.length >= 3 ? (
                      <div className="beaverBadge">
                        </div>): null}
                    {singleUser?.userInfo?.averageRating >= 4 ? (
                      <div className="starBadge">
                        </div>): null}
                    </div>
                    <h3>Bio</h3>
                    {showBioEdit ? (
                      <>
                        <BioEdit
                          id={singleUser?._id}
                          initialDescription={singleUser?.userInfo?.description}
                          setBio={setBioEdit}
                        />
                        <Button
                          danger
                          type="primary"
                          onClick={() => setBioEdit(false)}
                        >
                          Close X
                        </Button>
                      </>
                    ) : (
                      <div
                        className="bioCon"
                        style={{ background: themeStyles.midgrey }}
                      >
                        {auth ? (
                          <Button onClick={() => setBioEdit(true)}>Edit</Button>
                        ) : null}
                        <p>{singleUser?.userInfo?.description}</p>
                      </div>
                    )}
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
                                title={event?.eventTitle}
                              >
                                <Meta
                                  avatar={
                                    <Avatar
                                      className="avatarCard"
                                      src={
                                        event.organizator?.userInfo?.userImage
                                          ? event.organizator?.userInfo
                                              ?.userImage
                                          : Question
                                      }
                                    />
                                  }
                                  // title={event?.eventDescription}
                                />
                                {/* // description={events?.sportType[0]}/> */}
                              </Card>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                    <h3>Events created</h3>
                    <div className="eventsCreated">
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
                                title={event?.eventTitle}
                              >
                                <Meta
                                  avatar={
                                    <Avatar
                                      className="avatarCard"
                                      src={singleUser?.userInfo?.userImage}
                                    />
                                  }
                                  // title={event?.eventDescription}
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
                        <UsernameEdit
                          id={singleUser?._id}
                          initialUsername={singleUser?.username}
                          setShowUsernameEdit={setShowUsernameEdit}
                          setLoggedOut={setLoggedOut}
                        />
                        <Button
                          danger
                          type="primary"
                          onClick={() => setShowUsernameEdit(false)}
                        >
                          Close X
                        </Button>
                      </>
                    ) : (
                      <>
                        <p
                          className="infoItem"
                          style={{ background: themeStyles.midgrey }}
                        >
                          {auth ? (
                            <Button onClick={() => setShowUsernameEdit(true)}>
                              Edit
                            </Button>
                          ) : null}
                          {singleUser?.username}
                        </p>
                      </>
                    )}
                    <label>
                      <h3>Date joined</h3>
                    </label>
                    <br />
                    <p
                      style={{ background: themeStyles.midgrey }}
                      className="infoItem"
                    >
                      {formattedDate}
                    </p>
                    <label>
                      <h3>Sports following</h3>
                    </label>
                    <br />
                    {showSportsEdit ? (
                      <>
                        <SportsEdit
                          id={singleUser?._id}
                          initialSports={singleUser?.userInfo?.interestedInSports.map(
                            (sport) => sport
                          )}
                          setSports={setSportsEdit}
                        />
                        <Button
                          danger
                          type="primary"
                          onClick={() => setSportsEdit(false)}
                        >
                          Close X
                        </Button>
                      </>
                    ) : (
                      <>
                        <p
                          style={{ background: themeStyles.midgrey }}
                          className="infoItem"
                        >
                          {auth ? (
                            <Button onClick={() => setSportsEdit(true)}>
                              Edit
                            </Button>
                          ) : null}
                          {singleUser?.userInfo?.interestedInSports.map(
                            (sport) => (
                              <li>{sport}</li>
                            )
                          )}
                        </p>
                      </>
                    )}
                    <label>
                      <h3>Languages</h3>
                    </label>
                    <br />
                    <p
                      style={{ background: themeStyles.midgrey }}
                      className="infoItem"
                    >
                      {singleUser?.userInfo?.languagesSpoken}
                    </p>
                    <label>
                      <h3>Based in</h3>
                    </label>
                    <br />
                    {showCity ? (
                      <>
                        <CityEdit
                          id={singleUser?._id}
                          initialCity={singleUser?.userInfo?.location.city}
                          setCity={setCity}
                        />
                        <Button
                          danger
                          type="primary"
                          onClick={() => setCity(false)}
                        >
                          Close X
                        </Button>
                      </>
                    ) : (
                      <>
                        <p
                          style={{ background: themeStyles.midgrey }}
                          className="infoItem"
                        >
                          {auth ? (
                            <Button onClick={() => setCity(true)}>Edit</Button>
                          ) : null}
                          {singleUser?.userInfo?.location?.city}
                        </p>
                      </>
                    )}
                    <label>
                      <h3>Country of Origin</h3>
                    </label>
                    <br />
                    {showCountry ? (
                      <>
                        <CountryEdit
                          id={singleUser?._id}
                          initialCountry={
                            singleUser?.userInfo?.location.country
                          }
                          setShowCountryEdit={setShowCountryEdit}
                        />
                        <Button
                          danger
                          type="primary"
                          onClick={() => setShowCountryEdit(false)}
                        >
                          Close X
                        </Button>
                      </>
                    ) : (
                      <>
                        <p
                          style={{ background: themeStyles.midgrey }}
                          className="infoItem"
                        >
                          {auth ? (
                            <Button onClick={() => setShowCountryEdit(true)}>
                              Edit
                            </Button>
                          ) : null}
                          {singleUser?.userInfo?.location?.country}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
