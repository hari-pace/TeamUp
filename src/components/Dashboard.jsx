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

const contentStyle = {
  height: "400px",
  lineHeight: "360px",
  textAlign: "center",
  background: "var(--secondary)",
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
        <Link to="/events">
          <div className="page2-btn-wrapper">
            <Button className="page2-block-btn" type="primary" block>
              Find an event
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
        <div className="page2-btn-wrapper">
          <Button className="page2-block-btn" type="primary" block>
            Create an event
          </Button>
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
    </>
  );
};

export default Dashboard;
