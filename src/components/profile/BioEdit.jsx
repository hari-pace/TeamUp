import { useState, useContext } from 'react';
import { Form, Input, Button } from "antd";
import { ThemeContext } from "../../context/ThemeContext";

const { TextArea } = Input;

export default function UsernameEdit( { initialDescription, id, setBio} ) {
  const [description, setDescription] = useState(initialDescription)
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
          body: JSON.stringify({ userInfo: { description } }),
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
            setBio(false);
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
        <Form.Item 
    label="Bio"
    htmlFor="description"
    className={isLightTheme ? "bioDescText" : "darkbioDescText"}
    >
          <TextArea rows={8}
          placeholder="Say a few words about yourself"
          onChange={(e) => setDescription(e.target.value)} 
          value={description}
          />
        </Form.Item>
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