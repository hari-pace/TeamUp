import { useState, useContext } from 'react';
import { Form, Input, Button, Popconfirm } from "antd";
import { AuthContext } from "../../context/authContext";
import FormItem from 'antd/es/form/FormItem/index.js';

export default function UsernameEdit( { initialUsername, id, setShowUsernameEdit, setLoggedOut} ) {
  const { token, logout } = useContext(AuthContext);
  const [username, setUsername] = useState(initialUsername)
  const [error, setError] = useState()
  const [loadings, setLoadings] = useState([]);
    const handleSubmit = async () => {
        // e.preventDefault(); ant has built-in prevent default
        setError(null);
    
        const response = await fetch(`https://teamup-service.onrender.com/user/edit/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          setError(data.error);
          console.log("something has happened");
        }
    
        if (response.ok) {
          console.log("SUCCESS!!!")
        }
      };
      const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            setShowUsernameEdit(false);
            localStorage.removeItem("token");
            logout();
            setLoggedOut(true);

            return newLoadings;
          });
        }, 500);
      };
const confirm = () =>
new Promise((resolve) => {
setTimeout(() => {resolve(null); handleSubmit(); enterLoading()}, 3000);
});
const handleCancel = () => {
  console.log('Clicked cancel button');
};
console.log(username);
    return (
        <>
        <Form
        onFinish={handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        >
        <FormItem
      label="Username"
      htmlFor="username"
      rules= {[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input
      type="text"
      onChange={(e) => setUsername(e.target.value)}
      value={username}
      />
    </FormItem>
    {error ? <h4 className="errorH">{error}</h4> : null}

    <Popconfirm
      className="changeUsername" 
      title="WARNING"
      description="Are you sure? You will have to login to your account again."
      onConfirm={confirm}
      onOpenChange={() => console.log('open change')}
      onCancel={handleCancel}
    >
    <Button 
      type="primary"
      className="editConfirmButtons"
      htmlType="submit">
        Submit
      </Button>
    </Popconfirm>
    </Form>
        </>
    )
}