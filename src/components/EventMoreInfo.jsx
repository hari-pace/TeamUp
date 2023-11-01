import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import "./styling/eventMoreInfo.css";
import Avatar from "./Avatar";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Card, List, Button, Modal, Space } from "antd";
import { useParams, Link } from "react-router-dom";
import Question from "../assets/question.png";
import { dateFormatter } from "../jsfunctions/FormatDate";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { ReactBingmaps } from "react-bingmaps";
import Spinner from "./Spinner";

const EventMoreInfo = () => {
  const [attendees, setAttendees] = useState([]);
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [eventInfo, setEventInfo] = useState();
  const [eventID, setEventID] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  // console.log(decodedToken);

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await fetch(`https://teamup-service.onrender.com/event/${id}`);
    const data = await res.json();
    console.log(data);
    setEventInfo(data);
    setEventID(data._id);
    setLatitude(data.location?.LatLng?.lat);
    setLongitude(data.location?.LatLng?.lon);
    setAttendees(data.usersAttending);
    setInterestedUsers(data.usersInterested);
  };

  const handleDelete = async (id) => {
    try {
      console.log(id.eventID);
      const response = await fetch(
        `https://teamup-service.onrender.com/event/${id.eventID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Item deleted successfully");
        alert("Your event was deleted successfully!");
        navigate("/");
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // useEffect(() => {
  //   attendees.push(decodedToken?.name);
  //   console.log(attendees);
  //   handleUpdate(eventID);
  //   setPutRequestToggle(false);
  // }, [putRequestToggle]);

  const handleUpdateAttending = async (id) => {
    console.log(id);
    console.log(attendees);
    try {
      const response = await fetch(
        `https://teamup-service.onrender.com/event/attend?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ usersAttending: attendees }),
        }
      );

      if (response.ok) {
        console.log("user attend updated successfully");
        alert("Your have been successfully subscribed for this event!");
        navigate("/");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleUpdateInterested = async (id) => {
    try {
      const response = await fetch(
        `https://teamup-service.onrender.com/event/like?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ usersInterested: interestedUsers }),
        }
      );

      if (response.ok) {
        console.log("user like array updated successfully");
        alert("This event has been successfully added to your watchlist!");
        navigate("/");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    fetchData();
    return () => clearTimeout(timer);
    // setFetchMapToggle(true);
  }, []);

  const data = attendees;

  const inputDate = eventInfo?.eventDateAndTime?.eventDate;
  const formattedDate = dateFormatter(inputDate);

  const longTime = eventInfo?.eventDateAndTime?.eventTime;
  const date = new Date(longTime);

  const formattedTime = date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // const formattedTime = inputTime?.toLocaleDateString("en-GB", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // console.log(formattedTime);

  const checkForAttendeeMatch = attendees.filter(
    (attendee) => attendee.username === decodedToken?.name
  );

  console.log(checkForAttendeeMatch);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleDelete({ eventID });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModal2Open, setIsModal2Open] = useState(false);
  const showModal2 = () => {
    setIsModal2Open(true);
  };
  const handleOk2 = () => {
    setIsModal2Open(false);
    if (checkForAttendeeMatch.length > 0) {
      alert("You are already subscribed to this event");
    } else if (attendees?.length >= eventInfo?.maxCapacity) {
      alert("This event is unfortunately already fully booked");
    } else {
      attendees.push(decodedToken?.name);
      handleUpdateAttending(eventID);
    }
  };
  const handleCancel2 = () => {
    setIsModal2Open(false);
  };
  const [isModal3Open, setIsModal3Open] = useState(false);
  const showModal3 = () => {
    setIsModal3Open(true);
  };
  const handleOk3 = () => {
    setIsModal3Open(false);
    if (checkForAttendeeMatch.length > 0) {
      alert("You are already subscribed to this event");
    } else {
      interestedUsers.push(decodedToken?.name);
      handleUpdateInterested(eventID);
    }
  };
  const handleCancel3 = () => {
    setIsModal3Open(false);
  };

  const bingMapKey =
    "ApYJA9wirw_71Ky9Op1pVgSjw70J-frOoiEtOMfYsxsWVvsouz_X6BlYfqXMddSb";

  const mapOptions = {
    credentials: bingMapKey,
    center: [latitude, longitude],
    zoom: 12,
  };

  const pushPins = [
    {
      location: [latitude, longitude],
      option: { color: "red" },
    },
  ];

  // console.log(
  //   eventInfo?.location?.LatLng?.lat,
  //   eventInfo?.location?.LatLng?.lon
  // );

  return (
    <>
      <div className="events-heroDiv">
        <h1 className="events-h1"> Event information</h1>
      </div>
      <div className="page4-container">
        <div className="page4-left-column">
          <h3 className="page4-organiser">Event organiser:</h3>
          <h3 className="page4-organiser-name">
            {eventInfo?.organizator?.username}
          </h3>
          <div className="page4-avatar">
            {/* <Avatar className="avatarProfile-page4" /> */}
            <Link to={`/profile/${eventInfo?.organizator?.username}`}>
              <img
                className="avatarProfile-page4"
                src={
                  eventInfo?.organizator?.userInfo?.userImage
                    ? eventInfo?.organizator?.userInfo?.userImage
                    : Question
                }
                alt="organiser-avatar"
              />
            </Link>
          </div>
        </div>
        <div className="page4-right-column">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h2 className="page4-heading">{eventInfo?.eventTitle}</h2>
              <h3 className="page4-input-fields">
                Sport type: {eventInfo?.sportType}
              </h3>
              <h3 className="page4-input-fields">Date: {formattedDate}</h3>
              <h3 className="page4-input-fields">
                Start time: {formattedTime}
              </h3>
              <div className="page4-location-container">
                <h3 className="page4-input-field-location">Location: </h3>

                <div style={{ height: "300px", width: "80%" }}>
                  <ReactBingmaps
                    bingmapKey={bingMapKey}
                    center={mapOptions.center}
                    zoom={mapOptions.zoom}
                    pushPins={pushPins}
                  />
                </div>
              </div>
              <h3 className="page4-input-fields" id="page-4-description">
                Description: {eventInfo?.eventDescription}
              </h3>
              <div className="page4-spaces-fields-container">
                <h3 className="page4-spaces-fields">
                  Max capacity: {eventInfo?.maxCapacity}
                </h3>
                <h3 className="page4-spaces-fields">
                  Spaces left: {eventInfo?.maxCapacity - attendees?.length}{" "}
                </h3>
              </div>
              {/* <h3>
            {eventInfo &&
              eventInfo.hashTags.map((hashTag) => (
                <span className="page4-hashtags">{hashTag}</span>
              ))}
          </h3> */}
              <div className="page4-users-attending">
                <h3 className="page4-users-attending-heading">
                  Users attending
                </h3>

                <List
                  className="page4-grid"
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={attendees}
                  renderItem={(item) => (
                    <Link to={`/profile/${item?.username}`}>
                      <List.Item className="page4-grid-items">
                        <Card
                          className="page4-grid-cards"
                          title={item?.username}
                        >
                          <img
                            className="gridProfile-page4"
                            src={item?.userImage ? item?.userImage : Question}
                            alt="user-avatar"
                            height={"100%"}
                            width={"90%"}
                          />
                        </Card>
                      </List.Item>
                    </Link>
                  )}
                />
              </div>
              <div
                className={
                  decodedToken
                    ? "page4-btn-wrapper"
                    : "page4-btn-wrapper-hidden"
                }
              >
                <Button
                  className="page4-block-btn"
                  type="primary"
                  block
                  onClick={showModal3}
                >
                  Like this event
                </Button>
                <Modal
                  title="Add this event to your watchlist?"
                  open={isModal3Open}
                  onOk={handleOk3}
                  onCancel={handleCancel3}
                ></Modal>
                <Button
                  className="page4-block-btn"
                  type="primary"
                  block
                  onClick={showModal2}
                >
                  Attend this event
                </Button>
                <Modal
                  title="Are you sure you want to attend this event?"
                  open={isModal2Open}
                  onOk={handleOk2}
                  onCancel={handleCancel2}
                ></Modal>
              </div>
              <div
                className={
                  eventInfo?.organizator?.username === decodedToken?.name
                    ? "page4-btn-wrapper"
                    : "page4-btn-wrapper-hidden"
                }
              >
                <Button
                  onClick={showModal}
                  className="page4-block-btn"
                  type="primary"
                  danger
                >
                  Delete this event
                </Button>
                <Modal
                  title="Are you sure you want to delete this event?"
                  icon={<ExclamationCircleOutlined />}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                ></Modal>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EventMoreInfo;
