import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import slider1 from "../../assets/home/slide1.jpg";
import slider2 from "../../assets/home/slide2.jpg";
import slider3 from "../../assets/home/slide3.jpg";
import slider4 from "../../assets/home/slide4.jpg";
import slider5 from "../../assets/home/slide5.jpg";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <div className=" container mx-auto">
      <section>
        <SectionTitle
          heading={"ORDER ONLINE"}
          subHeading={"---From 11:00am to 10:00pm---"}
        ></SectionTitle>
        <Swiper
          slidesPerView={5}
          spaceBetween={20}
          //   centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper my-10"
        >
          <SwiperSlide>
            <img src={slider1} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-12 text-white">
              Salads
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider2} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-12 text-white">
              pizzas
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider3} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-12 text-white">
              soups
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider4} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-12 text-white">
              Salads
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider5} alt="" />
            <h3 className="text-4xl uppercase text-center -mt-12 text-white">
              Salads
            </h3>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default Category;
