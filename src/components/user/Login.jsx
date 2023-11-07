import { Button, Modal, Form } from "antd";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import { useState, useContext } from "react";
import LoginForm from "./LoginForm";
import { ThemeContext } from "../../context/ThemeContext";

export default function Login() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(<LoginForm />);
  const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

  const themeStyles = isLightTheme ? light : dark;

  const showModal = () => {
    setLoginOpen(true);
  };
  const handleOk = () => {
    setModalText("Please wait whilst we sign you in");
    setConfirmLoading(true);
    setTimeout(() => {
      setLoginOpen(false);
      setConfirmLoading(false);
    }, 2000);
    setModalText(<LoginForm />);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setLoginOpen(false);
  };
  return (
    <>
      <Button
        className="loginButtons"
        style={{
          background: themeStyles.ui,
          color: themeStyles.text,
        }}
        ghost
        type="primary"
        onClick={showModal}
      >
        Login
      </Button>
      <Modal
        title="Login"
        open={loginOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{modalText}</p>
        <Form.Item>
          Or{" "}
          <Link
            onClick={() => {
              setLoginOpen(false);
            }}
          >
            {" "}
            <Signup className="tinyRegister" />{" "}
          </Link>
        </Form.Item>
      </Modal>
    </>
  );
}
