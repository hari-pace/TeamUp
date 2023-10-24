import { Button, Modal, Form } from 'antd';
import { Link } from "react-router-dom";
import Signup from './Signup';
import { useState } from "react";
import LoginForm from './LoginForm';

export default function Login() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(<LoginForm />);
    const showModal = () => {
      setOpen(true);
    };
    const handleOk = () => {
      setModalText('Please wait whilst we sign you in');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
      setModalText(<LoginForm />)
    };
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
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
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{modalText}</p>
        <Form.Item>
        Or <Link onClick={() => {setOpen(false)}}>register now!</Link>
      </Form.Item>
      </Modal>
        </>
    )
}