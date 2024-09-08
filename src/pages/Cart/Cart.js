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

export default function Cart() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  // add quantity
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  // minus quantity
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  // remove product from cart
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      message.warning("Please login to checkout");
      navigate("/login");
    }
  };

  console.log(cartItems, "cart");

  return (
    <div className="flex flex-1 flex-col container mx-auto py-4 space-y-4">
      <div>
        <Breadcrumb
          items={[
            {
              title: <a href="">Home</a>,
            },
            {
              title: "Cart",
            },
          ]}
        />
      </div>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-6">
            <img src="./images/empty-cart-2.png" width={380} />

            <div className="flex flex-col justify-center items-center">
              <p className="text-xl font-bold text-green-500">
                Your cart is empty
              </p>
              <p className="">Add something to make me happy</p>
            </div>

            <Button type="primary" size="large" href="/">
              Back to Products
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <div className="w-9/12 col-span-2 bg-zinc-100 p-8 space-y-6">
            <div className="flex flex-1 flex-row gap-4">
              <div className="w-2/5 flex items-center justify-center">
                <p>Products</p>
              </div>

              <div className="w-1/6 flex items-center justify-center">
                <p>Price</p>
              </div>

              <div className="w-1/6 flex items-center justify-center">
                <p>Quantity</p>
              </div>

              <div className="w-1/6 flex items-center justify-center">
                <p>Total</p>
              </div>

              <div className="w-4 flex items-center justify-center"></div>
            </div>

            <Divider />

            {cartItems.map((item) => (
              <div className="flex flex-1 flex-row gap-4">
                <div className="w-2/5 flex flex-row gap-4">
                  <img
                    src={item.image}
                    alt={item.image}
                    className="h-24 w-24 rounded object-cover"
                  />

                  <div className="flex flex-col">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                    </div>

                    <div>
                      <p className="text-zinc-500 text-sm">
                        {item.category.name}
                      </p>
                    </div>

                    {/* <div>
                  <p className="text-zinc-500 text-sm">{item.description}</p>
                </div> */}
                  </div>
                </div>

                <div className="w-1/6 flex items-center justify-center">
                  <p>₱{item.price}</p>
                </div>

                <div className="w-1/6 flex flex-row items-center justify-center gap-2">
                  <a
                    className="cursor-pointer"
                    onClick={() =>
                      increaseQty(item.product, item.quantity, item.stock)
                    }
                  >
                    <PlusIcon color="#22c55e" className="w-4 h-4" />
                  </a>

                  {/* <Input
                  size="large"
                  className="w-20"
                  defaultValue={1}
                  min={1}
                  max={item.stock}
                  value={item.quantity}
                  // onChange={(value) => setQuantity(value)}
                /> */}

                  <div className="p-2 bg-white border">
                    <p>{item.quantity}</p>
                  </div>

                  <a
                    className="cursor-pointer"
                    onClick={() => decreaseQty(item.product, item.quantity)}
                  >
                    <MinusIcon color="#ef4444" className="w-4 h-4" />
                  </a>
                </div>

                <div className="w-1/6 flex items-center justify-center">
                  <p>₱{item.price}</p>
                </div>

                <a
                  className="w-4 flex items-center justify-center"
                  onClick={() => removeCartItemHandler(item.product)}
                >
                  <XMarkIcon color="#ef4444" />
                </a>
              </div>
            ))}

            <Divider />
          </div>

          <div className="w-3/12 bg-zinc-100 p-8 space-y-6 h-fit">
            <div>
              <p className="text-2xl font-semibold">Summary</p>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between items-center">
                <p>Total Products:</p>

                <p>
                  ₱
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </p>
              </div>

              <div className="flex flex-row justify-between items-center">
                <p>Subtotal Products:</p>

                <span>
                  {cartItems.reduce(
                    (acc, item) => acc + Number(item.quantity),
                    0
                  )}{" "}
                  (Items)
                </span>
              </div>

              <div className="flex flex-row justify-between items-center">
                <p>Shipping Costs:</p>

                <p>Free</p>
              </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between items-center">
                <p>Total Products:</p>

                <p>
                  ₱
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </p>
              </div>

              <Button
                type="primary"
                size="large"
                block
                onClick={() => checkoutHandler()}
              >
                CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
