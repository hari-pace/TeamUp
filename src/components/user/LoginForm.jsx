import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from "react";

export default function LoginForm({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://teamup-service.onrender.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      setUser(data);
    }
  };
    return(
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
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input
      type="email"
      onChange={(e) => {setEmail(e.target.value); console.log(email)}}
      value={email}
      />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password 
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      />
    </Form.Item>

    {/* <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button 
      type="primary" 
      htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
        </>
    )
}