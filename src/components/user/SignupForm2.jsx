import { useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx"
import {
  Button,
  Form,
  Input,
  Select, 
  Space,
  Radio,
  Upload,
  Checkbox
} from 'antd';
import FormItem from 'antd/es/form/FormItem/index.js';
import axios from "axios";
import { PlusOutlined } from '@ant-design/icons';
import { ThemeContext } from "../../context/ThemeContext";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const { Option } = Select;
const { TextArea } = Input;

export default function SignupForm2 () {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [languagesSpoken, setLanguage] = useState([])
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState(null);
    const [loadings, setLoadings] = useState([]);
    const [isRequired, setIsRequired] = useState(true);
    const [age, setAge] = useState(true)

    const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

    const themeStyles = isLightTheme ? light : dark;

    const { token, login } = useContext(AuthContext);

    const handleSubmit = async () => {
        try {
        setError(null);
        console.log("City and Country values before appending to form data:", city, country);
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("username", username);
        formData.append("description", description);
        if (image) {
            formData.append("picture", image, image.name);
          }
        formData.append("languagesSpoken", languagesSpoken)
        formData.append("city", city );
        formData.append("country", country );
        const response = await axios.post("https://teamup-service.onrender.com/user/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status >= 200 && response.status < 300) {
            const data = response.data;
            setTimeout(() => {
            localStorage.setItem("token", data.token);
            login(data.token)
            setLoadings([false])
          }, 5000);
        }
          // } else {
          //   setError("An error occurred during signup.");
          // }
        } catch (error) {
          setError(error);
          setLoadings([false])
          console.log(error)
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
        };
      

        const handleImageChange = (info) => {
          if (info?.fileList.length > 0) {
            setImage(info.file);
            console.log(info);
          } else {
            setImage("");
            console.log(image)
          }
        };
    return (
        <>
        <div className="formDiv">
        <div className={age ? "eighteenAnimation" : "eighteen"}>
    <h4 style={{color: themeStyles.text}}>Are you over 18?</h4>
    <Radio.Group
        className="ageAuth"
        rules={[
          {
          required: true,
          message: 'Please confirm!',
          },
          ]}
          warnings="Please confirm!"
    >
      <Radio
    style={{color: themeStyles.text}}
    onChange={() => {setComponentDisabled(false); setAge(false)}}
    unchecked="true"
    value="Yes"
    >
    Yes
    </Radio>
    <Radio
    style={{color: themeStyles.text}}
    checked="true"
    onChange={() => {setComponentDisabled(true); setAge(true)}}
    value="No"
    >
    No
    </Radio>
      </Radio.Group>
      </div>
    <Form
    onFinish={handleSubmit}
    name="basic"
    disabled={componentDisabled}
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
    {/* {error ? <h4 className="errorH">{error?.response?.data?.error}</h4> : null} */}
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
        label="Upload"
        name="fileList"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="picture"
          action="https://teamup-service.onrender.com/user/signup"
          listType="picture-card"
          onChange={handleImageChange}
          beforeUpload={() => false} // Prevent default behavior of the Ant Design Upload component
        >

            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8, color: themeStyles.text }}>Upload</div>
            </div>
        </Upload>
      </Form.Item>


{/* select language */}
<Form.Item
label="Languages"
htmlFor="languagesSpoken"
name="Languages"
rules={[
    { required: true },
    ]}
>
<Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    rules={[
      { required: true },
      ]}
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
    <Option value="German" label="DE" >
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
  </Form.Item>
{/* select language */}
<Form.Item
label="City"
htmlFor="userInfo.location.city"
name="city"
rules={[
  {
    required: true,
    message: 'Please choose your city!',
  },
]}
>
<Radio.Group 
onChange={(e) => setCity(e.target.value)} 
value={city}
>
              <Space direction="vertical">
                <Radio style={{color: themeStyles.text}} value={"Berlin"}>Berlin</Radio>
                <Radio style={{color: themeStyles.text}} value={"München"}>München</Radio>
                <Radio style={{color: themeStyles.text}} value={"Hamburg"}>Hamburg</Radio>
                <Radio style={{color: themeStyles.text}} value={"Stuttgart"}>Stuttgart</Radio>
                <Radio style={{color: themeStyles.text}} value={"Dresden"}>Dresden</Radio>
                <Radio style={{color: themeStyles.text}} value={"Frankfurt am Main"}>Frankfurt am Main</Radio>
                <Radio style={{color: themeStyles.text}} value={"Köln"}>Köln</Radio>
                <Radio style={{color: themeStyles.text}} value={"Nürnberg"}>Nürnberg</Radio>
                <Radio style={{color: themeStyles.text}} value={"Hannover"}>Hannover</Radio>
                <Radio style={{color: themeStyles.text}} value={"Bremen"}>Bremen</Radio>
              </Space>
            </Radio.Group>
  </Form.Item>
  <Form.Item
      label="Country of Origin"
      htmlFor="userInfo.location.country"
      rules={[
        {
          required: true,
          message: 'Please input your country!',
        },
      ]}
    >
      <Input
      type="text"
      onChange={(e) => setCountry(e.target.value)}
      value={country}
      name="userInfo.location.country"
      placeholder="Where are you from?"
      />
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
      style={{color: themeStyles.text}}
      loading={loadings[0]} 
      onClick={() => enterLoading(0)} 
      htmlType="submit">
        Submit
      </Button>
      {error ? <h4 className="errorH">{error?.response?.data?.error}</h4> : null}
    </Form.Item>
      </Form>
      </div>
        </>
    )
}