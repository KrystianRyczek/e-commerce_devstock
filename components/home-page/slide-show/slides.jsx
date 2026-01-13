"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import Arrow from "./svg/arrow";
import { imageLoader } from "@/util/image-loader";

export default function Slides({ slides }) {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  console.log("slides:", slides);
  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#f29145",
        "--swiper-pagination-color": "#f29145",
      }}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 10 * 1000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="slide-show-swiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex w-full h-full bg-slide-background items-center">
            <div className="flex flex-col gap-[24px] my-auto ml-[120px] z-10">
              <h2 className="text-32-44-500 text-slide-h">{slide.title}</h2>
              <p className="max-w-[443px] text-wrap text-16-26-400 text-slide-text">
                {slide.description}
              </p>
              <Link
                href={`/products?categories=["${slide.category.toLowerCase()}"]`}
                className="flex gap-[14px] text-16-26-400 border-[1px] border-slide-link text-slide-link w-[221px] h-[54px] px-[20px] py-[14px] rounded-[6px] hover:bg-slide-link hover:text-slide-link-hover transition"
              >
                <span>Explore Category</span>
                <Arrow />
              </Link>
            </div>
            <div className="w-[422px] h-[852px] ml-20 relative flex justify-center -rotate-35 bg-white shadow-slide-image-shadow">
              <Image
                loader={(config) => imageLoader(config, "")}
                src={slide.imgUrl}
                alt={`${slide.name} image`}
                fill
                priority
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="autoplay-progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
}
