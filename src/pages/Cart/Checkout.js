import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearCart,
  removeItemFromCart,
} from "../../actions/cartActions";
import { createOrder } from "../../actions/orderActions";

import {
  Breadcrumb,
  Button,
  Divider,
  Input,
  InputNumber,
  message,
  Radio,
} from "antd";

export default function Checkout() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [errors, setErrors] = useState({});

  const { cartItems } = useSelector((state) => state.cart);
  const { loading, order, error, orderSuccess } = useSelector(
    (state) => state.newOrder
  ); // From newOrderReducer

  const validateForm = () => {
    let errors = {};

    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";

    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Invalid email address";
      }
    }

    if (!mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else {
      const mobilePattern = /^[0-9]{10,15}$/; // Adjust the regex according to your phone format
      if (!mobilePattern.test(mobileNumber)) {
        errors.mobileNumber = "Invalid mobile number";
      }
    }

    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!postalCode) errors.postalCode = "Postal code is required";
    // if (!paymentMethod) errors.paymentMethod = "Payment method is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const placeOrderHandler = () => {
    if (!validateForm()) {
      return;
    }

    // Create the order data payload
    const orderData = {
      deliveryInformation: {
        firstName,
        lastName,
        email,
        mobileNumber,
        address,
        city,
        postalCode,
      },
      paymentMethod,
      items: cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    console.log(orderData, "formdata");

    // Dispatch the createOrder action
    dispatch(createOrder(orderData));
  };

  // useEffect to track order success or failure
  useEffect(() => {
    if (orderSuccess) {
      dispatch(clearCart());
      localStorage.removeItem("cartItems"); // Clear cart items from localStorage
      message.success("Order placed successfully!");
      navigate("/order-success");
    }

    if (error) {
      message.error("Order placed unsuccessfully"); // Display error message
      console.log("error:", error);
    }
  }, [orderSuccess, error, navigate]);

  return (
    <div className="container mx-auto py-8 h-full">
      <div className="flex flex-row gap-4 h-full">
        <div className="w-3/5 space-y-8">
          <div className="space-y-2">
            <p>Delivery Information</p>
            {/* <div className="bg-zinc-100 p-8 space-y-6">
              <div className="grid grid-cols-2 grid-rows-1 gap-4">
                <div className="space-y-1">
                  <p>Name</p>
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    type="email"
                    name="name"
                  />
                </div>

                <div className="space-y-1">
                  <p>Mobile Number</p>
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    type="text"
                    name="phone"
                  />
                </div>
              </div>

              <div className="">
                <div className="space-y-1">
                  <p>Email</p>
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    type="email"
                    name="email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 grid-rows-1 gap-4">
                <div className="space-y-1">
                  <p>City</p>
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    type="text"
                    name="city"
                  />
                </div>

                <div className="space-y-1">
                  <p>Postal Code</p>
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    type="text"
                    name="postal"
                  />
                </div>
              </div>
            </div> */}

            <div className="bg-zinc-100 p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p>First Name</p>
                  <Input
                    placeholder="Enter your first name"
                    size="large"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="filled"
                    status={errors.firstName ? "error" : null}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <p>
                    Last Name <span className="text-red-500">*</span>
                  </p>
                  <Input
                    placeholder="Enter your last name"
                    size="large"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="filled"
                    status={errors.lastName ? "error" : null}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <div className="space-y-1">
                    <p>Email</p>
                    <Input
                      placeholder="Enter your email"
                      size="large"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="filled"
                      status={errors.email ? "error" : null}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1 ">
                  <p>Mobile Number</p>
                  <Input
                    placeholder="Enter your mobile number"
                    size="large"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    variant="filled"
                    status={errors.mobileNumber ? "error" : null}
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <p>Address</p>
                <Input
                  placeholder="Enter your address"
                  size="large"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="filled"
                  status={errors.address ? "error" : null}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>

              <div className="space-y-1">
                <p>City</p>
                <Input
                  placeholder="Enter your city"
                  size="large"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  variant="filled"
                  status={errors.city ? "error" : null}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>

              <div className="space-y-1">
                <p>Postal Code</p>
                <Input
                  placeholder="Enter your postal code"
                  size="large"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  variant="filled"
                  status={errors.postalCode ? "error" : null}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm">{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p>Payment Method</p>
            <div className="bg-zinc-100 p-8 space-y-6">
              <Radio.Group
                size="large"
                className="flex flex-row gap-12"
                onChange={(e) => setPaymentMethod(e.target.value)}
                // onChange={handlePaymentChange} // Handle payment method change
                value={paymentMethod} // Bind to the paymentMethod state
              >
                <Radio value="Cash on Delivery">Cash on Delivery</Radio>
                <Radio value="GCash">GCash</Radio>
                <Radio value="Paymaya">Paymaya</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="w-2/5 space-y-2 ">
          <p>Order Summary</p>
          <div className="bg-zinc-100 p-4 flex flex-col">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-1 flex-row gap-4">
                <div className="w-2/4 flex items-center justify-center">
                  <p>Products</p>
                </div>

                <div className="w-1/4 flex items-center justify-center">
                  <p>Quantity</p>
                </div>

                <div className="w-1/4 flex items-center justify-center">
                  <p>Total</p>
                </div>
              </div>

              <Divider />

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div className="flex flex-row gap-4">
                    <div className="w-2/4 flex flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.image}
                        className="h-24 w-24 rounded object-cover"
                      />

                      <div className="flex flex-col space-y-1">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-sm">
                            {item.category.name}
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold">
                            ₱{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-1/4 flex items-center justify-center">
                      <p>{item.quantity}</p>
                    </div>

                    <div className="w-1/4 flex items-center justify-center">
                      <p>₱{(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <p className="text-lg font-bold">Price Summary</p> */}

            <Divider />

            <div className="space-y-4">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p>Total Price</p>
                </div>

                <div className="font-semibold">
                  <p>
                    ₱
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  size="large"
                  variant=""
                  type="primary"
                  block
                  onClick={() => placeOrderHandler()}
                >
                  Place Order
                </Button>

                <Button type="text" block>
                  Go back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
