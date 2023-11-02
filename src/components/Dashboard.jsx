import React from "react";
import { Button, Space, Carousel, Card, Col, Row, Avatar } from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Football from "../assets/football.jpg";
import Basketball from "../assets/basketball.jpg";
import Swimming from "../assets/swimming.jpg";
import Volleyball from "../assets/beachvolleyball.jpg";
import Cycling from "../assets/cycling2.jpg";
import Tennis from "../assets/tennis2.jpg";
import Handball from "../assets/handball1.jpg";
import Cricket from "../assets/cricket1.jpg";
import Fitness from "../assets/fitness2.jpg";
import Skiing from "../assets/ski3.jpg";

import Yoga from "../assets/yoga3.jpg";
import "./styling/dashboard.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import { dateFormatter } from "../jsfunctions/FormatDate";
import Video720p from "../assets/Video720p.mp4";

const contentStyle = {
  height: "19rem",
  lineHeight: "16rem",
  textAlign: "center",
  background: "var(--secondary)",
};

const { Meta } = Card;

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  const fetchEvents = async () => {
    const res = await fetch("https://teamup-service.onrender.com/event/");
    const data = await res.json();
    // console.log(data);
    setEvents(data);
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

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  const oneUser = users?.filter(
    (user) => user?.username === decodedToken?.name
  );

  const usersSuggestedEvents = events.filter((event) =>
    event?.location?.address?.city.includes(
      oneUser[0]?.userInfo?.location?.city
    )
  );

  const futureSuggestedEvents = usersSuggestedEvents.filter(
    (event) => new Date(event.eventDateAndTime?.eventDate) >= new Date()
  );

  const likedEvents = events.filter((event) =>
    oneUser[0]?.userInfo?.eventsLiked.includes(event._id)
  );
  const AttendedEvents = events.filter(
    (event) =>
      oneUser[0]?.userInfo?.eventsAttended.includes(event._id) ||
      oneUser[0]?.userInfo?.eventsOrganized.includes(event._id)
  );

  const futureAttendedEvents = AttendedEvents.filter(
    (event) => new Date(event.eventDateAndTime?.eventDate) >= new Date()
  );

  const futureLikedEvents = likedEvents.filter(
    (event) => new Date(event.eventDateAndTime?.eventDate) >= new Date()
  );

  const sortedAttendedEvents = futureAttendedEvents.sort((a, b) => {
    return (
      new Date(a.eventDateAndTime?.eventDate) -
      new Date(b.eventDateAndTime?.eventDate)
    );
  });
  const sortedLikedEvents = futureLikedEvents.sort((a, b) => {
    return (
      new Date(a.eventDateAndTime?.eventDate) -
      new Date(b.eventDateAndTime?.eventDate)
    );
  });

  const inputDate = events?.eventDateAndTime?.eventDate;
  const formattedDate = dateFormatter(inputDate);

  const imageOptions = {
    Football: Football,
    Basketball: Basketball,
    Volleyball: Volleyball,
    Swimming: Swimming,
    Cycling: Cycling,
    Yoga: Yoga,
    Tennis: Tennis,
    Handball: Handball,
    Cricket: Cricket,
    Fitness: Fitness,
    Ski: Skiing,
  };

  return (
    <>
      <div className="video-container">
        <div className="events-heroDiv">
          <video autoPlay loop muted src={Video720p} type="video/mp4"></video>
          <h1 className="events-h1"> Dashboard</h1>
        </div>
      </div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <br />
        <Link to="/events">
          <div className="page2-btn-wrapper">
            <Button className="page2-block-btn" type="primary" block>
              Find an event
            </Button>
          </div>
        </Link>
        <Link to="/events/create">
          <div className="page2-btn-wrapper">
            <Button className="page2-block-btn" type="primary" block>
              Create an event
            </Button>
          </div>
        </Link>
        <div className="2-my-events">
          <div className="page2-subheading">Your upcoming events</div>
          <Carousel className="page2-carousel">
            {futureAttendedEvents.length > 0 ? (
              futureAttendedEvents.map((AttendedEvent, index) => (
                <div key={index}>
                  <Link to={`/events/${AttendedEvent?._id}`}>
                    <h3 style={contentStyle}>
                      {AttendedEvent?.eventTitle} -{"  "}
                      {new Date(
                        AttendedEvent?.eventDateAndTime?.eventDate
                      ).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}{" "}
                      @{"  "}
                      {new Date(
                        AttendedEvent?.eventDateAndTime?.eventTime
                      ).toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                    </h3>
                  </Link>
                </div>
              ))
            ) : (
              <div>
                <h3
                  className="dashboard-sports-and-suggested-h3"
                  style={contentStyle}
                >
                  You have no upcoming events
                </h3>
              </div>
            )}
          </Carousel>
        </div>
        <div className="2-my-events">
          <div className="page2-subheading">Your liked events</div>
          <Carousel className="page2-carousel">
            {futureLikedEvents.length > 0 ? (
              futureLikedEvents.map((likedEvent, index) => (
                <div key={index}>
                  <Link to={`/events/${likedEvent?._id}`}>
                    <h3 style={contentStyle}>
                      {likedEvent?.eventTitle} -{"  "}
                      {new Date(
                        likedEvent?.eventDateAndTime?.eventDate
                      ).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}{" "}
                      @{" "}
                      {new Date(
                        likedEvent?.eventDateAndTime?.eventTime
                      ).toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                    </h3>
                  </Link>
                </div>
              ))
            ) : (
              <div>
                <h3
                  className="dashboard-sports-and-suggested-h3"
                  style={contentStyle}
                >
                  You haven't liked any events yet
                </h3>
              </div>
            )}
          </Carousel>
        </div>

        <div className="page2-section2">
          <div className="page2-sports">
            <div className="page2-subheading2">Sports you follow</div>
            <div className="page2-sports-cards">
              <Row className="page2-sports-cards-row" gutter={0}>
                {oneUser[0]?.userInfo?.interestedInSports.length > 0 ? (
                  oneUser[0]?.userInfo?.interestedInSports?.map((e, index) => (
                    <Col
                      key={index}
                      className="page2-sports-cards-row-individual"
                      span={5}
                    >
                      <Card
                        title={e}
                        className="page2-sports-cards-col"
                        bordered={true}
                      >
                        <img
                          className="page2-sports-cards-individual"
                          src={imageOptions[e]}
                          alt="Football"
                          height="200px"
                        />
                      </Card>
                    </Col>
                  ))
                ) : (
                  <h3 className="dashboard-sports-and-suggested-h3">
                    {" "}
                    You haven't followed any sports yet -{" "}
                    <Link
                      className="dashboard-suggested-link"
                      to={`/profile/${decodedToken?.name}`}
                    >
                      you can do that in your profile here!
                    </Link>
                  </h3>
                )}
              </Row>
            </div>
          </div>
        </div>
        <div className="page2-sports">
          <div className="page2-subheading">
            Suggested events for you in {""}
            {oneUser[0]?.userInfo?.location?.city}
          </div>

          <div className="page2-suggested-cards">
            {futureSuggestedEvents.length > 0 ? (
              futureSuggestedEvents.map((event, index) => (
                <Card
                  key={index}
                  className="page2-suggested-individual-card"
                  style={{
                    width: 350,
                  }}
                  cover={
                    <img
                      className="events-card-cover"
                      alt="example"
                      src={imageOptions[event?.sportType[0]]}
                    />
                  }
                  actions={[
                    <Link to={`/events/${event._id}`}>
                      <EllipsisOutlined key="ellipsis" />
                    </Link>,
                  ]}
                >
                  <Meta
                    // className="page2-suggested-individual-card-meta"
                    avatar={
                      <Avatar src={event?.organizator?.userInfo?.userImage} />
                    }
                    title={event.eventTitle}
                    description={`${event.sportType[0]} // ${new Date(
                      event?.eventDateAndTime?.eventDate
                    ).toLocaleDateString("de-DE", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })} @ ${new Date(
                      event?.eventDateAndTime?.eventTime
                    ).toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} // ${event.location?.address?.city}`}
                  />
                </Card>
              ))
            ) : (
              <h3 className="dashboard-sports-and-suggested-h3">
                {" "}
                There are currently no events scheduled in your area -{" "}
                <Link className="dashboard-suggested-link" to="/events/create">
                  you can always create one here!
                </Link>
              </h3>
            )}
          </div>
        </div>
      </Space>
    </>
  );
};

export default Dashboard;
