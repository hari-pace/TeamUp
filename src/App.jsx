import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import EventMoreInfo from "./components/EventMoreInfo";
import CreateEvent from "./components/CreateEvent";
import { AuthContext } from "./context/authContext";
import "./App.css";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            !token ? <Homepage /> : <Navigate to="dashboard/:username" />
          }
        />
        <Route
          path="dashboard/:username"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventMoreInfo />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="profile/:username" element="" />
        <Route path="contact" element="" />
        <Route path="about" element="" />
        <Route path="*" element="" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
