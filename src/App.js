import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ProtectedRoute from "./components/Route/ProtectedRoute";

//pages
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Navbar/Sidebar";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Products from "./pages/Product/Products";
import Categories from "./pages/Category/Categories";
import ProductSingle from "./pages/Product/ProductSingle";
import Profile from "./pages/Profile/Profile";

import { loadUser } from "./actions/userActions";
import store from "./store";

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="flex flex-col h-screen ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductSingle />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
