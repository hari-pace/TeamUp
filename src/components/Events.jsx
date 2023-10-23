import React, { useState } from "react";
import { Button, Card, Avatar, Modal, Input, Radio, Space } from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./styling/events.css";

const Events = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [sportValue, setSportValue] = useState(null);

  const onChangeLocation = (e) => {
    console.log("radio checked", e.target.value);
    setLocationValue(e.target.value);
  };
  const onChangeSport = (e) => {
    console.log("radio checked", e.target.value);
    setSportValue(e.target.value);
  };

  const { Meta } = Card;

  return (
    <>
      <div className="events-heroDiv">
        <h1 className="events-h1"> Find your event</h1>
      </div>
      <div className="events-search-section">
        <div className="events-searchbars">
          {/* Add search logic here to search for events */}
          <input
            type="text"
            className="events-find-event"
            placeholder="What are you looking for today?"
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
            className=""
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Football at Volkspark"
            description="8pm, 21.07 @ Volkspark"
          />
        </Card>
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
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
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
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
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
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
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
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
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
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
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
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
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
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
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
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      </div>
      <div className="page3-btn-wrapper">
        <Button className="page2-block-btn" type="primary" block>
          Create an event
        </Button>
      </div>
    </>
  );
};

export default Events;
