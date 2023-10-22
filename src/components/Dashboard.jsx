import React from "react";
import { Button, Space, Carousel, Divider, Card, Col, Row, Avatar } from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./dashboard.css";

const contentStyle = {
  margin: 0,
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
};

const { Meta } = Card;

const Dashboard = () => {
  return (
    <>
      <div className="page2-heading">Dashboard</div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <div className="page2-btn-wrapper">
          <Button className="page2-block-btn" type="primary" block>
            Find an event
          </Button>
        </div>
        <div className="2-my-events">
          <div className="page2-subheading">My Events</div>
          <Carousel className="page2-carousel">
            <div>
              <h3 style={contentStyle}>1</h3>
              {/* Add map method of events here */}
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <div className="page2-btn-wrapper">
          <Button className="page2-block-btn" type="primary" block>
            Create an event
          </Button>
        </div>
        <div className="page2-section2">
          <div className="page2-sports">
            <div className="page2-subheading2">Sports you follow</div>
            <div className="page2-sports-cards">
              <Row className="page2-sports-cards-row" gutter={8}>
                {/* Add map method of followed sports here */}
                <Col span={5}>
                  <Card
                    title="Football"
                    className="page2-sports-cards-col"
                    bordered={true}
                  >
                    Image goes here
                  </Card>
                </Col>
                <Col span={5}>
                  <Card
                    title="Basketball"
                    className="page2-sports-cards-col"
                    bordered={true}
                  >
                    Image goes here
                  </Card>
                </Col>
                <Col span={5}>
                  <Card
                    title="Running"
                    className="page2-sports-cards-col"
                    bordered={true}
                  >
                    Image goes here
                  </Card>
                </Col>
                <Col span={5}>
                  <Card
                    title="Cycling"
                    className="page2-sports-cards-col"
                    bordered={true}
                  >
                    Image goes here
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="page2-sports">
          <div className="page2-subheading">Suggested</div>
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
                className="page2-suggested-individual-card-meta"
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
        </div>
      </Space>
      <Divider className="page2-divider" />
    </>
  );
};

export default Dashboard;
