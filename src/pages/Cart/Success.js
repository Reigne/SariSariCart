import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import { Breadcrumb, Button, Divider, Input, InputNumber, message } from "antd";
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { TbShoppingCartOff } from "react-icons/tb";

export default function Success() {
  return (
    <div className="flex flex-1 flex-col container mx-auto py-4 space-y-4">
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-6">
          <img src="./images/success.png" width={350} />

          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-2xl font-extrabold text-green-500">
              Success Order
            </p>
            <p className="">Your order is complete! Thank you for shopping with us.</p>
          </div>

          <Button type="primary" size="large" href="/">
            Back to Products
          </Button>
        </div>
      </div>
    </div>
  );
}
