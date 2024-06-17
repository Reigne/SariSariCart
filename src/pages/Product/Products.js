import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Button,
  Upload,
  message,
  Select,
} from "antd";
import Swal from "sweetalert2";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import Sidebar from "../../components/Navbar/Sidebar";
import {
  allProducts,
  createProduct,
  resetUpdateProduct,
  updateProduct,
} from "../../actions/productActions";
import { allCategories, clearErrors } from "../../actions/categoryActions";
import ProductList from "./ProductList";

export default function Products() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { error, success, products } = useSelector((state) => state.products);

  const {
    error: categoryError,
    success: categorySuccess,
    categories,
  } = useSelector((state) => state.categories);

  const {
    error: createError,
    loading: createLoading,
    success: createSuccess,
  } = useSelector((state) => state.createProduct);

  useEffect(() => {
    dispatch(allCategories());
    dispatch(allProducts());

    if (createSuccess) {
      message.success("Product created successfully");
      setLoading(false);
      setFileList([]);
      setName("");
      setPrice("");
      setStock("");
      setImages([]);
      setDescription("");
      setIsModalOpen(false);
    }

    if (createError) {
      message.error(createError);
      setLoading(false);
    }
  }, [createSuccess, dispatch]);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const onChangeCategory = (value) => {
    setCategory(value);
    console.log(`selected category ${value}`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    createHandler();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
  };

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!price) errors.price = "Price is required";
    if (!description) errors.description = "Description is required";
    if (!stock) errors.stock = "Stock is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const fileProps = {
    name: "image",
    multiple: true,
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
          setImages((prevImages) => [...prevImages, e.target.result]);
        };

        reader.readAsDataURL(file);

        setFileList(info.fileList); // Update fileList state
      }
    },
  };

  const createHandler = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    setLoading(true);
    dispatch(createProduct(formData));
  };

  return (
    <div className="flex relative bg-zinc-100">
      <div className="sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out">
        <div className="p-8 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <p className="text-2xl">Products</p>

            <Button
              // className="rounded bg-green-500 py-2 px-4 text-sm text-white data-[hover]:bg-green-400 data-[active]:bg-green-600"
              type="primary"
              size="large"
              onClick={() => showModal()}
            >
              + Create Product
            </Button>

            <Modal
              title="Create New Product"
              open={isModalOpen}
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
                    placeholder="Product Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    status={errors.name ? "error" : null}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 grid-rows-1 gap-4">
                  <div className="space-y-1">
                    <p>
                      Price <span className="text-red-500">*</span>
                    </p>
                    <InputNumber
                      // prefix="₱"
                      formatter={(value) =>
                        `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\₱\s?|(,*)/g, "")}
                      name="price"
                      variant="filled"
                      size="large"
                      min={0}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Product Price"
                      onChange={(value) => setPrice(value)}
                      value={price}
                      status={errors.price ? "error" : null}
                    />
                    {errors.price && (
                      <span className="text-red-500 text-sm">
                        {errors.price}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p>
                      Stock <span className="text-red-500">*</span>
                    </p>
                    <InputNumber
                      name="stock"
                      variant="filled"
                      size="large"
                      min={0}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Product Stock"
                      onChange={(value) => setStock(value)}
                      value={stock}
                      status={errors.stock ? "error" : null}
                    />
                    {errors.stock && (
                      <span className="text-red-500 text-sm">
                        {errors.stock}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <p>
                    Select Category <span className="text-red-500">*</span>
                  </p>
                  {/* <Input
                    name="category"
                    variant="filled"
                    size="large"
                    placeholder="Product Category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    status={errors.category ? "error" : null}
                  /> */}
                  <Select
                    showSearch
                    placeholder="Select category"
                    optionFilterProp="children"
                    onChange={onChangeCategory}
                    // onSearch={onSearch}
                    filterOption={filterOption}
                    options={categoryOptions}
                    value={category}
                    style={{ width: "100%" }}
                    variant="filled"
                    size="large"
                    status={errors.category ? "error" : null}
                  />
                  {errors.category && (
                    <span className="text-red-500 text-sm">
                      {errors.category}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <p>
                    Description <span className="text-red-500">*</span>
                  </p>
                  <TextArea
                    name="description"
                    variant="filled"
                    size="large"
                    rows={4}
                    placeholder="Product Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    status={errors.description ? "error" : null}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm">
                      {errors.description}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="mb-1">Product Images</p>
                  <Upload
                    {...fileProps}
                    maxCount={10}
                    // onChange={() => onChange()}
                    // type="file"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </div>
              </div>
            </Modal>
          </div>

          <div>
            <ProductList products={products} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
