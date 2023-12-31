import { Button, Modal, Form } from "antd";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SignupForm2 from "./SignupForm2";
import Login from "./Login";
import { ThemeContext } from "../../context/ThemeContext";

export default function Signup() {
  const [openReg, setRegOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(<SignupForm2 />);
  const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

  const themeStyles = isLightTheme ? light : dark;

  const showModal = () => {
    setRegOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setRegOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");

    setRegOpen(false);
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
        Sign up
      </Button>
      <Modal
        bodyStyle={{ backgroundColor: themeStyles.ui}}
        className={isLightTheme ? "lightModal" : "darkModal"}
        title="Sign up"
        open={openReg}
        onOk={handleOk}
        footer={null}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <Form.Item>
          Or{" "}
          <Link
            onClick={() => {
              setRegOpen(false);
            }}
          >
            <Login className="tinyLogin" />
          </Link>
        </Form.Item>
      </Modal>
    </>
  );
}
