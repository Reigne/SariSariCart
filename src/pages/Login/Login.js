import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Input, message } from "antd";

export default function Login() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col shadow-lg w-[30rem] bg-white p-8">
          <form className="space-y-8">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-4xl font-extrabold text-green-500">Sign In</p>

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
              <Button
                size="large"
                block
                style={{ backgroundColor: "#22c55e", color: "#fff" }}
              >
                Login
              </Button>

              <p className="text-sm">Don't Have Account? <a className="text-green-500" href="">Sign Up</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
