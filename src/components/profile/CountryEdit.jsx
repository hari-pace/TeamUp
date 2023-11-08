import { useState, useContext } from 'react';
import { Form, Input, Button } from "antd";
import FormItem from 'antd/es/form/FormItem/index.js';
import { ThemeContext } from "../../context/ThemeContext";

export default function UsernameEdit( { initialCountry, id, setShowCountryEdit } ) {
  const [country, setCountry] = useState(initialCountry)
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
          body: JSON.stringify({ userInfo: { location: { country } } }),
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
            setShowCountryEdit(false);
            document.location.reload();
            return newLoadings;
          });
        }, 4000);
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
      label="Country"
      htmlFor="country"
      className={isLightTheme ? "bioDescText" : "darkbioDescText"}
    >
      <Input
      type="text"
      onChange={(e) => setCountry(e.target.value)}
      value={country}
      />
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