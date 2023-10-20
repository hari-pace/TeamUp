import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element="" />
        <Route path="/dashboard/:username" element={<Dashboard />} />
        <Route path="/sport" element="" />
        <Route path="/sport/:id" element="" />
        <Route path="/sport/create" element="" />
        <Route path="/profile/:username" element="" />
        <Route path="/contact" element="" />
        <Route path="/about" element="" />
        <Route path="/*" element="" />
      </Routes>
      <Homepage />
      <Footer />
    </>
  );
}

export default App;
