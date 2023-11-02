import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  Avatar,
  Modal,
  Input,
  Pagination,
  Radio,
  Space,
  Switch,
} from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./styling/events.css";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { AuthContext } from "../context/authContext";
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
import VolleyballVid from "../assets/VolleyballVid.mp4";

const Events = () => {
  const [toggleEventType, setToggleEventType] = useState(true);
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [sportValue, setSportValue] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const { token } = useContext(AuthContext);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, pageSize) => {
    setItemsPerPage(pageSize);
    setCurrentPage(1);
  };

  const onChangeLocation = (e) => {
    console.log("radio checked", e.target.value);
    setLocationValue(e.target.value);
    setCurrentPage(1);
  };
  const onChangeSport = (e) => {
    console.log("radio checked", e.target.value);
    setSportValue(e.target.value);
    setCurrentPage(1);
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

  // const futureEvents = events.filter(
  //   (event) => new Date(event.eventDateAndTime?.eventDate) >= new Date()
  // );
  const upcomingEvents = events.filter(
    (event) => event.eventStatus === "upcoming"
  );
  const completedEvents = events.filter(
    (event) => event.eventStatus === "completed"
  );

  const sortedEvents = upcomingEvents.sort((a, b) => {
    return (
      new Date(a.eventDateAndTime?.eventDate) -
      new Date(b.eventDateAndTime?.eventDate)
    );
  });
  const sortedCompletedEvents = completedEvents.sort((a, b) => {
    return (
      new Date(a.eventDateAndTime?.eventDate) -
      new Date(b.eventDateAndTime?.eventDate)
    );
  });

  const filteredEvents = upcomingEvents.filter(
    (event) =>
      event.sportType[0].includes(sportValue) &&
      event.location?.address?.city?.includes(locationValue)
  );

  const filteredEventsByName = upcomingEvents.filter((event) =>
    event.eventTitle?.includes(searchValue)
  );
  const filteredEventsCompleted = completedEvents.filter(
    (event) =>
      event.sportType[0].includes(sportValue) &&
      event.location?.address?.city?.includes(locationValue)
  );

  const filteredEventsByNameCompleted = completedEvents.filter((event) =>
    event.eventTitle?.includes(searchValue)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemsFiltered = filteredEvents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const currentItemsFilteredByName = filteredEventsByName.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const clearFilter = () => {
    setSportValue("");
    setLocationValue("");
    setSearchValue(null);
  };

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

  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
    if (checked === true) {
      setToggleEventType(true);
    }
    if (checked === false) {
      setToggleEventType(false);
    }
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
            <Radio.Group
              onChange={onChangeLocation}
              value={locationValue}
              className="events-modal-text"
            >
              <Space direction="vertical">
                <Radio className="events-modal-text" value={"Berlin"}>
                  Berlin
                </Radio>
                <Radio className="events-modal-text" value={"Munich"}>
                  Munich
                </Radio>
                <Radio className="events-modal-text" value={"Hamburg"}>
                  Hamburg
                </Radio>
                <Radio className="events-modal-text" value={"Stuttgart"}>
                  Stuttgart
                </Radio>
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
                <Radio className="events-modal-text" value={"Football"}>
                  Football
                </Radio>
                <Radio className="events-modal-text" value={"Basketball"}>
                  Basketball
                </Radio>
                <Radio className="events-modal-text" value={"Volleyball"}>
                  Volleyball
                </Radio>
                <Radio className="events-modal-text" value={"Swimming"}>
                  Swimming
                </Radio>
                <Radio className="events-modal-text" value={"Cycling"}>
                  Cycling
                </Radio>
                <Radio className="events-modal-text" value={"Yoga"}>
                  Yoga
                </Radio>
                <Radio className="events-modal-text" value={"Tennis"}>
                  Tennis
                </Radio>
                <Radio className="events-modal-text" value={"Handball"}>
                  Handball
                </Radio>
                <Radio className="events-modal-text" value={"Cricket"}>
                  Cricket
                </Radio>
                <Radio className="events-modal-text" value={"Fitness"}>
                  Fitness
                </Radio>
                <Radio className="events-modal-text" value={"Ski"}>
                  Ski
                </Radio>
              </Space>
            </Radio.Group>
          </Modal>
        </div>
        <div className="events-filter">
          <Switch
            className="events-switch"
            checkedChildren="Upcoming events"
            unCheckedChildren="Past events"
            defaultChecked
            onChange={onChangeSwitch}
          />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="page2-suggested-cards">
            {toggleEventType && searchValue === null
              ? currentItemsFiltered.map((event, index) => (
                  <div key={index} className="page4-suggested-cards">
                    <Card
                      className="page2-suggested-individual-card"
                      style={{
                        width: 300,
                      }}
                      cover={
                        <img
                          alt="example"
                          src={imageOptions[event?.sportType[0]]}
                          className="events-card-cover"
                        />
                      }
                      actions={[
                        // <PlusOutlined key="plus" />,
                        // <CheckOutlined key="check" />,
                        <Link to={`/events/${event._id}`}>
                          <EllipsisOutlined key="ellipsis" />
                        </Link>,
                      ]}
                    >
                      <Meta
                        className="page2-suggested-individual-card-meta"
                        avatar={
                          <Avatar
                            src={event?.organizator?.userInfo?.userImage}
                          />
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
                  </div>
                ))
              : currentItemsFilteredByName.map((event, index) => (
                  <div key={index} className="page4-suggested-cards">
                    <Card
                      className="page2-suggested-individual-card"
                      style={{
                        width: 300,
                      }}
                      cover={
                        <img
                          alt="example"
                          src={imageOptions[event?.sportType[0]]}
                          className="events-card-cover"
                        />
                      }
                      actions={[
                        // <PlusOutlined key="plus" />,
                        // <CheckOutlined key="check" />,
                        <Link to={`/events/${event._id}`}>
                          <EllipsisOutlined key="ellipsis" />
                        </Link>,
                      ]}
                    >
                      <Meta
                        // className="page2-suggested-individual-card-meta"
                        avatar={
                          <Avatar
                            src={event?.organizator?.userInfo?.userImage}
                          />
                        }
                        title={event.eventTitle}
                        description={`${
                          event.sportType[0]
                        } // ${event.eventDateAndTime?.eventDate?.slice(
                          0,
                          10
                        )} @ ${event.eventDateAndTime?.eventTime} // ${
                          event.location?.address?.city
                        }`}
                      />
                    </Card>
                  </div>
                ))}
          </div>
          <div className="page2-suggested-cards">
            {!toggleEventType && searchValue === null
              ? filteredEventsCompleted.map((event, index) => (
                  <div key={index} className="page4-suggested-cards">
                    <Card
                      className="page2-suggested-individual-card"
                      style={{
                        width: 300,
                      }}
                      cover={
                        <img
                          alt="example"
                          src={imageOptions[event?.sportType[0]]}
                          className="events-card-cover"
                        />
                      }
                      actions={[
                        // <PlusOutlined key="plus" />,
                        // <CheckOutlined key="check" />,
                        <Link to={`/events/${event._id}`}>
                          <EllipsisOutlined key="ellipsis" />
                        </Link>,
                      ]}
                    >
                      <Meta
                        className="page2-suggested-individual-card-meta"
                        avatar={
                          <Avatar
                            src={event?.organizator?.userInfo?.userImage}
                          />
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
                  </div>
                ))
              : filteredEventsByNameCompleted.map((event, index) => (
                  <div key={index} className="page4-suggested-cards">
                    <Card
                      className="page2-suggested-individual-card"
                      style={{
                        width: 300,
                      }}
                      cover={
                        <img
                          alt="example"
                          src={imageOptions[event?.sportType[0]]}
                          className="events-card-cover"
                        />
                      }
                      actions={[
                        // <PlusOutlined key="plus" />,
                        // <CheckOutlined key="check" />,
                        <Link to={`/events/${event._id}`}>
                          <EllipsisOutlined key="ellipsis" />
                        </Link>,
                      ]}
                    >
                      <Meta
                        // className="page2-suggested-individual-card-meta"
                        avatar={
                          <Avatar
                            src={event?.organizator?.userInfo?.userImage}
                          />
                        }
                        title={event.eventTitle}
                        description={`${
                          event.sportType[0]
                        } // ${event.eventDateAndTime?.eventDate?.slice(
                          0,
                          10
                        )} @ ${event.eventDateAndTime?.eventTime} // ${
                          event.location?.address?.city
                        }`}
                      />
                    </Card>
                  </div>
                ))}
          </div>
          <div className="events-pagination">
            <Pagination
              defaultCurrent={1}
              total={
                searchValue === null
                  ? filteredEvents.length
                  : filteredEventsByName.length
              }
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              onShowSizeChange={handlePageSizeChange}
            />
          </div>
          <Link
            to="/events/create"
            className={token ? "page2-link" : "page2-link-hidden"}
          >
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
