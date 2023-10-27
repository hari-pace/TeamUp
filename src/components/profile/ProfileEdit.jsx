export default function ProfileEdit() {

    const handleSubmit = async () => {
        // e.preventDefault(); ant has built-in prevent default
        setError(null);
    
        const response = await fetch("https://teamup-service.onrender.com/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, description, userImage, languagesSpoken, interestedInSports }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          setError(data.error);
        }
    
        if (response.ok) {
          setTimeout(() => {
          localStorage.setItem("token", data.token);
          login(data.token)}, 5000);
        }
      };
    return (
        <>
        </>
    )
}