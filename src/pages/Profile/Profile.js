import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import ProfileSidebar from "../../components/Sidebar/ProfileSidebar";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);

  const { user, isLogout } = useSelector((state) => state.auth);

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setPhone(user.phone);
      setAddress(user.address);
      setEmail(user.email);
    }

    if (isUpdated) {
      message.success("Profile Successfully Updated");
      dispatch(loadUser());
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [user, dispatch, error, isUpdated]);

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

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const fileProps = {
    name: "image",
    multiple: false,
    listType: "picture",
    fileList,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: () => false,
    onChange: (info) => {
      console.log(info, "info onchange");

      const file = info.fileList[0]?.originFileObj; // Get the actual File/Blob object

      console.log(file, "file onchange");
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setAvatar(e.target.result);
        };

        reader.readAsDataURL(file);

        setFileList(info.fileList); // Update fileList state
      }
    },
  };

  const updateHandler = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.set("firstname", firstname);
    formData.set("lastname", lastname);
    formData.set("address", address);
    formData.set("phone", phone);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    dispatch(updateProfile(formData));
  };

  return (
    <div className="flex flex-1 flex-col container mx-auto py-4">
      <div className="flex relative gap-6">
        <div className="sticky top-0">
          <ProfileSidebar />
        </div>

        <form className="flex flex-1 flex-col gap-4">
          <div>
            <p className="text-2xl">My Information</p>
          </div>

          <div className="flex-1 bg-zinc-100 p-8 space-y-4">
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
                  block
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
                  status={errors.firstname ? "error" : null}
                />
                {errors.lastname && (
                  <p className="text-red-500">{errors.lastname}</p>
                )}
              </div>
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

            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              {/* <div className="space-y-1">
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
              </div> */}
              <div className="space-y-1">
                <p>
                  Phone <span className="text-red-500">*</span>
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
                <p>Profile Avatar</p>

                <Upload {...fileProps} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-row justify-end">
            <Button size="large" type="primary" onClick={() => updateHandler()}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
