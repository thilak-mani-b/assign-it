import React from "react";
import {  Routes, Route } from "react-router-dom";
import './App.css';
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
    <div>header</div>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home/*" element={<ProtectedRoute component={Home} />} index/>
    </Routes>
    </>
  );
}

export default App;

