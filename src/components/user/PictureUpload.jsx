import { useState } from "react";
import axios from "axios";
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Form, Button } from "antd";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default function PictureUpload() {
  const [form] = Form.useForm(); // Create a form instance
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [loadings, setLoadings] = useState([])

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("picture", image, image.name);
      console.log("FORM DATA", formData);
      await axios.post("https://teamup-service.onrender.com/user/signup", formData);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const handleImageChange = (info) => {
      setImage(info.file);
      console.log(info);
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
          {image ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>
  );
}
