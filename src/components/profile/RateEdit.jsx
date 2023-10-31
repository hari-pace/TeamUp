import { Rate, Card, Space, Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";



export default function RateEdit({id, setRate}) {
    const [loadings, setLoadings] = useState([]);
    const [rating, setUserRating] = useState()
    const [error, setError] = useState()

    const { token } = useContext(AuthContext);

    const handleSubmit = async () => {
        // e.preventDefault(); ant has built-in prevent default.
        // this submit is for userRating
        setError(null);
    
        const response = await fetch(`https://teamup-service.onrender.com/user/users/${id}/rater-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
          body: JSON.stringify({ userRating: { rating } }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          setError(data.error);
          console.log(error);
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
            setRate(false)
            return newLoadings;
          });
        }, 6000);
      };
console.log(id)
    return (
        <>
    <Form
    onFinish={handleSubmit}
    >
    <FormItem
    htmlFor="userRating">
    <label>
    <h3>User Rating</h3>
    </label>
    <br />
    <Rate
    allowHalf
    value={rating}
    onChange={(newValue) => setUserRating(newValue)}
    className="rating" />
    <Button 
    type="primary"
    className="editConfirmButtons" 
    htmlType="submit"
    loading={loadings[0]} 
    onClick={() => enterLoading(0)}>
        Submit
    </Button>
    </FormItem>
    </Form>
        </>
    )
}
