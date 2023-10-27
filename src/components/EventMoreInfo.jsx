import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import "./styling/eventMoreInfo.css";
import Avatar from "./Avatar";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Card, List, Button, Modal, Space } from "antd";
import { useParams } from "react-router-dom";
import Question from "../assets/question.png";
import { dateFormatter } from "../jsfunctions/FormatDate";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

const EventMoreInfo = () => {
  const [attendees, setAttendees] = useState([]);
  const [eventInfo, setEventInfo] = useState();
  const [eventID, setEventID] = useState();

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

            <img
              className="avatarProfile-page4"
              src={
                eventInfo?.organizator.userInfo?.userImage
                  ? eventInfo?.organizator.userInfo?.userImage
                  : Question
              }
              alt="organiser-avatar"
            />
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
          <h3 className="page4-input-fields">Location: </h3>
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
