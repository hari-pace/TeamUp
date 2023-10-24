import { Button, Modal } from 'antd';
import { useState } from "react";
import SignupForm from './SignupForm';

export default function Signup() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(<SignupForm/>);
    const showModal = () => {
      setOpen(true);
    };
    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
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
        Sign up
      </Button>
      <Modal
        title="Sign up"
        open={open}
        onOk={handleOk}
        footer={null}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
)
}