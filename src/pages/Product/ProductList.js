import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  Image,
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
  Popconfirm,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  createProduct,
  allProducts,
  singleProduct,
  updateProduct,
  clearErrors,
  resetUpdateProduct,
  deleteProduct,
  resetDeleteProduct,
} from "../../actions/productActions";
import TextArea from "antd/es/input/TextArea";
// import { UPDATE_CATEGORY_RESET } from "../../constants/productConstants";

export default function ProductList({ products, categories }) {
  const dispatch = useDispatch();

  //   const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { product, success: singleSuccess } = useSelector(
    (state) => state.singleProduct
  );

  const { updateSuccess, errorUpdate } = useSelector(
    (state) => state.updateProduct
  );

  const { errorDelete, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  useEffect(() => {
    if (singleSuccess) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      //   setImages(product.images[0]?.url);
      setCategory(product.category._id);
    }

    if (updateSuccess) {
      message.success("Product updated successfully");
      dispatch(allProducts());
      setIsModalOpen(false);
      setLoading(false);
      dispatch(resetUpdateProduct());
      setFileList([]);
    }

    if (isDeleted) {
      message.success("Product deleted successfully");
      dispatch(allProducts());
      dispatch(resetDeleteProduct());
    }
  }, [singleSuccess, product, updateSuccess, isDeleted, dispatch]);

  const showModal = (id) => {
    console.log(id, "modal id edit");
    setIsModalOpen(true);
    dispatch(singleProduct(id));
  };

  const handleOk = () => {
    updateHandler();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setImages(null);
    setErrors({});
    setName("");
    setFileList([]);
  };

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

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Product name is required";

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

  const updateHandler = () => {
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

    dispatch(updateProduct(product._id, formData));
    setLoading(true);
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const imagesBodyTemplate = (rowData) => {
    return (
      <Image
        src={rowData?.images[0]?.url}
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
          title="Delete the product"
          description="Are you sure to delete this product?"
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

  const categoryName = (value) => {
    return value.category.name;
  };

  const formatCurrency = (value) => {
    return value.price.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };

  return (
    <div className="bg-white rounded p-4">
      <Modal
        title="Create New Product"
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
                <span className="text-red-500 text-sm">{errors.price}</span>
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
                <span className="text-red-500 text-sm">{errors.stock}</span>
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
              <span className="text-red-500 text-sm">{errors.category}</span>
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
              <span className="text-red-500 text-sm">{errors.description}</span>
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
      <div className="card">
        <DataTable
          value={products}
          tableStyle={{ minWidth: "50rem" }}
          className="p-datatable-striped"
          stripedRows
          paginator
          rows={8}
          rowsPerPageOptions={[8, 25, 50]}
          emptyMessage="No products found."
        >
          {/* <Column field="_id" header="I.D"></Column> */}
          <Column
            field="name"
            header="Name"
            style={{ minWidth: "30rem" }}
          ></Column>
          <Column
            // className="font-semibold "
            field="category"
            header="Category"
            body={categoryName}
            // style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            className="font-semibold"
            field="price"
            header="Price"
            body={formatCurrency}
            // style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            className="font-semibold"
            field="stock"
            header="Stock"
            // style={{ minWidth: "10rem" }}
          ></Column>
          {/* <Column field="createdAt" header="Created At"></Column> */}
          <Column
            field="images"
            header="Image"
            body={imagesBodyTemplate}
            // style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
            // style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
