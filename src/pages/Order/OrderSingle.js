import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions/orderActions";
import ProfileSidebar from "../../components/Sidebar/ProfileSidebar";
import moment from "moment";

export default function OrderSingle() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [latestStatus, setLatestStatus] = useState(null);

  const { id } = useParams();

  const { order, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading && order && order.statusHistory?.length > 0) {
      const latest = order.statusHistory.sort(
        (a, b) => new Date(b.changedAt) - new Date(a.changedAt)
      )[0];
      setLatestStatus(latest);
    }
  }, [loading, order]);

  return (
    <div className="flex flex-1 flex-col container mx-auto py-4">
      <div className="flex relative gap-6">
        <div className="sticky top-0">
          <ProfileSidebar />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full h-fit space-y-2">
            <div className="flex flex-row justify-between items-center bg-zinc-100 p-2">
              <div></div>
              <div className="flex flex-row items-center gap-2 ">
                <div className="border-r px-2">
                  <p className="text-sm text-zinc-500">
                    {order?.orderId || ""}
                  </p>
                </div>
                <p className="text-green-500">
                  {order && <p className="text-green-500">{order.status}</p>}
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <div className="w-2/5 bg-zinc-100 p-4 space-y-4">
                <div className="flex flex-col gap-1">
                  <p className="text-lg">Delivery Address</p>
                  <p className="text-zinc-500 text-xs">
                    The address provided by the recipient for delivering this
                    order. Ensure all details are correct for smooth delivery.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-2">
                    <div className="w-1/4">
                      <p className="text-sm">Recipient name: </p>
                    </div>
                    <div className="w-3/4 flex justify-end">
                      <p>
                        {order?.deliveryInformation?.firstName || ""}{" "}
                        {order?.deliveryInformation?.lastName || ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2">
                    <div className="w-1/4">
                      <p className="text-sm">Email: </p>
                    </div>
                    <div className="w-3/4 flex justify-end">
                      <p>{order?.deliveryInformation?.email || ""}</p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2">
                    <div className="w-1/4">
                      <p className="text-sm">Address: </p>
                    </div>
                    <div className="w-3/4 flex justify-end">
                      <p>
                        {order?.deliveryInformation?.address || ""},{" "}
                        {order?.deliveryInformation?.city || ""},{" "}
                        {order?.deliveryInformation?.postalCode || ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-2">
                    <div className="w-1/4">
                      <p className="text-sm">Mobile Number: </p>
                    </div>
                    <div className="w-3/4 flex justify-end">
                      <p>{order?.deliveryInformation?.mobileNumber || ""}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-3/5 bg-zinc-100 p-2"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
