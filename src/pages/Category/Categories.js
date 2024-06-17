import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import Sidebar from "../../components/Navbar/Sidebar";
import { Button, Input, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  createCategory,
  allCategories,
  clearErrors,
} from "../../actions/categoryActions";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import CategoryList from "./CategoryList";

export default function Categories() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const {
    error: categoryError,
    success: categorySuccess,
    categories,
  } = useSelector((state) => state.categories);

  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = useSelector((state) => state.createCategory);

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
    createHandler();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // Reset image state
    setImage(null);
    // Clear form errors
    setErrors({});
    // Clear name field
    setName("");
    setFileList([]);
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
      console.log(info, "info onchange")

      const file = info.fileList[0]?.originFileObj; // Get the actual File/Blob object

      console.log(file, "file onchange")
      if (file) {

        const reader = new FileReader();

        reader.onload = (e) => {
          setImage(e.target.result);
        };

        reader.readAsDataURL(file);

        setFileList(info.fileList); // Update fileList state
      }
    },
  };

  useEffect(() => {
    dispatch(allCategories());

    if (createSuccess) {
      message.success("Category created successfully");
      dispatch({ type: CREATE_CATEGORY_RESET });
      dispatch(allCategories());
      setLoading(false);
      setIsModalOpen(false);

      // Reset image state
      setImage(null);
      // Clear form errors
      setErrors({});
      // Clear name field
      setName("");
      setFileList([]);
    }

    if (createError) {
      message.error(createError);
      dispatch(clearErrors());
      setLoading(false);
    }
  }, [createSuccess, createError, dispatch]);

  const createHandler = () => {
    if (!validateForm()) {
      return;
    }

    console.log("image create", image);

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }

    setLoading(true);
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

            <Button type="primary" onClick={() => showModal()}>
              Create Category
            </Button>

            <Modal
              title="Create New Category"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              confirmLoading={loading}
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

          <div>
            <CategoryList categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
