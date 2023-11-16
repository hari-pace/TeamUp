import { useEffect, useState, useContext } from "react";
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
  SearchOutlined,
  FilterOutlined,
  ClearOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./styling/events.css";
import { NavLink, Link } from "react-router-dom";
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
import { ParallaxBanner } from "react-scroll-parallax";
import { ThemeContext } from "../context/ThemeContext";

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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

  const themeStyles = isLightTheme ? light : dark;

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

  // Old method using status
  // const upcomingEvents = events.filter(
  //   (event) => event.eventStatus === "upcoming"
  // );
  // const completedEvents = events.filter(
  //   (event) => event.eventStatus === "completed"
  // );

  const upcomingEvents = events.filter(
    (event) => new Date(event.eventDateAndTime?.eventDate) >= new Date()
  );
  const completedEvents = events.filter(
    (event) => new Date(event.eventDateAndTime?.eventDate) < new Date()
  );

  console.log(upcomingEvents);

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
      event?.sportType[0][0]?.includes(sportValue) &&
      event?.location?.address?.city?.includes(locationValue)
  );

  const filteredEventsByName = upcomingEvents.filter(
    (event) =>
      event.eventTitle?.includes(searchValue) ||
      event.eventTitle?.includes(
        searchValue?.charAt(0).toUpperCase() + searchValue?.slice(1)
      ) ||
      event.eventTitle?.includes(
        searchValue?.charAt(0).toLowerCase() + searchValue?.slice(1)
      )
  );
  const filteredEventsCompleted = completedEvents.filter(
    (event) =>
      event.sportType[0][0]?.includes(sportValue) &&
      event.location?.address?.city?.includes(locationValue)
  );

  const filteredEventsByNameCompleted = completedEvents.filter(
    (event) =>
      event.eventTitle?.includes(searchValue) ||
      event.eventTitle?.includes(
        searchValue?.charAt(0).toUpperCase() + searchValue?.slice(1)
      ) ||
      event.eventTitle?.includes(
        searchValue?.charAt(0).toLowerCase() + searchValue?.slice(1)
      )
  );

  // console.log(completedEvents);
  // console.log(upcomingEvents);
  // console.log(filteredEventsCompleted);

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

  const completedItemsFiltered = filteredEventsCompleted.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const completedItemsFilteredByName = filteredEventsByNameCompleted.slice(
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

  console.log(filteredEventsCompleted);

  return (
    <>
      <ParallaxBanner
        className="events-heroDiv"
        layers={[
          {
            speed: -30,
            children: <div className=""></div>,
          },
          { image: Cycling, speed: 20 },
        ]}
      >
        <h1 className="events-text-hero"> Find your event</h1>
      </ParallaxBanner>

      {/* <div className="events-heroDiv">
        <h1 className="events-h1"> Find your event</h1>
      </div> */}

      <div className="events-search-section">
        <div className="events-searchbars">
          <div className="events-search">
            <SearchOutlined className="events-search-icon" />
            <input
              style={{ background: themeStyles.light }}
              type="text"
              className="events-find-event"
              placeholder="What are you looking for today?"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
          <div className="events-search-location-button">
            <Button
              className="events-search-btn"
              type="primary"
              onClick={() => setModal1Open(true)}
            >
              {/* Make this dynamic for customer's chosen location */}
              {locationValue ? (
                locationValue
              ) : (
                <div>
                  <HomeOutlined />
                  <span className="event-info-buttons">
                    Choose your location
                  </span>
                </div>
              )}
            </Button>
          </div>
          <Modal
            title="Choose your city"
            open={modal1Open}
            className={isLightTheme ? "lightModal" : "darkModal"}
            onOk={() => setModal1Open(false)}
            onCancel={() => setModal1Open(false)}
          >
            <Radio.Group
              onChange={onChangeLocation}
              value={locationValue}
              className="events-modal-text"
            >
              <Space direction="vertical">
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={""}
                >
                  All cities
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Berlin"}
                >
                  Berlin
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"München"}
                >
                  München
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Hamburg"}
                >
                  Hamburg
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Stuttgart"}
                >
                  Stuttgart
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Dresden"}
                >
                  Dresden
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Frankfurt am Main"}
                >
                  Frankfurt am Main
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Köln"}
                >
                  Köln
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Nürnberg"}
                >
                  Nürnberg
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Hannover"}
                >
                  Hannover
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Bremen"}
                >
                  Bremen
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
            <div>
              <FilterOutlined />
              <span className="event-info-buttons">Filter results</span>
            </div>
          </Button>
          <Button
            className="events-search-btn"
            type="primary"
            onClick={clearFilter}
          >
            <div>
              <ClearOutlined />
              <span className="event-info-buttons">Clear filter</span>
            </div>
          </Button>
          <Modal
            className={isLightTheme ? "lightModal" : "darkModal"}
            title="Choose your sport"
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
          >
            <Radio.Group onChange={onChangeSport} value={sportValue}>
              <Space direction="vertical">
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={""}
                >
                  All sports
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Football"}
                >
                  Football
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Basketball"}
                >
                  Basketball
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Volleyball"}
                >
                  Volleyball
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Swimming"}
                >
                  Swimming
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Cycling"}
                >
                  Cycling
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Yoga"}
                >
                  Yoga
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Tennis"}
                >
                  Tennis
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Handball"}
                >
                  Handball
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Cricket"}
                >
                  Cricket
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Fitness"}
                >
                  Fitness
                </Radio>
                <Radio
                  style={{ color: themeStyles.text }}
                  className="events-modal-text"
                  value={"Ski"}
                >
                  Ski
                </Radio>
              </Space>
            </Radio.Group>
          </Modal>
          <div>
            <Switch
              className="events-switch"
              checkedChildren="Upcoming events"
              unCheckedChildren="Past events"
              defaultChecked
              onChange={onChangeSwitch}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {toggleEventType && (
            <div className="page2-suggested-cards">
              {searchValue === null
                ? currentItemsFiltered.map((event, index) => (
                    <div key={index} className="page4-suggested-cards">
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to={`/events/${event._id}`}
                      >
                        <Card
                          className="page2-suggested-individual-card"
                          style={{
                            width: 300,
                            background: themeStyles.light,
                            color: themeStyles.text,
                          }}
                          cover={
                            <img
                              alt="example"
                              src={imageOptions[event?.sportType[0]]}
                              className="events-card-cover"
                              loading="lazy"
                            />
                          }
                          actions={[
                            // <PlusOutlined key="plus" />,
                            // <CheckOutlined key="check" />,

                            <EllipsisOutlined key="ellipsis" />,
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
                      </NavLink>
                    </div>
                  ))
                : currentItemsFilteredByName.map((event, index) => (
                    <div key={index} className="page4-suggested-cards">
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to={`/events/${event._id}`}
                      >
                        <Card
                          className="page2-suggested-individual-card"
                          style={{
                            width: 300,
                            background: themeStyles.light,
                            color: themeStyles.text,
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

                            <EllipsisOutlined key="ellipsis" />,
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
                      </NavLink>
                    </div>
                  ))}
            </div>
          )}
          {!toggleEventType && (
            <div className="page2-suggested-cards">
              {searchValue === null
                ? completedItemsFiltered.map((event, index) => (
                    <div key={index} className="page4-suggested-cards">
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to={`/events/${event._id}`}
                      >
                        <Card
                          className="page2-suggested-individual-card"
                          style={{
                            width: 300,
                            background: themeStyles.light,
                            color: themeStyles.text,
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

                            <EllipsisOutlined key="ellipsis" />,
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
                      </NavLink>
                    </div>
                  ))
                : completedItemsFilteredByName.map((event, index) => (
                    <div key={index} className="page4-suggested-cards">
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to={`/events/${event._id}`}
                      >
                        <Card
                          className="page2-suggested-individual-card"
                          style={{
                            width: 300,
                            background: themeStyles.light,
                            color: themeStyles.text,
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

                            <EllipsisOutlined key="ellipsis" />,
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
                      </NavLink>
                    </div>
                  ))}
            </div>
          )}
          {toggleEventType && currentItemsFiltered.length === 0 && (
            <div className="events-cards-no-events-available">
              There are currently no events. If you are logged in, please feel
              free to create an event using the button below
            </div>
          )}
          {!toggleEventType && completedItemsFiltered.length === 0 && (
            <div className="events-cards-no-events-available">
              No past events to show
            </div>
          )}

          <div className="events-pagination">
            <Pagination
              defaultCurrent={1}
              total={
                toggleEventType
                  ? searchValue === null
                    ? filteredEvents.length
                    : filteredEventsByName.length
                  : searchValue === null
                  ? filteredEventsCompleted.length
                  : filteredEventsByNameCompleted.length
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
                <PlusOutlined />
                <span
                  className="event-info-buttons"
                  id="dashboard-button-create"
                >
                  Create an event
                </span>
              </Button>
            </div>
          </Link>
        </>
      )}
    </>
  );
};

export default Events;
