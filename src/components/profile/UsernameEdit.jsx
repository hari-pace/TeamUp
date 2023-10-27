import { useState, useContext } from 'react';
import { Form, Input, Button } from "antd";

export default function UsernameEdit( { initialUsername, id, setShowUsernameEdit} ) {
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
            return newLoadings;
          });
        }, 6000);
      };
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
        <Form.Item
      label="Username"
      name="username"
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
    </Form.Item>
    {error ? <h4 className="errorH">{error}</h4> : null}
    <Button 
      type="primary"
      className="editConfirmButtons"
      loading={loadings[0]} 
      onClick={() => enterLoading(0)} 
      htmlType="submit">
        Submit
      </Button>
    </Form>
        </>
    )
}