import { useState, useContext } from 'react';
import { Form, Input, Button, Select, Space } from "antd";
import { ThemeContext } from "../../context/ThemeContext";

const { Option } = Select;

export default function SportEdit( { initialSports, id, setSports} ) {
  const [interestedInSports, setInterestedInSports] = useState(initialSports)
  const [error, setError] = useState()
  const [loadings, setLoadings] = useState([]);

  const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

  const themeStyles = isLightTheme ? light : dark;
    const handleSubmit = async () => {
        // e.preventDefault(); ant has built-in prevent default
        setError(null);
    
        const response = await fetch(`https://teamup-service.onrender.com/user/edit/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInfo: { interestedInSports } }),
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
            setSports(false);
            document.location.reload();
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
      label="Sports Following"
      name="interestedInSports"
      className={isLightTheme ? "bioDescText" : "darkbioDescText"}
    >
<Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="Select which interests you"
    optionLabelProp="label"
    value={interestedInSports}
    onChange={setInterestedInSports}
  >
    <Option value="Football" >
      <Space>
        <span role="img" aria-label="Football">
        ⚽
        </span>
        Football
      </Space>
    </Option>
    <Option value="Basketball">
      <Space>
        <span role="img" aria-label="Basketball">
        🏀
        </span>
        Basketball
      </Space>
    </Option>
    <Option value="Swimming">
      <Space>
        <span role="img" aria-label="Swimming">
        🏊‍♂️
        </span>
        Swimming
      </Space>
    </Option>
    <Option value="Tennis">
      <Space>
        <span role="img" aria-label="Tennis">
        🎾
        </span>
        Tennis
      </Space>
    </Option>
    <Option value="Volleyball">
      <Space>
        <span role="img" aria-label="Volleyball">
        🏐
        </span>
        Volleyball
      </Space>
    </Option>
    <Option value="Handball" label="HB">
    {/* <Option value={languagesSpoken} label="JP"> */}
      <Space>
        <span role="img" aria-label="Handball">
        🤾
        </span>
        Handball
      </Space>
    </Option>
    <Option value="Cricket">
      <Space>
        <span role="img" aria-label="Cricket">
        🏏
        </span>
        Cricket
      </Space>
    </Option>
    <Option value="Fitness">
      <Space>
        <span role="img" aria-label="Fitness">
        🏋️‍♂️
        </span>
        Fitness
      </Space>
    </Option>
    <Option value="Yoga">
      <Space>
        <span role="img" aria-label="Yoga">
        🧘
        </span>
        Yoga
      </Space>
    </Option>
    <Option value="Ski">
      <Space>
        <span role="img" aria-label="Ski">
        🎿
        </span>
        Ski
      </Space>
    </Option>
    <Option value="Cycling">
      <Space>
        <span role="img" aria-label="Cycling">
        🚲
        </span>
        Cycling
      </Space>
    </Option>
  </Select>
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