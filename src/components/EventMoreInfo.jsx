import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/ThemeContext";
import "./styling/eventMoreInfo.css";
import Avatar from "./Avatar";
import {
  ExclamationCircleOutlined,
  LikeOutlined,
  CheckOutlined,
  DeleteOutlined,
  CloseOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  DoubleRightOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Card, List, Button, Modal, Space } from "antd";
import { useParams, Link } from "react-router-dom";
import Question from "../assets/question.png";
import { dateFormatter } from "../jsfunctions/FormatDate";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { ReactBingmaps } from "react-bingmaps";
import Spinner from "./Spinner";
import Swimming from "../assets/swimming2.jpg";
import Basketball from "../assets/basketball3.jpg";
import Cycling from "../assets/cycling2.jpg";
import Football from "../assets/football2.jpg";
import Volleyball from "../assets/volleyball2.jpg";
import Yoga from "../assets/yoga2.jpg";
import Tennis from "../assets/tennis3.jpg";
import Handball from "../assets/handball1.jpg";
import Cricket from "../assets/cricket2.jpg";
import Fitness from "../assets/fitness1.jpg";
import Skiing from "../assets/ski1.jpg";
import { ParallaxBanner } from "react-scroll-parallax";

const EventMoreInfo = () => {
  const [eventComments, setEventComments] = useState([]);
  const [eventNewComment, setEventNewComment] = useState();
  const [eventNewReply, setEventNewReply] = useState();
  const [commentID, setCommentID] = useState();
  const [replyID, setReplyID] = useState();
  const [users, setUsers] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [eventInfo, setEventInfo] = useState();
  const [eventID, setEventID] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [loading, setLoading] = useState(true);
  const [commentPopup, setCommentPopup] = useState(false);
  const [replyPopup, setReplyPopup] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

  const themeStyles = isLightTheme ? light : dark;

  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await fetch(`https://teamup-service.onrender.com/event/${id}`);
    const data = await res.json();
    // console.log(data.eventComment);
    console.log(data);
    setEventInfo(data);
    setEventID(data._id);
    setLatitude(data.location?.LatLng?.latitude);
    setLongitude(data.location?.LatLng?.longitude);
    setAttendees(data.usersAttending);
    setInterestedUsers(data.usersInterested);
    setEventComments(data.eventComment);
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

  const handleUpdateAttending = async (id) => {
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
        // navigate("/");
        setIsDataUpdated(true);
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const handleUpdateNoLongerAttending = async (id) => {
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
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        console.log("user no longer attending updated successfully");
        alert("Your have been successfully removed from this event!");
        // navigate("/");
        setIsDataUpdated(true);
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
        // navigate("/");
        setIsDataUpdated(true);
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const handleUpdateNoLongerInterested = async (id) => {
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
        alert("This event has been successfully removed from your watchlist!");
        // navigate("/");
        setIsDataUpdated(true);
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const settingCommentForReply = (commentID) => {
    setCommentID(commentID);
    showModal7();
  };
  const settingCommentForDeleteComment = (commentID) => {
    setCommentID(commentID);
    showModal8();
  };
  const settingCommentForDeleteReply = (commentID, replyID) => {
    setCommentID(commentID);
    setReplyID(replyID);
    showModal9();
  };

  const sendComment = () => {
    setIsModal6Open(false);
    setCommentPopup(false);
    sendCommentPost(eventID);
  };
  const sendReply = (commentID) => {
    setIsModal7Open(false);
    sendReplyPost(eventID);
  };
  const deleteComment = (commentID) => {
    setIsModal8Open(false);
    handleDeleteComment(eventID);
  };
  const deleteReply = (commentID) => {
    setIsModal9Open(false);
    handleDeleteReply(eventID);
  };

  const sendCommentPost = async (id) => {
    try {
      const response = await fetch(
        `https://teamup-service.onrender.com/event/${id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventComment: [
              {
                content: eventNewComment,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        console.log("new comment added successfully");
        alert("Your comment has been successfully added!");
        // navigate(-1);
        setIsDataUpdated(true);
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const sendReplyPost = async (id) => {
    // console.log(id);
    // console.log(commentID);
    try {
      const response = await fetch(
        `https://teamup-service.onrender.com/event/${id}/comment/${commentID}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            replies: [
              {
                content: eventNewReply,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        console.log("new reply added successfully");
        alert("Your reply has been successfully added!");
        // navigate(-1);
        setIsDataUpdated(true);
      } else {
        console.error("Failed to add reply");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  const handleDeleteReply = async (id) => {
    // console.log(id);
    // console.log(commentID);
    try {
      const response = await fetch(
        `https://teamup-service.onrender.com/event/${id}/comment/${commentID}/replies/${replyID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("reply deleted successfully");
        alert("Your reply has been successfully deleted!");
        // navigate(-1);
        setIsDataUpdated(true);
      } else {
        console.error("Failed to delete reply");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };
  const handleDeleteComment = async (id) => {
    // console.log(id);
    // console.log(commentID);
    try {
      const response = await fetch(
        `https://teamup-service.onrender.com/event/${id}/comment/${commentID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("comment deleted successfully");
        alert("Your comment has been successfully deleted!");
        // navigate(-1);
        setIsDataUpdated(true);
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const fetchUsers = async () => {
    const response = await fetch(
      "https://teamup-service.onrender.com/user/users",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setUsers(data);
  };

  const oneUser = users?.filter(
    (user) => user?.username === decodedToken?.name
  );

  // console.log(oneUser[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    fetchUsers();
    fetchData();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDataUpdated) {
      // Perform actions you want to do after the data is updated
      fetchData();
      // Reset the state after performing necessary actions
      setIsDataUpdated(false);
    }
  }, [isDataUpdated]);

  const data = attendees;

  const inputDate = eventInfo?.eventDateAndTime?.eventDate;
  const formattedDate = dateFormatter(inputDate);

  const longTime = eventInfo?.eventDateAndTime?.eventTime;
  const date = new Date(longTime);

  const formattedTime = date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const checkForAttendeeMatch = attendees.filter(
    (attendee) => attendee.username === decodedToken?.name
  );
  const checkForLikeMatch = interestedUsers.filter(
    (interestedUser) => interestedUser === decodedToken?._id
  );

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
    if (attendees?.length >= eventInfo?.maxCapacity) {
      alert("This event is unfortunately already fully booked");
    } else {
      attendees.push({
        username: oneUser[0]?.username,
        _id: oneUser[0]?._id,
        userImage: oneUser[0]?.userInfo?.userImage
          ? oneUser[0]?.userInfo?.userImage
          : "",
      });

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
    interestedUsers.push(decodedToken?.name);
    handleUpdateInterested(eventID);
  };
  const handleCancel3 = () => {
    setIsModal3Open(false);
  };
  const [isModal4Open, setIsModal4Open] = useState(false);
  const showModal4 = () => {
    setIsModal4Open(true);
  };
  const handleOk4 = () => {
    setIsModal4Open(false);
    const updatedAttendees = attendees.filter(
      (attendee) => attendee?.username !== decodedToken?.name
    );
    setAttendees(updatedAttendees);
    handleUpdateNoLongerAttending(eventID);
  };
  const handleCancel4 = () => {
    setIsModal4Open(false);
  };
  const [isModal5Open, setIsModal5Open] = useState(false);
  const showModal5 = () => {
    setIsModal5Open(true);
  };
  const handleOk5 = () => {
    setIsModal5Open(false);
    const updatedInterestedUsers = interestedUsers.filter(
      (interestedUser) => interestedUser !== decodedToken?._id
    );
    setInterestedUsers(updatedInterestedUsers);
    handleUpdateNoLongerInterested(eventID);
  };
  const handleCancel5 = () => {
    setIsModal5Open(false);
  };
  const [isModal6Open, setIsModal6Open] = useState(false);
  const showModal6 = () => {
    setIsModal6Open(true);
  };
  const handleOk6 = () => {
    setCommentPopup(true);
  };
  const handleCancel6 = () => {
    setIsModal6Open(false);
    setCommentPopup(false);
  };
  const [isModal7Open, setIsModal7Open] = useState(false);
  const showModal7 = () => {
    setIsModal7Open(true);
  };

  const handleCancel7 = () => {
    setIsModal7Open(false);
  };
  const [isModal8Open, setIsModal8Open] = useState(false);
  const showModal8 = () => {
    setIsModal8Open(true);
  };

  const handleCancel8 = () => {
    setIsModal8Open(false);
  };
  const [isModal9Open, setIsModal9Open] = useState(false);
  const showModal9 = () => {
    setIsModal9Open(true);
  };

  const handleCancel9 = () => {
    setIsModal9Open(false);
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

  // Chooses sport background according to which type of sport the event is
  const sportFunction = () => {
    if (eventInfo?.sportType[0] == "Swimming") {
      return Swimming;
    } else if (eventInfo?.sportType[0] == "Basketball") {
      return Basketball;
    } else if (eventInfo?.sportType[0] == "Cycling") {
      return Cycling;
    } else if (eventInfo?.sportType[0] == "Football") {
      return Football;
    } else if (eventInfo?.sportType[0] == "Volleyball") {
      return Volleyball;
    } else if (eventInfo?.sportType[0] == "Yoga") {
      return Yoga;
    } else if (eventInfo?.sportType[0] == "Tennis") {
      return Tennis;
    } else if (eventInfo?.sportType[0] == "Handball") {
      return Handball;
    } else if (eventInfo?.sportType[0] == "Cricket") {
      return Cricket;
    } else if (eventInfo?.sportType[0] == "Fitness") {
      return Fitness;
    } else if (eventInfo?.sportType[0] == "Ski") {
      return Skiing;
    } else {
      return null;
    }
  };

  return (
    <>
      <ParallaxBanner
        className="events-heroDiv"
        layers={[
          {
            speed: -30,
            children: <div className=""></div>,
          },
          { image: sportFunction(), speed: 20 },
        ]}
      >
        <h1 className="events-text-hero"> Event Information</h1>
      </ParallaxBanner>

      {/* <div className="events-heroDiv">
        <h1 className="events-h1"> Event information</h1>
      </div> */}
      <div className="page4-container">
        <div className="page4-left-column">
          <div className="page4-organiser-container">
            <h3 className="page4-organiser">Event organiser:</h3>
            <h3 className="page4-organiser-name">
              {eventInfo?.organizator?.username}
            </h3>
          </div>
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
        <div
          className="page4-right-column"
          style={{ background: themeStyles.grey, color: themeStyles.text }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h2 className="page4-heading">{eventInfo?.eventTitle}</h2>
              <h3 className="page4-input-fields">
                Sport type:
                <span className="event-info-buttons">
                  {eventInfo?.sportType}
                </span>
              </h3>
              <h3 className="page4-input-fields">
                Date:{" "}
                <span className="event-info-buttons">{formattedDate}</span>{" "}
              </h3>
              <h3 className="page4-input-fields">
                Start time:{" "}
                <span className="event-info-buttons">{formattedTime}</span>
              </h3>
              <div className="page4-location-container">
                <h3 className="page4-input-field-location">
                  <EnvironmentOutlined />
                  <h4 className="event-info-buttons">Location:</h4>
                </h3>

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
                Description:
                <div className="page-4-description-text">
                  {eventInfo?.eventDescription}
                </div>
              </h3>
              <div className="page4-spaces-fields-container">
                <h3 className="page4-spaces-fields">
                  <div className="page4-spaces-fields-div">
                    <DoubleRightOutlined />
                    <span className="event-info-buttons">
                      Max capacity: {eventInfo?.maxCapacity}
                    </span>
                  </div>
                </h3>
                <h3 className="page4-spaces-fields">
                  <div className="page4-spaces-fields-div">
                    <DoubleRightOutlined />
                    <span className="event-info-buttons">
                      Spaces left: {eventInfo?.maxCapacity - attendees?.length}
                    </span>
                  </div>
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
                          style={{
                            background: themeStyles.light,
                            color: themeStyles.text,
                          }}
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
                  onClick={showModal6}
                >
                  <div>
                    <CommentOutlined />
                    <span className="event-info-buttons">
                      Go to event comments
                    </span>
                  </div>
                </Button>
                <Modal
                  className="event-comments-modal"
                  centered
                  title="Comments for this event"
                  open={isModal6Open}
                  onOk={!commentPopup ? handleOk6 : sendComment}
                  onCancel={handleCancel6}
                  okText="Add comment"
                >
                  <div className="event-comments">
                    {eventComments.length > 0 ? (
                      eventComments.map(
                        (comment, index) =>
                          comment.content && (
                            <div
                              key={index}
                              className="event-individual-comment"
                            >
                              <div className="event-individual-comment-text">
                                {comment.content}
                              </div>
                              <div className="event-individual-comment-time-and-button">
                                <div className="event-individual-comment-date">
                                  on{" "}
                                  {new Date(
                                    comment?.timestamp
                                  ).toLocaleDateString("de-DE", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                                <div className="event-individual-comment-buttons">
                                  <button
                                    className={
                                      comment?.userId === decodedToken?._id
                                        ? "event-individual-comment-button"
                                        : "page4-btn-wrapper-hidden"
                                    }
                                    onClick={() =>
                                      settingCommentForDeleteComment(
                                        comment?._id
                                      )
                                    }
                                  >
                                    <DeleteOutlined />
                                    <span className="event-info-comment-buttons">
                                      Delete
                                    </span>
                                  </button>
                                  <button
                                    className="event-individual-comment-button"
                                    onClick={() =>
                                      settingCommentForReply(comment?._id)
                                    }
                                  >
                                    <CommentOutlined />
                                    <span className="event-info-comment-buttons">
                                      Reply
                                    </span>
                                  </button>
                                </div>
                              </div>
                              {comment?.replies.length > 0 && (
                                <div className="event-individual-comment-reply-heading">
                                  Replies to this comment:
                                </div>
                              )}
                              {comment?.replies.length > 0 &&
                                comment?.replies.map((reply, index) => (
                                  <div key={index}>
                                    <div className="event-individual-comment-reply-text">
                                      {reply?.content}
                                    </div>
                                    <div className="event-individual-comment-time-and-button">
                                      <div className="event-individual-comment-reply-date">
                                        on{" "}
                                        {new Date(
                                          reply?.timestamp
                                        ).toLocaleDateString("de-DE", {
                                          hour: "numeric",
                                          minute: "numeric",
                                          day: "numeric",
                                          month: "numeric",
                                          year: "numeric",
                                        })}
                                      </div>
                                      <button
                                        className={
                                          reply?.userId === decodedToken?._id
                                            ? "event-individual-comment-button"
                                            : "page4-btn-wrapper-hidden"
                                        }
                                        onClick={() =>
                                          settingCommentForDeleteReply(
                                            comment?._id,
                                            reply?._id
                                          )
                                        }
                                      >
                                        <DeleteOutlined />
                                        <span className="event-info-comment-buttons">
                                          Delete
                                        </span>
                                      </button>
                                      <Modal
                                        title="Are you sure you want to delete this reply?"
                                        open={isModal9Open}
                                        onOk={() => deleteReply(comment?._id)}
                                        onCancel={handleCancel9}
                                      ></Modal>
                                    </div>
                                  </div>
                                ))}
                              <Modal
                                title="Are you sure you want to delete this comment?"
                                open={isModal8Open}
                                onOk={() => deleteComment(comment?._id)}
                                onCancel={handleCancel8}
                              ></Modal>
                              <Modal
                                title="Write your reply"
                                open={isModal7Open}
                                onOk={() => sendReply(comment?._id)}
                                onCancel={handleCancel7}
                              >
                                <textarea
                                  onChange={(e) =>
                                    setEventNewReply(e.target.value)
                                  }
                                  name="add-reply"
                                  id="add-reply"
                                  width="100%"
                                  cols="50"
                                  rows="5"
                                ></textarea>
                              </Modal>
                            </div>
                          )
                      )
                    ) : (
                      <div className="event-comments-none-yet">
                        There aren't any comments yet
                      </div>
                    )}
                  </div>
                  <div className="event-add-new">
                    {commentPopup ? (
                      <>
                        <div className="event-add-new-comment-heading">
                          Please write your comment below:
                        </div>

                        <textarea
                          onChange={(e) => setEventNewComment(e.target.value)}
                          name="add-comment"
                          id="add-comment"
                          width="100%"
                          cols="50"
                          rows="10"
                        ></textarea>
                      </>
                    ) : null}
                  </div>
                </Modal>
                <Button
                  className="page4-block-btn"
                  type="primary"
                  block
                  onClick={
                    checkForLikeMatch.length > 0 ? showModal5 : showModal3
                  }
                >
                  {checkForLikeMatch.length > 0 ? (
                    <div>
                      <DislikeOutlined />

                      <span className="event-info-buttons">
                        Remove event from watchlist
                      </span>
                    </div>
                  ) : (
                    <div>
                      <LikeOutlined />{" "}
                      <span className="event-info-buttons">
                        Like this event
                      </span>
                    </div>
                  )}
                </Button>
                <Modal
                  title="Add this event to your watchlist?"
                  open={isModal3Open}
                  onOk={handleOk3}
                  onCancel={handleCancel3}
                ></Modal>
                <Modal
                  title="Are you sure you want to remove this event from your watchlist?"
                  open={isModal5Open}
                  onOk={handleOk5}
                  onCancel={handleCancel5}
                ></Modal>
                <Button
                  className="page4-block-btn"
                  type="primary"
                  block
                  onClick={
                    checkForAttendeeMatch.length > 0 ? showModal4 : showModal2
                  }
                >
                  {checkForAttendeeMatch.length > 0 ? (
                    <div>
                      <CloseOutlined />
                      <span className="event-info-buttons">
                        I no longer wish to attend
                      </span>{" "}
                    </div>
                  ) : (
                    <div>
                      <CheckOutlined />{" "}
                      <span className="event-info-buttons">
                        Attend this event
                      </span>
                    </div>
                  )}
                </Button>
                <Modal
                  title="Are you sure you want to attend this event?"
                  open={isModal2Open}
                  onOk={handleOk2}
                  onCancel={handleCancel2}
                ></Modal>
                <Modal
                  title="Are you sure that you no longer want to attend this event?"
                  open={isModal4Open}
                  onOk={handleOk4}
                  onCancel={handleCancel4}
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
                  <div>
                    <DeleteOutlined />
                    <span className="event-info-buttons">
                      Delete this event
                    </span>
                  </div>
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
