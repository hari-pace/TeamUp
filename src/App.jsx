import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element="" />
        <Route path="/dashboard/:username" element="" />
        <Route path="/sport" element="" />
        <Route path="/sport/:id" element="" />
        <Route path="/sport/create" element="" />
        <Route path="/profile/:username" element="" />
        <Route path="/contact" element="" />
        <Route path="/about" element="" />
        <Route path="/*" element="" />
      </Routes>

      <Header />
    </>
  );
}

export default App;
