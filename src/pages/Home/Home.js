import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allProducts,
  clearErrors,
  singleProduct,
} from "../../actions/productActions";
import {
  Button,
  Image,
  message,
  Divider,
  Form,
  Radio,
  Skeleton,
  Space,
  Switch,
  Rate,
} from "antd";
import CarouselProduct from "../../components/Carousel/Carousel";

export default function Home() {
  const dispatch = useDispatch();

  const { error, loading, success, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(allProducts());

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="container mx-auto py-4">
      <div>
        <CarouselProduct />

        <div className="">
          {loading ? null : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid-rows-auto gap-4 py-8">
              {products?.map((product) => (
                <a
                  key={product._id}
                  className="w-full bg-white transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 shadow-2xl hover:border border-green-500 hover:shadow-green-500"
                  href={`/product/${product._id}`}
                >
                  <div className="p-2">
                    <img
                      src={
                        product?.images[0]?.url || "/images/product-default.png"
                      }
                      alt={product.name}
                      className="object-cover  w-full  h-[18rem] rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-2 p-3">
                    <p className="font-semibold">{product.name}</p>
                    <div className="h-10">
                      <p className="text-sm font-light text-pretty line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex ">
                      <p className="font-semibold text-green-500">
                        {formatPrice(product?.price)}
                      </p>
                    </div>

                    <Divider />

                    <div className="flex gap-2 items-center">
                      <div>
                        <Rate
                          disabled
                          defaultValue={product.ratings}
                          style={{ fontSize: 16 }}
                        />
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs">
                          ({product?.reviews?.length})
                        </p>
                      </div>
                    </div>

                    <div>
                      <Button type="primary" size="large" block>
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
