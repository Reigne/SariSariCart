import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Image, Button, Input, Modal, Upload, message, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  createCategory,
  allCategories,
  singleCategory,
  updateCategory,
  clearErrors,
  resetUpdateCategory,
  deleteCategory,
  resetDeleteCategory,
} from "../../actions/categoryActions";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";

export default function CategoryList({ categories }) {
  const dispatch = useDispatch();

  //   const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { category, success: singleSuccess } = useSelector(
    (state) => state.singleCategory
  );

  const { updateSuccess, errorUpdate } = useSelector(
    (state) => state.updateCategory
  );

  const { errorDelete, isDeleted } = useSelector(
    (state) => state.deleteCategory
  );

  useEffect(() => {
    if (singleSuccess) {
      setName(category.name);
      setImage(category.image.url);
    }

    if (updateSuccess) {
      message.success("Category updated successfully");
      dispatch(allCategories());
      setIsModalOpen(false);
      setLoading(false);
      dispatch({ type: UPDATE_CATEGORY_RESET });
      setFileList([]);
    }

    if (isDeleted) {
      message.success("Category deleted successfully");
      dispatch(allCategories());
      dispatch(resetDeleteCategory());
    }
  }, [singleSuccess, category, updateSuccess, isDeleted, dispatch]);

  const showModal = (id) => {
    setIsModalOpen(true);
    dispatch(singleCategory(id));
  };

  const handleOk = () => {
    updateHandler();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setImage(null);
    setErrors({});
    setName("");
    setFileList([]);
  };

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Category name is required";

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
          setImage(e.target.result);
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
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
      console.log(formData);
    }

    dispatch(updateCategory(category._id, formData));
    setLoading(true);
  };


  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <Image
        src={rowData?.image?.url}
        alt={rowData.name}
        className="rounded"
        style={{ width: "50px", height: "auto" }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row gap-2">
        <Button type="primary" onClick={() => showModal(rowData._id)}>
          Edit
        </Button>

        <Popconfirm
          title="Delete the category"
          description="Are you sure to delete this category?"
          onConfirm={() => deleteHandler(rowData._id)}
          // onCancel={cancel}
          okText="Delete it"
          cancelText="No"
        >
          <Button
            danger
            // onClick={() => deleteHandler(rowData._id)}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <div className="bg-white rounded p-4">
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
      <div className="card">
        <DataTable
          value={categories}
          tableStyle={{ minWidth: "50rem" }}
          className="p-datatable-striped"
          stripedRows
          paginator
          rows={8}
          rowsPerPageOptions={[8, 25, 50]}
          emptyMessage="No categories found."
        >
          {/* <Column field="_id" header="I.D"></Column> */}
          <Column
            field="name"
            header="Name"
            style={{ minWidth: "30rem" }}
          ></Column>
          {/* <Column field="createdAt" header="Created At"></Column> */}
          <Column
            field="image"
            header="Image"
            body={imageBodyTemplate}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
