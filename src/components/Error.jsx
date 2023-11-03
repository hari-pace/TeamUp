import { Button, Result } from 'antd';
import { Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from ".././context/authContext"
import "../../src/components/styling/error.css"


export default function Error() {
    const { token } = useContext(AuthContext);
    return (
    <>
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist"
    extra={<Button type="primary"><Link to={token ? "/dashboard/user" : "/"}>Back Home</Link></Button>}
  />
    </>
    )
}