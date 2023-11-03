// import { useState, useContext } from 'react';
// import { Form, Input, Button, Space, Select } from "antd";

// import FormItem from 'antd/es/form/FormItem/index.js';

// const { Option } = Select;

// export default function UsernameEdit( { initialLanguages, id, setLanguageEdit} ) {
//   const [languagesSpoken, setLanguagesSpoken] = useState(initialLanguages)
//   const [error, setError] = useState()
//   const [loadings, setLoadings] = useState([]);
//     const handleSubmit = async () => {
//         // e.preventDefault(); ant has built-in prevent default
//         setError(null);
    
//         const response = await fetch(`https://teamup-service.onrender.com/user/edit/${id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userInfo: { languagesSpoken } }),
//         });
    
//         const data = await response.json();
    
//         if (!response.ok) {
//           setError(data.error);
//           console.log(error);
//         }
    
//         if (response.ok) {
//           console.log("SUCCESS!!!" + languagesSpoken)
//         }
//       };
//       const enterLoading = (index) => {
//         setLoadings((prevLoadings) => {
//           const newLoadings = [...prevLoadings];
//           newLoadings[index] = true;
//           return newLoadings;
//         });
//         setTimeout(() => {
//           setLoadings((prevLoadings) => {
//             const newLoadings = [...prevLoadings];
//             newLoadings[index] = false;
//             setLanguageEdit(false);
            
//             return newLoadings;
//           });
//         }, 6000);
//       };
//     return (
//         <>
//         <Form
//         onFinish={handleSubmit}
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         autoComplete="off"
//         >
// <FormItem
// label="Languages"
// htmlFor="languagesSpoken"
// >
// <Select
//     mode="multiple"
//     style={{
//       width: '100%',
//     }}
//     placeholder="Select which languages you speak"
//     optionLabelProp="label"
//     value={languagesSpoken}
//     onChange={setLanguagesSpoken}
//   >
//     <Option value="English" label="EN">
//     {/* <Option value={languagesSpoken} label="EN"> */}
//       <Space>
//         <span role="img" aria-label="English">
//           EN
//         </span>
//         English
//       </Space>
//     </Option>
//     <Option value="German" label="DE">
//     {/* <Option value={languagesSpoken} label="DE"> */}
//       <Space>
//         <span role="img" aria-label="German">
//           DE
//         </span>
//         German
//       </Space>
//     </Option>
//     <Option value="Spanish" label="ES">
//     {/* <Option value={languagesSpoken} label="ES"> */}
//       <Space>
//         <span role="img" aria-label="Spanish">
//           ES
//         </span>
//         Spanish
//       </Space>
//     </Option>
//     <Option value="French" label="FR">
//     {/* <Option value={languagesSpoken} label="FR"> */}
//       <Space>
//         <span role="img" aria-label="French">
//           FR
//         </span>
//         French
//       </Space>
//     </Option>
//     <Option value="Chinese" label="CN">
//     {/* <Option value={languagesSpoken} label="CN"> */}
//       <Space>
//         <span role="img" aria-label="Chinese">
//           CN
//         </span>
//         Chinese
//       </Space>
//     </Option>
//     <Option value="Japanese" label="JP">
//     {/* <Option value={languagesSpoken} label="JP"> */}
//       <Space>
//         <span role="img" aria-label="Japanese">
//           JP
//         </span>
//         Japanese
//       </Space>
//     </Option>
//     <Option value="Other" label="Oth">
//     {/* <Option value={languagesSpoken} label="Oth"> */}
//       <Space>
//         <span role="img" aria-label="Other">
//           OTH
//         </span>
//         Other
//       </Space>
//     </Option>
//   </Select>
//   </FormItem>

//     {error ? <h4 className="errorH">{error} </h4> : null}
//     <Button 
//       type="primary"
//       className="editConfirmButtons"
//       loading={loadings[0]} 
//       onClick={() => enterLoading(0)} 
//       htmlType="submit">
//         Submit
//       </Button>
//     </Form>
//         </>
//     )
// }