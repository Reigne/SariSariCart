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

export default function Checkout() {
  return (
    <div className="container mx-auto py-8 h-full">
      <div className="flex flex-row gap-4 h-full">
        <div className="w-4/6 space-y-2">
          <p>Delivery Information</p>
          <div className="bg-zinc-100 p-4">
            <div>
                <p></p>
            </div>
          </div>
        </div>
        <div className="w-4/12 space-y-2">
          <p>Order Summary</p>
          <div className="bg-zinc-100 p-4"></div>
        </div>
      </div>
    </div>
  );
}
