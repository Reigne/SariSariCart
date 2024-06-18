import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
//pages
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Navbar/Sidebar";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Products from "./pages/Product/Products";
import Categories from "./pages/Category/Categories";

export default function App() {
  return (
    <div className="flex flex-col h-screen ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
  );
}
