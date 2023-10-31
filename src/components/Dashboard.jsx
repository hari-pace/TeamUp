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
import Beachvolleyball from "../assets/beachvolleyball.jpg";
import "./styling/dashboard.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import { dateFormatter } from "../jsfunctions/FormatDate";

const contentStyle = {
  height: "400px",
  lineHeight: "360px",
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

  // const filteredEvents = events.filter(
  //   (event) =>
  //     event.location?.address?.city ===
  // );

  const oneUser = users.filter((user) => user.username === decodedToken?.name);

  // console.log(oneUser[0]);
  // console.log(events[176]?.usersAttending);

  const usersSuggestedEvents = events.filter(
    (event) => event?.usersAttending?.username === oneUser[0]?.username
  );

  // console.log(usersSuggestedEvents);

  const likedEvents = events.filter((event) =>
    oneUser[0]?.userInfo?.eventsLiked.includes(event._id)
  );

  console.log(likedEvents);

  const inputDate = events?.eventDateAndTime?.eventDate;
  const formattedDate = dateFormatter(inputDate);

  return (
    <>
      <div className="events-heroDiv">
        <h1 className="events-h1"> Dashboard</h1>
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
            <div>
              <h3 style={contentStyle}>My event 1</h3>
              {/* Add map method of events here */}
            </div>
            <div>
              <h3 style={contentStyle}>My event 2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>My event 3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>My event 4</h3>
            </div>
          </Carousel>
        </div>
        <div className="2-my-events">
          <div className="page2-subheading">Your liked events</div>
          <Carousel className="page2-carousel">
            {likedEvents.length > 0 ? (
              likedEvents.map((likedEvent, index) => (
                <div key={index}>
                  <Link to={`/events/${likedEvent?._id}`}>
                    <h3 style={contentStyle}>
                      {likedEvent?.eventTitle} -{"  "}
                      {dateFormatter(
                        likedEvent?.eventDateAndTime?.eventDate
                      )} @ {likedEvent?.eventDateAndTime?.eventTime}{" "}
                    </h3>
                  </Link>
                </div>
              ))
            ) : (
              <div>
                <h3 style={contentStyle}>You haven't liked any events yet</h3>
              </div>
            )}
          </Carousel>
        </div>

        <div className="page2-section2">
          <div className="page2-sports">
            <div className="page2-subheading2">Sports you follow</div>
            <div className="page2-sports-cards">
              <Row className="page2-sports-cards-row" gutter={0}>
                {/* Add map method of followed sports here */}
                <Col className="page2-sports-cards-row-individual" span={5}>
                  <Card
                    title="Football"
                    className="page2-sports-cards-col"
                    bordered={true}
                  >
                    <img
                      className="page2-sports-cards-individual"
                      src={Football}
                      alt="Football"
                      height="200px"
                    />
                  </Card>
                </Col>
                <Col className="page2-sports-cards-row-individual" span={5}>
                  <Card
                    title="Basketball"
                    className="page2-sports-cards-col"
                    bordered={true}
                  >
                    <img
                      className="page2-sports-cards-individual"
                      src={Basketball}
                      alt="Basketball"
                      height="200px"
                    />
                  </Card>
                </Col>
                <Col className="page2-sports-cards-row-individual" span={5}>
                  <Card
                    title="Swimming"
                    className="page2-sports-cards-col"
                    bordered={true}
                  >
                    <img
                      className="page2-sports-cards-individual"
                      src={Swimming}
                      alt="Swimming"
                      height="200px"
                    />
                  </Card>
                </Col>
                <Col className="page2-sports-cards-row-individual" span={5}>
                  <Card
                    title="Beach Volleyball"
                    className="page2-sports-cards-col"
                    bordered={true}
                  >
                    <img
                      className="page2-sports-cards-individual"
                      src={Beachvolleyball}
                      alt="BeachVolleyball"
                      height="200px"
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="page2-sports">
          <div className="page2-subheading">Suggested events for you</div>

          <div className="page2-suggested-cards">
            <Card
              className="page2-suggested-individual-card"
              style={{
                width: 300,
              }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <PlusOutlined key="plus" />,
                <CheckOutlined key="check" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                // className="page2-suggested-individual-card-meta"
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title="Thursday night basketball"
                description="This is the description"
              />
            </Card>
          </div>
        </div>
      </Space>
    </>
  );
};

export default Dashboard;
