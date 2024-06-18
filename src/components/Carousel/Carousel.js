import React from "react";
import { Carousel } from "antd";

export default function CarouselProduct() {
  const contentStyle = {
    height: "500px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#22c55e",
  };

  return (
    <Carousel autoplay arrows>
      <div>
        <video
          style={contentStyle}
          src="/videos/sarisaricart_video.mp4"
          autoPlay
          loop
          muted
        />
      </div>
      {/* <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div> */}
    </Carousel>
  );
}
