import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext.jsx";
import Signup2 from './SignupForm2.jsx';
import "../styling/loginform.css"
import { ThemeContext } from "../../context/ThemeContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loadings, setLoadings] = useState([]);
  const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);
  const themeStyles = isLightTheme ? light : dark;
  const { login, token } = useContext(AuthContext);

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
      login(data.token)
      setLoadings([false])
    }, 5000);
    }
  };
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    if (token) {
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  }
}

    return(
        <>
        <div className=":where(.css-dev-only-do-not-override-qgg3xn).ant-modal .ant-modal-content" style={{background: themeStyles.ui,
          color: themeStyles.text}}>
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
      maxWidth: 600, background: themeStyles.ui, color: themeStyles.text
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      style={{background: themeStyles.ui,
        color: themeStyles.text,}}
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
    {error ? <h4 className="errorH">{error}</h4> : null}

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
      style={{color: themeStyles.text}}
      loading={loadings[0]} 
      onClick={() => enterLoading(0)}
      >
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
        </>
    )
}