import { Button, Popconfirm } from 'antd';

export default function DeleteUser() {
const confirm = () =>
new Promise((resolve) => {
setTimeout(() => resolve(null), 3000);
});
    return (
        <>
    <Popconfirm
      className="deleteProfile" 
      title="WARNING"
      description="Are you sure you want to delete your account?"
      onConfirm={confirm}
      onOpenChange={() => console.log('open change')}
    >
    <Button 
    className=".profileDelete" 
    type="primary"
    danger>Delete Account</Button>
    </Popconfirm>
        </>
    )
}