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

const Events = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
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

  const filteredEvents = events.filter(
    (event) =>
      event.sportType[0].includes(sportValue) &&
      event.location?.address?.city?.includes(locationValue)
  );

  const filteredEventsByName = events.filter((event) =>
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
              </Space>
            </Radio.Group>
          </Modal>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="page2-suggested-cards">
            {searchValue === null
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
                        className="page2-suggested-individual-card-meta"
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
