import { useState, useContext, useEffect} from 'react';
import { Form, Input, Button, Select, Space } from "antd";
import FormItem from 'antd/es/form/FormItem/index.js';


const { Option } = Select;

export default function UsernameEdit( { initialSports, id, setSports} ) {
  const [interestedInSports, setInterestedInSports] = useState(initialSports)
  const [error, setError] = useState()
  const [loadings, setLoadings] = useState([]);

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
        }, 4000);
      };
    console.log(initialSports)
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
      label="Sports Following"
      htmlFor="interestedInSports"
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
    <Option value="Football" label="Football">
      <Space>
        <span role="img" aria-label="Football">
        ⚽
        </span>
        Football
      </Space>
    </Option>
    <Option value="Basketball" label="Basketball">
      <Space>
        <span role="img" aria-label="Basketball">
        🏀
        </span>
        Basketball
      </Space>
    </Option>
    <Option value="Swimming" label="Swimming">
      <Space>
        <span role="img" aria-label="Swimming">
        🏊‍♂️
        </span>
        Swimming
      </Space>
    </Option>
    <Option value="Tennis" label="Tennis">
      <Space>
        <span role="img" aria-label="Tennis">
        🎾
        </span>
        Tennis
      </Space>
    </Option>
    <Option value="Volleyball" label="Volleyball">
      <Space>
        <span role="img" aria-label="Volleyball">
        🏐
        </span>
        Volleyball
      </Space>
    </Option>
    <Option value="Handball" label="Handball">
    {/* <Option value={languagesSpoken} label="JP"> */}
      <Space>
        <span role="img" aria-label="Handball">
        🤾
        </span>
        Handball
      </Space>
    </Option>
    <Option value="Cricket" label="Cricket">
      <Space>
        <span role="img" aria-label="Cricket">
        🏏
        </span>
        Cricket
      </Space>
    </Option>
    <Option value="Fitness" label="Fitness">
      <Space>
        <span role="img" aria-label="Fitness">
        🏋️‍♂️
        </span>
        Fitness
      </Space>
    </Option>
    <Option value="Yoga" label="Yoga">
      <Space>
        <span role="img" aria-label="Yoga">
        🧘
        </span>
        Yoga
      </Space>
    </Option>
    <Option value="Ski" label="Ski">
      <Space>
        <span role="img" aria-label="Ski">
        🎿
        </span>
        Ski
      </Space>
    </Option>
    <Option value="Cycling" label="Cycling">
      <Space>
        <span role="img" aria-label="Cycling">
        🚲
        </span>
        Cycling
      </Space>
    </Option>
  </Select>
    </FormItem>
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