import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import EventMoreInfo from "./components/EventMoreInfo";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";
import CreateEvent from "./components/CreateEvent";
import ScrollToTop from "./jsfunctions/ScrollToTop";
import { AuthContext } from "./context/authContext";
import { useJwt } from "react-jwt";
import { useState, useEffect } from "react";
import "./App.css";


function App() {
  // const [username, setUsername] = useState(null)
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const [name, setName] = useState(null)

  useEffect(() => {
    if(decodedToken){
      setName(decodedToken?.name)
    }
    if(!decodedToken){
      setName(null)
    }
  }, [decodedToken])


  return (
    <>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            !token ? <Homepage /> :
             <Navigate to={`dashboard/${name ? name : "user"}`}/>
          }
        />
        <Route
          path={`dashboard/${name ? name : "user"}`}

          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventMoreInfo />} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="dashboard/user" element={<Welcome />} />
        <Route path="contact" element="" />
        <Route path="about" element="" />
        <Route path="*" element="" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
