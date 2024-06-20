import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Divider } from "antd";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { TbCategory2 } from "react-icons/tb";
import { HiOutlinePresentationChartBar } from "react-icons/hi2";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { FaRegStar } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";

export default function ProfileSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isLogout } = useSelector((state) => state.auth);

  useEffect(() => {}, []);

  return (
    <div className="bg-zinc-100 sticky top-0 w-64 p-6">
      {loading ? null : (
        <div className="flex items-center gap-4  rounded-lg">
          <div className="flex flex-col">
            <div className="flex items-center flex-shrink-0 gap-3">
              <img
                src={user?.avatar?.url}
                alt="SariSariCart Logo"
                className="h-14 w-14 rounded-full"
              />

              <div className="flex flex-col">
                <span className="font-extrabold text-normal  tracking-normal">
                  <span className="text-green-500">
                    {user.firstname} {user.lastname}
                  </span>
                </span>
                <span className="text-xs">{user.email}</span>
              </div>
            </div>

            <Divider />

            <div className="space-y-4">
              <div className="hover:bg-green-500 hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                  <HiOutlinePresentationChartBar color="#0f172a" size={20} />

                  <span className="">Profile</span>
                </div>
              </div>

              <div className="hover:bg-green-500 hover:text-white py-2 px-3 rounded cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                  <LiaTruckLoadingSolid color="#0f172a" size={20} />

                  <span className="">My Orders</span>
                </div>
              </div>
            </div>

            {/* <Divider /> */}
          </div>
        </div>
      )}
    </div>
  );
}
