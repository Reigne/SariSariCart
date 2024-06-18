import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, clearErrors } from "../../actions/userActions";
import { Bounce, toast } from "react-toastify";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { loading, error, success } = useSelector((state) => state.register);

  useEffect(() => {
    if (success) {
      dispatch(clearErrors());
      navigate("/login");
      
      message.success("Registration successful!");
    }

    if (error) {
      message.error(error);
    }
  }, [loading, error, success, dispatch]);

  const validateForm = () => {
    let errors = {};

    if (!firstname) errors.firstname = "First name is required";
    if (!lastname) errors.lastname = "Last name is required";

    if (!phone) {
      errors.phone = "Phone number is required";
    } else {
      const phonePattern = /^[0-9]{10,15}$/; // Adjust the regex according to your phone format
      if (!phonePattern.test(phone)) {
        errors.phone = "Invalid phone number";
      }
    }

    if (!address) errors.address = "Address is required";

    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Invalid email address";
      }
    }

    if (!password) errors.password = "Password is required";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const registerHandler = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.set("firstname", firstname);
    formData.set("lastname", lastname);
    formData.set("address", address);
    formData.set("phone", phone);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(register(formData));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-wrap container items-center bg-white p-8 gap-8">
          <form className="space-y-8 min-w-[30rem] sm:p-0 p-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-6xl font-extrabold text-green-500">
                SariSariCart
              </p>
              <span className="text-center">
                “Join SariSariCart and have fresh flavors delivered to your
                home!”
              </span>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 grid-rows-1 gap-4">
                <div className="space-y-1">
                  <p>
                    First Name <span className="text-red-500">*</span>
                  </p>
                  <Input
                    size="large"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    variant="filled"
                    status={errors.firstname ? "error" : null}
                  />
                  {errors.firstname && (
                    <p className="text-red-500">{errors.firstname}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <p>
                    Last Name <span className="text-red-500">*</span>
                  </p>
                  <Input
                    size="large"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    variant="filled"
                    status={errors.lastname ? "error" : null}
                  />
                  {errors.lastname && (
                    <p className="text-red-500">{errors.lastname}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <p>
                  Phone Number <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  variant="filled"
                  status={errors.phone ? "error" : null}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
              <div className="space-y-1">
                <p>
                  Address <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="filled"
                  status={errors.address ? "error" : null}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>
              <div className="space-y-1">
                <p>
                  Email <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="filled"
                  status={errors.email ? "error" : null}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-1">
                <p>
                  Password <span className="text-red-500">*</span>
                </p>
                <Input.Password
                  size="large"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                  status={errors.password ? "error" : null}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="space-y-1">
                <p>
                  Confirm Password <span className="text-red-500">*</span>
                </p>
                <Input.Password
                  size="large"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="filled"
                  status={errors.confirmPassword ? "error" : null}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                size="large"
                block
                onClick={registerHandler}
                loading={loading}
              >
                Sign Up
              </Button>
              <p className="text-sm">
                Have an account?{" "}
                <a className="text-green-500" href="/login">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
