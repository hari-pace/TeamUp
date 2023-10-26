
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx"
import {
  Button,
  Form,
  Input,
  Select, 
  Space
} from 'antd';
import FormItem from 'antd/es/form/FormItem/index.js';

const { Option } = Select;
const { TextArea } = Input;

export default function SignupForm () {
    const [languagesSpoken, setLanguage] = useState([])
    const [description, setDescription] = useState("");
    const [userImage, setUserImage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [loadings, setLoadings] = useState([]);

    const { login } = useContext(AuthContext);

    const handleSubmit = async () => {
      // e.preventDefault(); ant has built-in prevent default
      setError(null);

    const response = await fetch("https://teamup-service.onrender.com/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username, description, userImage, languagesSpoken }),
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
      onChange={(e) => setEmail(e.target.value)}
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
    <Form.Item 
    label="Bio"
    htmlFor="description"
    >
          <TextArea rows={8}
          placeholder="Say a few words about yourself"
          onChange={(e) => setDescription(e.target.value)} 
          value={description}
          />
        </Form.Item>
        <Form.Item
      label="Avatar URL"
      htmlFor="userImage"
    >
      <Input
      type="text"
      placeholder="Paste in the image URL of your choice"
      onChange={(e) => setUserImage(e.target.value)}
      value={userImage}
      />
    </Form.Item>

{/* select language */}
<FormItem
label="Languages"
htmlFor="languagesSpoken"
>
<Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="Select which languages you speak"
    optionLabelProp="label"
    value={languagesSpoken}
    onChange={setLanguage}
  >
    <Option value="English" label="EN">
    {/* <Option value={languagesSpoken} label="EN"> */}
      <Space>
        <span role="img" aria-label="English">
          EN
        </span>
        English
      </Space>
    </Option>
    <Option value="German" label="DE">
    {/* <Option value={languagesSpoken} label="DE"> */}
      <Space>
        <span role="img" aria-label="German">
          DE
        </span>
        German
      </Space>
    </Option>
    <Option value="Spanish" label="ES">
    {/* <Option value={languagesSpoken} label="ES"> */}
      <Space>
        <span role="img" aria-label="Spanish">
          ES
        </span>
        Spanish
      </Space>
    </Option>
    <Option value="French" label="FR">
    {/* <Option value={languagesSpoken} label="FR"> */}
      <Space>
        <span role="img" aria-label="French">
          FR
        </span>
        French
      </Space>
    </Option>
    <Option value="Chinese" label="CN">
    {/* <Option value={languagesSpoken} label="CN"> */}
      <Space>
        <span role="img" aria-label="Chinese">
          CN
        </span>
        Chinese
      </Space>
    </Option>
    <Option value="Japanese" label="JP">
    {/* <Option value={languagesSpoken} label="JP"> */}
      <Space>
        <span role="img" aria-label="Japanese">
          JP
        </span>
        Japanese
      </Space>
    </Option>
    <Option value="Other" label="Oth">
    {/* <Option value={languagesSpoken} label="Oth"> */}
      <Space>
        <span role="img" aria-label="Other">
          OTH
        </span>
        Other
      </Space>
    </Option>
  </Select>
  </FormItem>
{/* select language */}

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
      loading={loadings[0]} 
      onClick={() => enterLoading(0)} 
      htmlType="submit">
        Submit
      </Button>
    </Form.Item>
      </Form>
        </>
    )
}