import React, { useEffect, useState } from "react";
import { Button, Card, Avatar, Modal, Input, Radio, Space } from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./styling/events.css";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const Events = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [sportValue, setSportValue] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [loading, setLoading] = useState(true);

  const onChangeLocation = (e) => {
    console.log("radio checked", e.target.value);
    setLocationValue(e.target.value);
  };
  const onChangeSport = (e) => {
    console.log("radio checked", e.target.value);
    setSportValue(e.target.value);
  };

  const { Meta } = Card;

  const fetchEvents = async () => {
    const res = await fetch("https://teamup-service.onrender.com/event/");
    const data = await res.json();
    console.log(data);
    setEvents(data);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    clearFilter();
    fetchEvents();
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = events.filter((event) =>
    event.sportType[0].includes(sportValue)
  );

  const filteredEventsByName = events.filter((event) =>
    event.eventDescription.includes(searchValue)
  );

  const clearFilter = () => {
    setSportValue("");
    setSearchValue(null);
  };

  return (
    <>
      <div className="events-heroDiv">
        <h1 className="events-h1"> Find your event</h1>
      </div>
      <div className="events-search-section">
        <div className="events-searchbars">
          <input
            type="text"
            className="events-find-event"
            placeholder="What are you looking for today?"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <Button
            className="events-search-btn"
            type="primary"
            onClick={() => setModal1Open(true)}
          >
            {/* Make this dynamic for customer's chosen location */}
            {locationValue ? locationValue : "Choose your location"}
          </Button>
          <Modal
            title="Choose your city"
            open={modal1Open}
            onOk={() => setModal1Open(false)}
            onCancel={() => setModal1Open(false)}
          >
            <Radio.Group onChange={onChangeLocation} value={locationValue}>
              <Space direction="vertical">
                <Radio value={"Berlin"}>Berlin</Radio>
                <Radio value={"Munich"}>Munich</Radio>
                <Radio value={"Hamburg"}>Hamburg</Radio>
                <Radio value={"Stuttgart"}>Stuttgart</Radio>
              </Space>
            </Radio.Group>
          </Modal>
        </div>
        <div className="events-filter">
          <Button
            className="events-search-btn"
            type="primary"
            onClick={() => setModal2Open(true)}
          >
            Filter results
          </Button>
          <Button
            className="events-search-btn"
            type="primary"
            onClick={clearFilter}
          >
            Clear filter
          </Button>
          <Modal
            title="Choose your sport"
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
          >
            <Radio.Group onChange={onChangeSport} value={sportValue}>
              <Space direction="vertical">
                <Radio value={"Football"}>Football</Radio>
                <Radio value={"Basketball"}>Basketball</Radio>
                <Radio value={"Volleyball"}>Volleyball</Radio>
                <Radio value={"Swimming"}>Swimming</Radio>
              </Space>
            </Radio.Group>
          </Modal>
        </div>
      </div>
      {loading ? <Spinner /> : (
        <>
      <div className="page2-suggested-cards">
        {searchValue === null
          ? filteredEvents.map((event, index) => (
              <div key={index} className="page4-suggested-cards">
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
                    description={event.sportType[0]}
                  />
                </Card>
              </div>
            ))
          : filteredEventsByName.map((event, index) => (
              <div key={index} className="page4-suggested-cards">
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
                    description={event.sportType[0]}
                  />
                </Card>
              </div>
            ))}
      </div>
      <Link to="/events/create">
        <div className="page3-btn-wrapper">
          <Button className="page2-block-btn" type="primary" block>
            Create an event
          </Button>
        </div>
      </Link>
      </>
      )}
    </>
  );
};

export default Events;
