import { useState, useContext } from 'react';
import { Form, Input, Button, Space, Radio } from "antd";
import FormItem from 'antd/es/form/FormItem/index.js';

export default function UsernameEdit( { initialCity, id, setCity} ) {
  const [city, setBasedCity] = useState(initialCity)
  const [error, setError] = useState()
  const [loadings, setLoadings] = useState([]);
    const handleSubmit = async () => {
        // e.preventDefault(); ant has built-in prevent default
        setError(null);
    
        const response = await fetch(`https://teamup-service.onrender.com/user/edit/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInfo: { location: { city } } }),
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
            setCity(false);
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
<FormItem
label="City"
htmlFor="city"
>
<Radio.Group onChange={(e) => setBasedCity(e.target.value)} value={city}>
              <Space direction="vertical">
              <Radio value={"Berlin"}>Berlin</Radio>
                <Radio value={"Munich"}>Munich</Radio>
                <Radio value={"Hamburg"}>Hamburg</Radio>
                <Radio value={"Stuttgart"}>Stuttgart</Radio>
                <Radio value={"Düsseldorf"}>Düsseldorf</Radio>
                <Radio value={"Frankfurt am Main"}>Frankfurt am Main</Radio>
                <Radio value={"Cologne"}>Cologne</Radio>
                <Radio value={"Essen"}>Essen</Radio>
                <Radio value={"Hannover"}>Hannover</Radio>
                <Radio value={"Dortmund"}>Dortmund</Radio>
              </Space>
            </Radio.Group>
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