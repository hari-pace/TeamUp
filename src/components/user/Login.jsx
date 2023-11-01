import { Button, Modal, Form } from 'antd';
import { Link } from "react-router-dom";
import Signup from './Signup';
import { useState } from "react";
import LoginForm from './LoginForm';

export default function Login() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(<LoginForm />);
    const showModal = () => {
      setLoginOpen(true);
    };
    const handleOk = () => {
      setModalText('Please wait whilst we sign you in');
      setConfirmLoading(true);
      setTimeout(() => {
        setLoginOpen(false);
        setConfirmLoading(false);
      }, 2000);
      setModalText(<LoginForm />)
    };
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setLoginOpen(false);
    };
    return (
        <>
      <Button
      className="loginButtons" 
      ghost
      type="primary"
       onClick={showModal}>
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
        Or <Link onClick={() => {setLoginOpen(false)}}> <Signup className="tinyRegister" /> </Link>
      </Form.Item>
      </Modal>
        </>
    )
}