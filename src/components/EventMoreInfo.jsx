import React from "react";
import { useEffect, useState } from "react";
import "./styling/eventMoreInfo.css";
import Avatar from "./Avatar";
import { Card, List, Button } from "antd";
import { useParams } from "react-router-dom";

const EventMoreInfo = () => {
  const [attendees, setAttendees] = useState([]);
  const [eventInfo, setEventInfo] = useState();

  const { id } = useParams();

  //   const data = [
  //     {
  //       title: "Title 1",
  //     },
  //     {
  //       title: "Title 2",
  //     },
  //     {
  //       title: "Title 3",
  //     },
  //     {
  //       title: "Title 4",
  //     },
  //     {
  //       title: "Title 5",
  //     },
  //     {
  //       title: "Title 6",
  //     },
  //   ];

  const fetchData = async () => {
    const res = await fetch(`https://teamup-service.onrender.com/event/${id}`);
    const data = await res.json();
    console.log(data);
    setEventInfo(data);
    setAttendees(data.usersAttending);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = attendees;

  return (
    <>
      <div className="events-heroDiv">
        <h1 className="events-h1"> Event information</h1>
      </div>
      <div className="page4-container">
        <div className="page4-left-column">
          <h3>Event organiser:</h3>
          <div className="page4-avatar">
            <Avatar />
          </div>
          <div>Organiser info</div>
        </div>
        <div className="page4-right-column">
          <h2 className="page4-heading">{eventInfo?.eventDescription}</h2>
          <h3 className="page4-input-fields">
            Sport type: {eventInfo?.sportType}
          </h3>
          <h3 className="page4-input-fields">
            Date: {eventInfo?.eventDateAndTime}
          </h3>
          <h3 className="page4-input-fields">
            Start time: {eventInfo?.eventDateAndTime}
          </h3>
          <h3 className="page4-input-fields">Location: </h3>
          <h3 className="page4-input-fields" id="page-4-description">
            Description:{" "}
          </h3>
          <div className="page4-spaces-fields-container">
            <h3 className="page4-spaces-fields">
              Max capacity: {eventInfo?.maxCapacity}
            </h3>
            <h3 className="page4-spaces-fields">Spaces left: </h3>
          </div>
          <h3>
            {eventInfo &&
              eventInfo.hashTags.map((hashTag) => (
                <span className="page4-hashtags">{hashTag}</span>
              ))}
          </h3>
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
        </div>
      </div>
    </>
  );
};

export default EventMoreInfo;
