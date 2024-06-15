import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import Sidebar from "../../components/Navbar/Sidebar";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import {
  createCategory,
  allCategories,
  singleCategory,
  updateCategory,
  clearErrors,
  resetUpdateCategory,
} from "../../actions/categoryActions";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";

export default function Categories() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, error, success } = useSelector(
    (state) => state.createCategory
  );

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Category name is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // setIsModalOpen(false);
    createHandler();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fileProps = {
    name: "image",
    multiple: false,
    listType: "picture",
    beforeUpload: () => false,
    onChange: (info) => {
      if (info.file.status !== "uploading") {
        const file = info.file;
        const reader = new FileReader();

        reader.onload = (e) => {
          setImage(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    },
  };

  useEffect(() => {
    if (success) {
      message.success("Category created successfully");
      dispatch({ type: CREATE_CATEGORY_RESET });
      dispatch(allCategories());
      setIsModalOpen(false);
      setName("");
      setImage("");
    }

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [success, error, dispatch]);

  const createHandler = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
      console.log(formData);
    }

    dispatch(createCategory(formData));
  };

  return (
    <div className="flex relative bg-zinc-100">
      <div className="sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out">
        <div className="p-8 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl">Categories</p>

            <Button
              className="rounded bg-green-500 py-2 px-4 text-sm text-white data-[hover]:bg-green-400 data-[active]:bg-green-600"
              onClick={() => showModal()}
            >
              Create Category
            </Button>

            <Modal
              title="Create New Category"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="space-y-3 py-2">
                <div className="space-y-1">
                  <p>
                    Name <span className="text-red-500">*</span>
                  </p>
                  <Input
                    size="large"
                    type="text"
                    name="name"
                    variant="filled"
                    placeholder="Category Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    status={errors.name ? "error" : null}
                  />

                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <p>Upload Image</p>

                  <div>
                    <Upload {...fileProps} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </div>
                </div>
              </div>
            </Modal>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}
