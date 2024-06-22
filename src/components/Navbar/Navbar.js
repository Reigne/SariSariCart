import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, AutoComplete, Avatar, Input, message, Badge } from "antd";
import { FaCartShopping } from "react-icons/fa6";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { BsBoxSeamFill } from "react-icons/bs";
import { Logout } from "../../actions/userActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isLogout } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogout) {
      message.success("Logout Successfully");
    }
  }, [dispatch, isLogout]);

  const logoutHandler = () => {
    dispatch(Logout());
    navigate("/");
  };
  return (
    <nav className="flex items-center justify-between flex-wrap py-3 container mx-auto">
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
        {/* <a className="bg-green-100 rounded-full p-3 flex justify-center hover:scale-110 ease-in-out duration-300 ">
          <FaCartShopping size={14} color="#22c55e" />
        </a> */}

        <a
          className="relative inline-block  hover:scale-110 ease-in-out duration-300"
          href=""
        >
          <a className="bg-green-100 rounded-full p-3 flex justify-center">
            <FaCartShopping size={14} color="#22c55e" />
          </a>
          <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            1
          </span>
        </a>
        {/* 
        <Badge count={1}>
          <Avatar
            size="large"
            shape="square"
            icon={<FaCartShopping size={14} color="#22c55e" />}
            style={{ backgroundColor: "#dcfce7", color: "#fff" }}
          />
        </Badge> */}
        <div>
          {/* <Button
            size="large"
            style={{ backgroundColor: "#38a169", color: "#fff" }}
          >
            Login
          </Button> */}

          {user ? (
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-full bg-green-500 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-green-700 open:bg-green-500/90 focus:outline-white">
                {user?.avatar?.url ? (
                  <img
                    src={user?.avatar?.url}
                    alt="SariSariCart Logo"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserIcon className="w-8 h-8 p-1" />
                )}

                <span>{user.firstname + " " + user.lastname}</span>
                <ChevronDownIcon className="w-4 h-4 fill-white/60" />
              </MenuButton>
              <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <MenuItems
                  anchor="bottom end"
                  className="w-52 origin-top-right rounded-xl bg-green-500/90 p-1 text-sm text-white focus:outline-none mt-1"
                >
                  <MenuItem>
                    <a className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10" href="/profile">
                      <UserIcon className="w-4 h-4 fill-white/30" />
                      Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10">
                      <BsBoxSeamFill className="w-4 h-4 fill-white/30" />
                      My Orders
                    </button>
                  </MenuItem>
                  <div className="my-1 h-px bg-white/5" />
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10"
                      onClick={() => logoutHandler()}
                    >
                      <ArrowLeftStartOnRectangleIcon className="w-4 h-4 fill-white/30" />
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          ) : (
            <Button size="large" type="primary" href="/login" shape="round">
              Login
            </Button>
          )}
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
