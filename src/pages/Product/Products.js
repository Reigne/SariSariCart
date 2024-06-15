import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import Sidebar from "../../components/Navbar/Sidebar";
import { Button } from "@headlessui/react";
import { Form, Input, InputNumber, Modal, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex relative bg-zinc-100">
      <div className="sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out">
        <div className="p-8 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl">Products</p>

            <Button
              className="rounded bg-green-500 py-2 px-4 text-sm text-white data-[hover]:bg-green-400 data-[active]:bg-green-600"
              onClick={() => showModal()}
            >
              Create Product
            </Button>

            <Modal
              title="Create New Product"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="space-y-3 py-2">
                <div className="space-y-1">
                  <p>
                    Name <span className="text-red-500">*</span>
                  </p>
                  <Input size="large" placeholder="Product Name" />
                </div>

                <div className="grid grid-cols-2 grid-rows-1 gap-4">
                  <div className="space-y-1">
                    <p>
                      Price <span className="text-red-500">*</span>
                    </p>
                    <InputNumber
                      size="large"
                      min={0}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Product Price"
                    />
                  </div>

                  <div className="space-y-1">
                    <p>
                      Stock <span className="text-red-500">*</span>
                    </p>
                    <InputNumber
                      size="large"
                      min={0}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Product Stock"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <p>
                    Select Category <span className="text-red-500">*</span>
                  </p>
                  <Input size="large" placeholder="Product Category" />
                </div>

                <div className="space-y-1">
                  <p>
                    Description <span className="text-red-500">*</span>
                  </p>
                  <TextArea
                    size="large"
                    rows={4}
                    placeholder="Product Description"
                  />
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
