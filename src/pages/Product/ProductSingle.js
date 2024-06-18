import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProduct } from "../../actions/productActions";
import {
  Breadcrumb,
  Button,
  Divider,
  Input,
  InputNumber,
  Rate,
  Spin,
  Carousel,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function ProductSingle() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.singleProduct
  );

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = React.useRef(null);

  useEffect(() => {
    dispatch(singleProduct(id));
  }, [dispatch, id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const settings = {
    arrowSize: 16,
    autoplay: true,
    arrows: true,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const handleThumbnailClick = (index) => {
    setActiveSlide(index);
    carouselRef.current.goTo(index);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/5">
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <Carousel className="bg-zinc-100" {...settings} ref={carouselRef}>
                {product.images?.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={`Product ${index}`}
                      className="w-full object-contain h-[40rem]"
                    />
                  </div>
                ))}
              </Carousel>
              <div className="thumbnail-list mt-4 flex gap-2 overflow-x-auto">
                {product.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`border-2 ${
                      activeSlide === index ? "border-green-500" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index}`}
                      className="w-16 h-16 object-cover border-2 border-gray-300"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="space-y-4 w-full lg:w-3/5">
          <p className="text-sm text-zinc-500">{product.category?.name}</p>

          <div className="space-y-2">
            <p className="text-4xl font-bold">{product.name}</p>
          </div>

          <div className="flex gap-2 items-center">
            <div>
              <Rate
                disabled
                defaultValue={product.ratings}
                style={{ fontSize: 20 }}
              />
            </div>

            <p className="text-zinc-500 text-sm">
              ({product.reviews?.length} reviews)
            </p>
          </div>

          <div className="">
            <p className="font-semibold text-zinc-600">Description</p>
            <p className="text-zinc-600">{product.description}</p>
          </div>


          <div>
            <p className="text-3xl text-red-500 font-semibold">
              {formatPrice(product?.price)}
            </p>
          </div>

          <div className="flex gap-4">
            <InputNumber
              size="large"
              className="w-20"
              defaultValue={1}
              min={1}
              max={product.stock}
            />

            <Button size="large" type="primary" className="font-semibold">
              ADD TO CART
            </Button>
          </div>

          <Divider />

          {/* <div className="space-y-2">
            <p className="text-zinc-600">
              <span className="font-semibold">Category:</span>{" "}
              {product.category?.name}
            </p>
            <p className="text-zinc-600">
              <span className="font-semibold">Brand:</span>{" "}
              {product.brand?.name}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
