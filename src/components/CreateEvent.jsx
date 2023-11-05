import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useJwt } from "react-jwt";
import "./styling/createEvent.css";
import MapComponent from "./mapfunctions/MapComponent";
import SearchBar from "./mapfunctions/SearchBar";
import axios from "axios";
import Swimming from "../assets/swimming2.jpg";
import Cycling from "../assets/cycling.jpg";
import Basketball from "../assets/basketball2.jpg";
import { PlusOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  TimePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Space,
  Switch,
  Typography,
} from "antd";
import { ParallaxBanner } from "react-scroll-parallax";
import Skiing from "../assets/ski1.jpg";

const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CreateEvent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [eventTitle, setEventTitle] = useState();
  const [eventSportType, setEventSportType] = useState([]);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventMinimumPlayers, setEventMinimumPlayers] = useState();
  const [eventMaximumPlayers, setEventMaximumPlayers] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [eventPicture, setEventPicture] = useState();
  const [eventHashtags, setEventHashtags] = useState([]);
  const [eventCity, setEventCity] = useState();
  const [eventStreet, setEventStreet] = useState();
  const [eventHouseNumber, setEventHouseNumber] = useState();
  const [eventUsersAttending, setEventUsersAttending] = useState([]);
  const [users, setUsers] = useState([]);

  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  const navigate = useNavigate();

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
    fetchUsers();
    // setEventUsersAttending([decodedToken?.name]);
  }, []);

  const oneUser = users.filter((user) => user.username === decodedToken?.name);

  const jsonData = {
    sportType: eventSportType,
    usersAttending: [
      {
        username: oneUser[0]?.username,
        userImage: oneUser[0]?.userInfo.userImage,
      },
    ],
    minimumRequiredAmountOfPpl: eventMinimumPlayers,
    maxCapacity: eventMaximumPlayers,
    location: {
      LatLng: {
        latitude: 10,
        longitude: 10,
      },
      address: {
        city: eventCity,
        street: eventStreet,
        houseNumber: eventHouseNumber,
      },
      // eventPicture: eventPicture.fileList[0],
      // hashTags: [eventHashtags.hashtags],
    },
    eventDescription: eventDescription,
    eventTitle: eventTitle,
    eventDateAndTime: {
      eventDate: eventDate?.$d,
      eventTime: eventTime?.$d,
    },
    eventStatus: "upcoming",
  };

  const handleSubmit = async () => {
    // e.preventDefault(); ant has built-in prevent default
    setError(null);

    const response = await fetch("https://teamup-service.onrender.com/event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    });
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setError(data.error);
      console.log(error);
      alert(error);
    }

    if (response.ok) {
      alert("Your event was created successfully!");
      navigate("/");
    }
  };

  const [form] = Form.useForm();

  // const handleLocationSelect = (location) => {
  //   console.log("Selected Location:", location);
  //   setSelectedLocation(location);
  // };

  // console.log(selectedLocation.lat, selectedLocation.lng);

  const handleLocationSelected = (location) => {
    // Send the location data via a POST request or handle it as needed
    console.log("Location selected:", location);
    setSelectedLocation(location);
    // Example: Send a POST request using Axios
    // axios.post('YOUR_API_ENDPOINT', location)
    //   .then(response => {
    //     console.log('Location sent successfully:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error sending location:', error);
    //   });
  };

  const handleAddressSelect = (address) => {
    // Handle the selected address logic here
    console.log("Selected address:", address);
    setSelectedLocation(address);
  };

  // console.log(selectedLocation.lat, selectedLocation.lng);

  return (
    <>
<ParallaxBanner
                className="events-heroDiv"
                layers={[
                    {
                    speed: -30,
                    children: (
                    <div className="">
                    </div>
                    ),
                    },
                    { image: Skiing, speed: 20 },
                      ]}
                      >
        <h1 className="events-text-hero"> Create your event</h1>
</ParallaxBanner>
      <div className="page4-container">
        <div className="page5-left-column">
          <div className="page5-images">
            <img
              className="page5-individual-images"
              src={Cycling}
              alt="cycling"
            />
          </div>
          <div className="page5-images">
            <img
              className="page5-individual-images"
              src={Swimming}
              alt="cycling"
            />
          </div>
          <div className="page5-images">
            <img
              className="page5-individual-images"
              src={Basketball}
              alt="cycling"
            />
          </div>
        </div>
        <div className="page4-right-column">
          <div className="page5-form-container">
            <Form
              className="page5-form"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              layout="horizontal"
              style={{
                maxWidth: 600,
              }}
            >
              <h3 className="page5-subheadings">Event information</h3>
              <Form.Item
                label="* Event title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  type="text"
                  onChange={(e) => setEventTitle(e.target.value)}
                  value={eventTitle}
                />
              </Form.Item>
              <Form.Item
                label="* Sport type"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select onChange={setEventSportType} value={eventSportType}>
                  <Select.Option value="Football">Football</Select.Option>
                  <Select.Option value="Basketball">Basketball</Select.Option>
                  <Select.Option value="Volleyball">Volleyball</Select.Option>
                  <Select.Option value="Swimming">Swimming</Select.Option>
                  <Select.Option value="Cycling">Cycling</Select.Option>
                  <Select.Option value="Yoga">Yoga</Select.Option>
                  <Select.Option value="Tennis">Tennis</Select.Option>
                  <Select.Option value="Handball">Handball</Select.Option>
                  <Select.Option value="Cricket">Cricket</Select.Option>
                  <Select.Option value="Fitness">Fitness</Select.Option>
                  <Select.Option value="Ski">Ski</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="* Event date"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker onChange={setEventDate} value={eventDate} />
              </Form.Item>
              <Form.Item
                label="* Event time"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TimePicker
                  format="HH:mm"
                  onChange={setEventTime}
                  value={eventTime}
                  minuteStep="10"
                />
              </Form.Item>

              <Form.Item
                label="* Minimum no. of players"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  onChange={setEventMinimumPlayers}
                  value={eventMinimumPlayers}
                />
              </Form.Item>
              <Form.Item
                label="* Max no. of players"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  onChange={setEventMaximumPlayers}
                  value={eventMaximumPlayers}
                />
              </Form.Item>
              {/* <Form.Item>
                <Switch
                  defaultChecked
                  className="create-event-switch"
                  onChange={onChangeSwitch}
                  checkedChildren="I will be attending this event as a player"
                  unCheckedChildren="I just want to organise the event, but not play"
                />
              </Form.Item> */}

              <Form.Item label="Short description of event">
                <TextArea
                  rows={4}
                  onChange={(e) => setEventDescription(e.target.value)}
                  value={eventDescription}
                />
              </Form.Item>
              {/* <Form.Item name="picture" label="Event picture">
                <Upload
                  beforeUpload={() => false}
                  listType="picture-card"
                  onChange={setEventPicture}
                  value={eventPicture}
                >
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
              </Form.Item> */}

              {/* <Form.Item label="Hashtags">
                <Form
                  labelCol={{
                    span: 6,
                  }}
                  wrapperCol={{
                    span: 18,
                  }}
                  form={form}
                  name="dynamic_form_complex"
                  style={{
                    maxWidth: 600,
                  }}
                  autoComplete="off"
                  initialValues={{
                    hashtags: [{}],
                  }}
                >
                  <Form.List name="hashtags">
                    {(fields, { add, remove }) => (
                      <div
                        style={{
                          display: "flex",
                          rowGap: 16,
                          flexDirection: "column",
                        }}
                      >
                        {fields.map((field) => (
                          <Card
                            size="small"
                            title={`Hashtag ${field.name + 1}`}
                            placeholder="#TeamUp"
                            key={field.key}
                            extra={
                              <CloseOutlined
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            }
                          >
                            <Form.Item name={[field.name, "name"]}>
                              <Input
                                onChange={() =>
                                  setEventHashtags(form.getFieldsValue())
                                }
                                value={eventHashtags}
                              />
                            </Form.Item>
                          </Card>
                        ))}

                        <Button type="dashed" onClick={() => add()} block>
                          + Add Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form>
              </Form.Item> */}
              <h3 className="page5-subheadings">Event location</h3>
              {/* <div>
                <SearchBar onAddressSelect={handleAddressSelect} />
                <MapComponent
                  selectedLocation={selectedLocation}
                  onLocationSelected={handleLocationSelected}
                />
              </div> */}
              <Form.Item
                label="* Street number"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  onChange={(e) => setEventHouseNumber(e.target.value)}
                  value={eventHouseNumber}
                />
              </Form.Item>
              <Form.Item
                label="* Street name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  onChange={(e) => setEventStreet(e.target.value)}
                  value={eventStreet}
                />
              </Form.Item>
              <Form.Item
                label="* City"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  onChange={(e) => setEventCity(e.target.value)}
                  value={eventCity}
                />
              </Form.Item>
              {/* <Form.Item
                label="* Postcode"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item> */}

              <Form.Item>
                <Button className="page5-btn" onClick={handleSubmit}>
                  Create my event!
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
