import React, { useEffect, useState } from "react";
import "./styling/EventMoreInfo.css";
import Avatar from "./Avatar";
import { Card, List, Button } from "antd";

const EventMoreInfo = () => {
  const [attendees, setAttendees] = useState([]);

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

  const fetchAttendees = async () => {
    const res = await fetch("https://teamup-service.onrender.com/user/users");
    const data = await res.json();
    console.log(data);
    setAttendees(data);
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  const data = attendees;

  return (
    <>
      <div className="page4-container">
        <div className="page4-left-column">
          <div className="page4-avatar">
            <Avatar />
          </div>
          <div>Organiser info</div>
        </div>
        <div className="page4-right-column">
          <h2 className="page4-heading">Football at Volkspark</h2>
          <h3 className="page4-input-fields">Date: </h3>
          <h3 className="page4-input-fields">Start time: </h3>
          <h3 className="page4-input-fields">Location: </h3>
          <h3 className="page4-input-fields" id="page-4-description">
            Description:{" "}
          </h3>
          <div className="page4-spaces-fields-container">
            <h3 className="page4-spaces-fields">Confirmed number: </h3>
            <h3 className="page4-spaces-fields">Spaces left: </h3>
          </div>
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
              dataSource={data}
              renderItem={(item) => (
                <List.Item className="page4-grid-items">
                  <Card title={item.username}>Card content</Card>
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
