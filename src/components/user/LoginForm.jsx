import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext.jsx";
import Signup from './SignupForm.jsx';
import "../styling/loginform.css"

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loadings, setLoadings] = useState([]);

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    // e.preventDefault(); ant has built-in prevent default
    setError(null);

    const response = await fetch("https://teamup-service.onrender.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      setTimeout(() => {
      localStorage.setItem("token", data.token);
      login(data.token)}, 5000);
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
        return newLoadings;
      });
    }, 6000);
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
    <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> 

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button 
      type="primary"
      ghost
      className="loginButtons" 
      htmlType="submit"
      loading={loadings[0]} 
      onClick={() => enterLoading(0)}
      >
        Submit
      </Button>
    </Form.Item>
  </Form>
        </>
    )
}