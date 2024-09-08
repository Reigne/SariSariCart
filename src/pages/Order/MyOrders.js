import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../actions/orderActions";
import ProfileSidebar from "../../components/Sidebar/ProfileSidebar";
import moment from "moment";
import { Divider, Image } from "antd";

export default function MyOrders() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get orders, loading, and error from Redux store
  const { orders, loading, error } = useSelector((state) => state.myOrders);
  console.log("🚀 ~ MyOrders ~ orders:", orders);

  // Helper function to get the current query parameter
  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") || "all"; // Default to "all" if no tab is selected
  };

  // Function to navigate to a new tab
  const handleTabClick = (tab) => {
    navigate(`/my-orders?tab=${tab}`);
  };

  // Function to check if the tab is active
  const isActive = (tab) => getQuery() === tab;

  // Fetch orders based on the selected tab using Redux action
  useEffect(() => {
    const tab = getQuery();
    dispatch(getMyOrders(tab)); // Dispatch the action to fetch orders
  }, [dispatch, location.search]);

  return (
    <div className="flex flex-1 flex-col container mx-auto py-4">
      <div className="flex relative gap-6">
        <div className="sticky top-0">
          <ProfileSidebar />
        </div>

        <div className="w-full h-fit ">
          <div className="flex flex-row bg-zinc-100 sticky top-0 border-b">
            {/* Tabs */}
            <div
              onClick={() => handleTabClick("all")}
              className={`cursor-pointer w-1/6 flex items-center justify-center p-4 ${
                isActive("all")
                  ? "bg-green-500 text-white"
                  : "hover:bg-zinc-200"
              }`}
            >
              <p>All</p>
            </div>
            <div
              onClick={() => handleTabClick("pending")}
              className={`cursor-pointer w-1/6 flex items-center justify-center p-4 ${
                isActive("pending")
                  ? "bg-green-500 text-white"
                  : "hover:bg-zinc-200"
              }`}
            >
              <p>Pending</p>
            </div>
            <div
              onClick={() => handleTabClick("to-ship")}
              className={`cursor-pointer w-1/6 flex items-center justify-center p-4 ${
                isActive("to-ship")
                  ? "bg-green-500 text-white"
                  : "hover:bg-zinc-200"
              }`}
            >
              <p>To Ship</p>
            </div>
            <div
              onClick={() => handleTabClick("to-receive")}
              className={`cursor-pointer w-1/6 flex items-center justify-center p-4 ${
                isActive("to-receive")
                  ? "bg-green-500 text-white"
                  : "hover:bg-zinc-200"
              }`}
            >
              <p>To Receive</p>
            </div>
            <div
              onClick={() => handleTabClick("completed")}
              className={`cursor-pointer w-1/6 flex items-center justify-center p-4 ${
                isActive("completed")
                  ? "bg-green-500 text-white"
                  : "hover:bg-zinc-200"
              }`}
            >
              <p>Completed</p>
            </div>
            <div
              onClick={() => handleTabClick("cancelled")}
              className={`cursor-pointer w-1/6 flex items-center justify-center p-4 ${
                isActive("cancelled")
                  ? "bg-green-500 text-white"
                  : "hover:bg-zinc-200"
              }`}
            >
              <p>Cancelled</p>
            </div>
          </div>

          <div>
            {/* Orders Display */}
            <div className="w-full mt-6">
              {loading ? (
                <p>Loading orders...</p>
              ) : error ? (
                <p>{error}</p>
              ) : orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {orders.map((order) => {
                    // Get the latest status history
                    const latestStatus = order.statusHistory.sort(
                      (a, b) => new Date(b.changedAt) - new Date(a.changedAt)
                    )[0];

                    return (
                      <div key={order._id} className="">
                        <a
                          className="flex flex-col gap-2 p-4 bg-zinc-100 hover:bg-zinc-200"
                          href={`/order/${order._id}`}
                        >
                          <div className="flex flex-row justify-between items-center">
                            <p className="text-sm">
                              {/* Order Created */}
                              <span>
                                {moment(order.orderPlaced).format(
                                  "MMMM D, YYYY"
                                )}
                              </span>
                            </p>

                            <div className="flex flex-row items-center gap-2">
                              {/* Display the latest status comment */}

                              <div className="border-r px-2">
                                <p className="text-sm text-zinc-500">
                                  {latestStatus && latestStatus.comment}
                                </p>
                              </div>

                              <p className="text-green-500">
                                <p className="text-green-500">{order.status}</p>
                              </p>
                            </div>
                          </div>

                          <hr />

                          {order.items.map((item) => (
                            <a
                              key={item.product._id}
                              className="flex flex-1 flex-row items-start gap-3  p-2"
                              // href={`/product/${item.product._id}`}
                            >
                              <img
                                className="h-32 w-32 object-cover"
                                src={item.product.images[0].url}
                                alt={item.product.name}
                              />

                              <div className="flex flex-1 flex-row justify-between items-center">
                                <div className="flex flex-col gap-2">
                                  <p>{item.product.name}</p>
                                  <p className="text-sm text-zinc-500">
                                    {item.product.category.name}
                                  </p>
                                  <p>x{item.quantity}</p>
                                </div>

                                <div>
                                  <p className="text-sm text-green-500">
                                    ₱{item.price}
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))}

                          <div className="flex flex-row justify-end">
                            <p>
                              Total Order Price:
                              <span className="text-lg text-green-500 font-semibold">
                                ₱{order.totalAmount}
                              </span>
                            </p>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
