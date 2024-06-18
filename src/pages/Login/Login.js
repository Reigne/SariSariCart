import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Input, message } from "antd";

export default function Login() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-wrap container items-center bg-white p-8 gap-14">
          <div>
            <img
              src="/images/sarisaricart_logo.jpg"
              alt="SariSariCart Logo"
              className="h-[32em] w-[32rem]"
            />
          </div>
          <form className="space-y-8 min-w-[30rem] sm:p-0 p-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-6xl font-extrabold text-green-500">
                SariSariCart
              </p>

              <span className="">Login for hassle-free grocery shopping.</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>
                  Email <span className="text-red-500">*</span>
                </p>
                <Input size="large" />
              </div>

              <div className="space-y-1">
                <p>
                  Password <span className="text-red-500">*</span>
                </p>
                <Input.Password size="large" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button type="primary" size="large" block>
                Login
              </Button>

              <p className="text-sm">
                Don't Have Account?{" "}
                <a className="text-green-500" href="/signup">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
