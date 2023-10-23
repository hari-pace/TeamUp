import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import EventMoreInfo from "./components/EventMoreInfo";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="dashboard/:username" element={<Dashboard />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventMoreInfo />} />
        <Route path="events/create" element="" />
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
