import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Pages/Home/Navbar";
import Home from "./Pages/Home/Homescreen";

function NotFound() {
  return (
    <main className="not-found">
      <h1 className="gradient-text">404</h1>
      <p className="muted">This page drifted off into space.</p>
      <a href="/" className="btn btn-primary">
        Back to home
      </a>
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer theme="dark" position="bottom-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
