import React from "react";
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

// Use relative path to ensure lib is found
import { plans } from "../../../lib/data/plans";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        {/* Header Section */}
        <Box className={"events-text"}>
          <span className={"category-title"}>Exclusive Exhibitions</span>
          <div className="luxury-underline"></div>
        </Box>

        {/* The Slider */}
        <Swiper
          className={"events-info swiper-wrapper"}
          slidesPerView={3}
          spaceBetween={30} // Adds breathing room between watch frames
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
        >
          {plans.map((value, number) => {
            return (
              <SwiperSlide key={number} className={"events-info-frame"}>
                <div className={"events-img-wrapper"}>
                  <img src={value.img} className={"events-img"} alt={value.title} />
                  
                  {/* Luxury Floating Overlay */}
                  <div className={"luxury-details-overlay"}>
                    <div className="event-label">Limited Edition</div>
                    <h3 className="event-luxury-title">{value.title}</h3>
                    <div className="event-author-gold">Curated by {value.author}</div>
                    
                    <p className="event-luxury-desc">{value.desc}</p>
                    
                    <div className="event-meta-info">
                      <div className="meta-item">
                        <img src={"/icons/calendar.svg"} alt="" style={{ filter: 'invert(1)' }} />
                        <span>{value.date}</span>
                      </div>
                      <div className="meta-item">
                        <img src={"/icons/location.svg"} alt="" style={{ filter: 'invert(1)' }} />
                        <span>{value.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Navigation Controls */}
        <Box className={"prev-next-frame"}>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-prev"}
            style={{ transform: "rotate(180deg)", cursor: "pointer" }}
          />
          <div className={"dot-frame-pagination swiper-pagination"}></div>
          <img
            src={"/icons/arrow-right.svg"}
            className={"swiper-button-next"}
            style={{ cursor: "pointer" }}
          />
        </Box>
      </Stack>
    </div>
  );
}