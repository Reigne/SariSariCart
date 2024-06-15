import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AutoComplete, Avatar, Input, message } from "antd";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-around flex-wrap  py-3 px-14">
      <a className="flex flex-col" href="/">
        <div className="flex flex-row items-center flex-shrink-0 gap-2">
          <img
            src="/images/sarisaricart_logo.jpg"
            alt="SariSariCart Logo"
            className="h-16 w-16"
          />

          <div className="flex flex-col">
            <span className="font-extrabold text-3xl tracking-normal">
              <p className="">
              <span className="text-green-500">SariSariCart</span>
              </p>
            </span>
            <span className="text-xs">“Your Doorstep Delights Delivered”</span>
          </div>
        </div>
      </a>

      <div className="flex flex-row space-x-8 items-center">
        {/* <Input.Search size="large" placeholder="Search" enterButton className=""/> */}
        <div>
          <a className="" href="/">
            Home
          </a>
        </div>
        <div>
          <a className="" href="/">
            Categories
          </a>
        </div>

        <div>
          <a className="" href="/">
            About Us
          </a>
        </div>
      </div>

      <div className="flex flex-row space-x-4 items-center">
        <div className="bg-green-100 rounded-full p-3 flex justify-center">
          {/* <a className="">Cart</a> */}
          <FaCartShopping size={14} color="#22c55e" />
        </div>
        <div>
          {/* <Button
            size="large"
            style={{ backgroundColor: "#38a169", color: "#fff" }}
          >
            Login
          </Button> */}

          <div className="bg-green-500 py-2 px-8 rounded-full">
            <span className="text-white">Login</span>
          </div>
        </div>
        {/* <div>
          <div className="border border-green-500 py-2 px-6 rounded-full">
            <span className="text-green-500">Sign Up</span>
          </div>
        </div> */}
      </div>
    </nav>
  );
}
