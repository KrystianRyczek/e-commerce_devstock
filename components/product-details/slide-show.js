"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SwipperImageContainer from "./common-components/swipper-image-container";

export default function SlideShow({ imagesArray }) {
  
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imagesArray.map((image, index) => (
          <SwiperSlide key={index}>
            <SwipperImageContainer
              url={image.url}
              alt={`Slide img`}
              transformation="e_upscale/c_limit,h_317,w_398"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imagesArray.map((image, index) => (
          <SwiperSlide key={index}>
            <SwipperImageContainer
              url={image.url}
              alt={`Slide img`}
              transformation="e_upscale/c_limit,h_99,w_130"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
