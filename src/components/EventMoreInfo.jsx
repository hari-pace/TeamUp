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

const EventMoreInfo = () => {
  const [attendees, setAttendees] = useState([]);
  const [eventInfo, setEventInfo] = useState();
  const [eventID, setEventID] = useState();
  const [fetchMapToggle, setFetchMapToggle] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  console.log(decodedToken);

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

  useEffect(() => {
    fetchData();

    // setFetchMapToggle(true);
  }, []);

  const data = attendees;

  const inputDate = eventInfo?.eventDateAndTime.eventDate;
  const formattedDate = dateFormatter(inputDate);

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

  console.log(
    eventInfo?.location?.LatLng?.lat,
    eventInfo?.location?.LatLng?.lon
  );

  return (
    <>
      <div className="events-heroDiv">
        <h1 className="events-h1"> Event information</h1>
      </div>
      <div className="page4-container">
        <div className="page4-left-column">
          <h3 className="page4-organiser">Event organiser:</h3>
          <h3 className="page4-organiser-name">
            {eventInfo?.organizator.username}
          </h3>
          <div className="page4-avatar">
            {/* <Avatar className="avatarProfile-page4" /> */}
            <Link to={`/profile/${eventInfo?.organizator?.username}`}>
              <img
                className="avatarProfile-page4"
                src={
                  eventInfo?.organizator.userInfo?.userImage
                    ? eventInfo?.organizator.userInfo?.userImage
                    : Question
                }
                alt="organiser-avatar"
              />
            </Link>
          </div>
        </div>
        <div className="page4-right-column">
          <h2 className="page4-heading">{eventInfo?.eventTitle}</h2>
          <h3 className="page4-input-fields">
            Sport type: {eventInfo?.sportType}
          </h3>
          <h3 className="page4-input-fields">Date: {formattedDate}</h3>
          <h3 className="page4-input-fields">
            Start time: {eventInfo?.eventDateAndTime.eventTime}
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
            <h3 className="page4-spaces-fields">Spaces left: </h3>
          </div>
          {/* <h3>
            {eventInfo &&
              eventInfo.hashTags.map((hashTag) => (
                <span className="page4-hashtags">{hashTag}</span>
              ))}
          </h3> */}
          <div className="page4-users-attending">
            <h3 className="page4-users-attending-heading">Users attending</h3>
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
                <List.Item className="page4-grid-items">
                  <Card title={item.username}>
                    <img
                      src={item.userImage}
                      alt="user-avatar"
                      height={"175px"}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
          <div className="page4-btn-wrapper">
            <Button className="page4-block-btn" type="primary" block>
              Like this event
            </Button>
            <Button className="page4-block-btn" type="primary" block>
              Attend this event
            </Button>
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
        </div>
      </div>
    </>
  );
};

export default EventMoreInfo;
