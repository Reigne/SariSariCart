import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { Avatar, Button, Divider, Image } from "antd";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
// import { Link as RouterLink, useLocation } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { TbCategory2 } from "react-icons/tb";
import { HiOutlinePresentationChartBar } from "react-icons/hi2";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { FaRegStar } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { UserIcon } from "@heroicons/react/16/solid";
import { FaRegUser } from "react-icons/fa6";
import { SlUser } from "react-icons/sl";

export default function ProfileSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading, isLogout } = useSelector((state) => state.auth);

  useEffect(() => {}, []);

  const getCurrentPath = () => {
    return location.pathname.split("/")[1];
  };

  return (
    <div className="bg-zinc-100 sticky top-0 w-[20rem] p-6">
      {loading ? null : (
        <div className="flex-1 items-center gap-4 rounded-lg">
          <div className="flex-1 flex-col">
            <div className="flex flex-col items-center flex-shrink-0 gap-3">
              <Image
                src={user?.avatar?.url}
                alt="SariSariCart Logo"
                className="h-22 w-22 rounded-full"
                width={175}
              />

              <div className="flex flex-col items-center">
                <span className="font-extrabold text-normal tracking-normal text-xl">
                  <span className="text-green-500">
                    {user.firstname} {user.lastname}
                  </span>
                </span>
                <span className="text-normal">{user.email}</span>
              </div>
            </div>

            <Divider />

            <div className="space-y-4">
              <a
                className={`${
                  getCurrentPath() === "profile"
                    ? "bg-green-500 text-white"
                    : ""
                } hover:bg-green-500 hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center`}
                href="/profile"
              >
                <div className="flex items-center gap-4">
                  <SlUser
                    color={`${
                      getCurrentPath() === "profile" ? "white" : "#0f172a"
                    }`}
                    size={20}
                  />

                  <span className="">Profile</span>
                </div>
              </a>

              <a
                className={`${
                  getCurrentPath() === "my-orders"
                    ? "bg-green-500 text-white"
                    : ""
                } hover:bg-green-500 hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center`}
                href="/my-orders"
              >
                <div className="flex items-center gap-4">
                  <LiaTruckLoadingSolid
                    color={`${
                      getCurrentPath() === "my-orders" ? "white" : "#0f172a"
                    }`}
                    size={20}
                  />

                  <span className="">My Orders</span>
                </div>
              </a>
            </div>

            {/* <Divider /> */}
          </div>
        </div>
      )}
    </div>
  );
}
